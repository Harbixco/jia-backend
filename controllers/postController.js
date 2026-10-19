import Post from '../models/Post.js'

// Helper to generate URL slug from title
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Calculate rough read time
const calculateReadTime = (content, excerpt = '') => {
  let wordCount = excerpt.split(/\s+/).filter(Boolean).length
  if (Array.isArray(content)) {
    content.forEach((block) => {
      if (block.text) {
        wordCount += block.text.split(/\s+/).filter(Boolean).length
      }
    })
  } else if (typeof content === 'string') {
    wordCount += content.split(/\s+/).filter(Boolean).length
  }
  const minutes = Math.max(1, Math.ceil(wordCount / 180))
  return `${minutes} min read`
}

// @desc Get all posts (public & admin support)
// @route GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 50 } = req.query

    const query = {}

    // If query specifically requests status or if it's admin request
    if (status && status !== 'all') {
      query.status = status
    } else if (!req.query.isAdminView) {
      // Public default: show only published
      query.status = 'published'
    }

    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i')
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ]
    }

    const pageNum = parseInt(page, 10) || 1
    const limitNum = parseInt(limit, 10) || 50
    const skip = (pageNum - 1) * limitNum

    const total = await Post.countDocuments(query)
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)

    return res.json({
      success: true,
      count: posts.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      posts,
    })
  } catch (error) {
    console.error('[Get Posts Error]:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

// @desc Get single post by slug or ID
// @route GET /api/posts/:slugOrId
export const getPost = async (req, res) => {
  try {
    const { slugOrId } = req.params

    let post = null
    // Check if valid ObjectId
    if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Post.findById(slugOrId)
    }

    if (!post) {
      post = await Post.findOne({ slug: slugOrId })
    }

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }

    // Increment view count asynchronously
    post.views = (post.views || 0) + 1
    await post.save()

    return res.json({ success: true, post })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// @desc Create new post (Admin only)
// @route POST /api/posts
export const createPost = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      rawContent,
      image,
      gallery,
      category,
      author,
      date,
      readTime,
      status,
      featured,
      tags,
    } = req.body

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' })
    }

    // Ensure slug
    let finalSlug = slug ? generateSlug(slug) : generateSlug(title)
    if (!finalSlug) finalSlug = `post-${Date.now()}`

    // Avoid duplicate slug
    const existing = await Post.findOne({ slug: finalSlug })
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`
    }

    // Process content blocks if string was provided
    let processedContent = content || []
    if (typeof content === 'string') {
      try {
        processedContent = JSON.parse(content)
      } catch {
        processedContent = content.split('\n\n').map((paragraph) => ({
          type: 'paragraph',
          text: paragraph.trim(),
        }))
      }
    }

    const calculatedRead = readTime || calculateReadTime(processedContent, excerpt)

    const post = await Post.create({
      title,
      slug: finalSlug,
      excerpt: excerpt || title,
      content: processedContent,
      rawContent: rawContent || '',
      image: image || '',
      gallery: Array.isArray(gallery)
        ? gallery
            .map((item) =>
              typeof item === 'string'
                ? { src: item.trim(), caption: '' }
                : { src: (item.src || item.url || '').trim(), caption: (item.caption || '').trim() }
            )
            .filter((item) => item.src.length > 0)
        : [],
      category: category || 'Article',
      author: author || 'Prophet Oludamola Daramola',
      date: date || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      readTime: calculatedRead,
      status: status || 'published',
      featured: Boolean(featured),
      tags: Array.isArray(tags) ? tags : [],
    })

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post,
    })
  } catch (error) {
    console.error('[Create Post Error]:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

// @desc Update existing post (Admin only)
// @route PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }

    const {
      title,
      slug,
      excerpt,
      content,
      rawContent,
      image,
      gallery,
      category,
      author,
      date,
      readTime,
      status,
      featured,
      tags,
    } = req.body

    if (title) post.title = title
    if (excerpt !== undefined) post.excerpt = excerpt
    if (image !== undefined) post.image = image
    if (gallery !== undefined) {
      post.gallery = Array.isArray(gallery)
        ? gallery
            .map((item) =>
              typeof item === 'string'
                ? { src: item.trim(), caption: '' }
                : { src: (item.src || item.url || '').trim(), caption: (item.caption || '').trim() }
            )
            .filter((item) => item.src.length > 0)
        : []
    }
    if (category) post.category = category
    if (author) post.author = author
    if (date) post.date = date
    if (status) post.status = status
    if (featured !== undefined) post.featured = Boolean(featured)
    if (tags !== undefined) post.tags = Array.isArray(tags) ? tags : []

    // If slug changed, ensure uniqueness
    if (slug && slug !== post.slug) {
      let candidateSlug = generateSlug(slug)
      const existing = await Post.findOne({ slug: candidateSlug, _id: { $ne: id } })
      if (existing) {
        candidateSlug = `${candidateSlug}-${Date.now().toString().slice(-4)}`
      }
      post.slug = candidateSlug
    }

    if (content !== undefined) {
      let processedContent = content
      if (typeof content === 'string') {
        try {
          processedContent = JSON.parse(content)
        } catch {
          processedContent = content.split('\n\n').map((paragraph) => ({
            type: 'paragraph',
            text: paragraph.trim(),
          }))
        }
      }
      post.content = processedContent
      post.readTime = readTime || calculateReadTime(processedContent, post.excerpt)
    }

    if (rawContent !== undefined) {
      post.rawContent = rawContent
    }

    const updated = await post.save()

    return res.json({
      success: true,
      message: 'Post updated successfully',
      post: updated,
    })
  } catch (error) {
    console.error('[Update Post Error]:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

// @desc Delete post (Admin only)
// @route DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' })
    }

    await post.deleteOne()

    return res.json({
      success: true,
      message: 'Post deleted successfully',
      deletedId: id,
    })
  } catch (error) {
    console.error('[Delete Post Error]:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}
