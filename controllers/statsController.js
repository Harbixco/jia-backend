import Post from '../models/Post.js'
import Admin from '../models/Admin.js'

// @desc Get overview statistics for Admin Dashboard
// @route GET /api/stats
export const getAdminStats = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments()
    const publishedPosts = await Post.countDocuments({ status: 'published' })
    const draftPosts = await Post.countDocuments({ status: 'draft' })
    const totalAdmins = await Admin.countDocuments()

    // Aggregate total views
    const viewsAggregation = await Post.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } },
    ])
    const totalViews = viewsAggregation[0]?.totalViews || 0

    // Category breakdown
    const categoryBreakdown = await Post.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    // Recent posts
    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug category status views createdAt date')

    return res.json({
      success: true,
      stats: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews,
        totalAdmins,
        categories: categoryBreakdown,
        recentPosts,
      },
    })
  } catch (error) {
    console.error('[Stats Error]:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}
