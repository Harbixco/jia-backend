import mongoose from 'mongoose'

const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['paragraph', 'heading', 'quote', 'image', 'list'],
      default: 'paragraph',
    },
    text: { type: String, default: '' },
    author: { type: String, default: '' },
    url: { type: String, default: '' },
  },
  { _id: false }
)

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    gallery: [
      {
        src: { type: String, default: '' },
        caption: { type: String, default: '' },
      },
    ],
    category: {
      type: String,
      default: 'Article',
      trim: true,
    },
    author: {
      type: String,
      default: 'Prophet Oludamola Daramola',
      trim: true,
    },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
    },
    readTime: {
      type: String,
      default: '4 min read',
    },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    content: [contentBlockSchema],
    rawContent: {
      type: String,
      default: '',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)
export default Post
