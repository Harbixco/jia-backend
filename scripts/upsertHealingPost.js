import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Post from '../models/Post.js'

dotenv.config()

async function main() {
  try {
    console.log('Connecting to MongoDB Atlas...')
    await mongoose.connect(process.env.MONGODB_URI)

    const healingPost = {
      title: 'The Healing Room: Divine Wholeness, Faith, and Restoring Grace',
      slug: 'the-healing-room-divine-wholeness-and-miracles-in-christ',
      excerpt:
        'Step into the Healing Room where the compassion of Jesus touches pain and sickness. Discover how biblical faith activates supernatural healing and breaks long-standing physical bondages.',
      image: '/images/event-healing.jpg',
      date: 'October 15, 2024',
      category: 'Healing Room',
      author: 'Prophet Oludamola Daramola',
      readTime: '5 min read',
      status: 'published',
      featured: true,
      views: 180,
      content: [
        {
          type: 'paragraph',
          text: 'Across the Gospels, whenever Jesus encountered sickness, His posture was never indifference or delay—it was divine compassion followed by absolute authority. He healed all who were oppressed of the devil, revealing the will of the Father for human health and wholeness.',
        },
        {
          type: 'heading',
          text: 'The Finished Work of the Cross',
        },
        {
          type: 'paragraph',
          text: 'Healing is not an accidental bonus of the gospel; it was purchased at Calvary. Isaiah 53:5 explicitly reveals that “with His stripes we are healed.” When Christ bore the chastisement for our peace, He also carried away our infirmities and bare our sicknesses in His own body on the tree.',
        },
        {
          type: 'quote',
          text: '“Jesus Christ is the same yesterday, today, and forever.” — Hebrews 13:8. If He cleansed the leper and made the lame walk in Galilee, He has not lost His touch in Africa today.',
          author: 'Prophet Oludamola Daramola',
        },
        {
          type: 'heading',
          text: 'Entering into Rest and Recovery',
        },
        {
          type: 'paragraph',
          text: 'Through the ministry of the Healing Room, believers are taught how to stand on God’s Word, cast down fear, and receive the life of the Spirit into their mortal bodies. We have watched chronic conditions dissolve, severe spinal injuries receive strength, and terminal reports reversed by the simple prayer of faith.',
        },
        {
          type: 'paragraph',
          text: 'If you or your loved ones are battling an infirmity today, do not lose heart. Heaven is attentive to your cry, and the resurrected Lord is ready to reveal His healing glory in your life.',
        },
      ],
      gallery: [],
    }

    const res = await Post.findOneAndUpdate(
      { slug: healingPost.slug },
      { $set: healingPost },
      { upsert: true, new: true }
    )

    console.log('Successfully upserted Healing Room post:', res.title)
    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

main()

