import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Admin from './models/Admin.js'
import Post from './models/Post.js'

dotenv.config()

const initialPosts = [
  {
    title: 'A Glorious Evening at the Ogun State Supernatural Conference',
    slug: 'glorious-evening-ogun-state-supernatural-conference-2024',
    excerpt:
      'It was a glorious evening, and the presence of God filled the atmosphere at the Ogun State Supernatural Conference on the 14th of September 2024. Mighty miracles, deliverance, and spiritual empowerment were witnessed.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    date: 'September 14, 2024',
    category: 'Recap',
    author: 'Prophet Oludamola Daramola',
    readTime: '4 min read',
    status: 'published',
    featured: true,
    views: 142,
    content: [
      {
        type: 'paragraph',
        text: 'The atmosphere at the Ogun State Supernatural Conference was charged with divine expectation from the moment the doors opened. Believers, seekers, and leaders gathered across communities with hearts eager to experience the tangible power and love of Jesus Christ.',
      },
      {
        type: 'heading',
        text: 'A Manifestation of the Spirit and Power',
      },
      {
        type: 'paragraph',
        text: 'As worship ascended, the tangible weight of God’s glory rested upon the auditorium. Songs of consecration broke out spontaneously, and chains of spiritual stagnation began to give way. The general testimony was clear: this was not an ordinary church program, but an encounter designed to shift destinies.',
      },
      {
        type: 'quote',
        text: '“For the kingdom of God is not in word, but in power.” — 1 Corinthians 4:20. When Jesus enters any city, burdens are lifted and light dispels every darkness.',
        author: 'Prophet Oludamola Daramola',
      },
      {
        type: 'paragraph',
        text: 'Mighty testimonies of instant healing were recorded throughout the evening. Many who had suffered chronic back pain, joint stiffness, and long-standing afflictions testified of sudden relief and complete liberation after prayer. The power of God swept through the congregation, igniting a hunger for personal revival and kingdom evangelism.',
      },
      {
        type: 'heading',
        text: 'Commissioned to Shine the Light',
      },
      {
        type: 'paragraph',
        text: 'The evening culminated in a powerful time of impartation. Attendees were exhorted to carry the fire back to their neighborhoods, campuses, workplaces, and local churches. Jesus in Africa continues to see lives transformed as the gospel is preached with bold demonstration.',
      },
    ],
  },
  {
    title: 'Divine Encounters & Breakthroughs Across African Communities',
    slug: 'divine-encounters-and-breakthroughs-across-african-communities',
    excerpt:
      'Witnessing the outpouring of the Holy Spirit across our recent grassroots missionary outreaches, where hope was restored to the brokenhearted.',
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
    date: 'August 28, 2024',
    category: 'Outreach',
    author: 'Prophet Oludamola Daramola',
    readTime: '5 min read',
    status: 'published',
    featured: false,
    views: 89,
    content: [
      {
        type: 'paragraph',
        text: 'Every soul matters to God. Across villages, town squares, and inner cities, the mission remains constant: to proclaim Jesus Christ and witness chains broken through unconditional love and spiritual authority.',
      },
      {
        type: 'heading',
        text: 'Restoring Faith in Hard Places',
      },
      {
        type: 'paragraph',
        text: 'Many families came forward seeking prayers for restoration, sickness, and family peace. The Lord heard their cries and answered with unmistakable clarity. Medical reports were overturned, hearts were reconciled, and many accepted Jesus as their personal Lord and Savior.',
      },
      {
        type: 'quote',
        text: '“The harvest truly is plentiful, but the laborers are few. Therefore pray the Lord of the harvest to send out laborers into His harvest.” — Matthew 9:37-38',
        author: 'Prophet Oludamola Daramola',
      },
    ],
  },
  {
    title: 'Walking in Supernatural Authority: Principles of Kingdom Power',
    slug: 'walking-in-supernatural-authority-principles-of-kingdom-power',
    excerpt:
      'A deep dive into spiritual empowerment, consecration, and how believers can actively walk in biblical dominion in their daily lives.',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    date: 'July 15, 2024',
    category: 'Teaching',
    author: 'Prophet Oludamola Daramola',
    readTime: '6 min read',
    status: 'published',
    featured: false,
    views: 115,
    content: [
      {
        type: 'paragraph',
        text: 'Spiritual authority is not an accident; it is the natural consequence of alignment with God’s Word and unbroken intimacy with the Holy Spirit. Believers are called not merely to survive worldly storms, but to enforce the victory won at Calvary.',
      },
      {
        type: 'heading',
        text: 'The Foundation of Secret Place Intimacy',
      },
      {
        type: 'paragraph',
        text: 'Public power is forged in private prayer. When we spend time beholding God’s face, fear is dissolved and holy boldness takes its place. In this teaching, we explore how discipline, purity, and unwavering faith unlock heaven’s resources.',
      },
    ],
  },
]

const seedData = async () => {
  try {
    console.log('[Seeding]: Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('[Seeding]: Connected successfully.')

    // 1. Seed or Verify Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@jesusinafrica.org').toLowerCase().trim()
    const existingAdmin = await Admin.findOne({ email: adminEmail })
    if (!existingAdmin) {
      await Admin.create({
        name: 'JIA Lead Admin',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'superadmin',
      })
      console.log(`[Seeding]: Admin created (${adminEmail})`)
    } else {
      console.log(`[Seeding]: Admin already exists (${adminEmail})`)
    }

    // 2. Seed Posts if empty
    const postCount = await Post.countDocuments()
    if (postCount === 0) {
      await Post.insertMany(initialPosts)
      console.log(`[Seeding]: Inserted ${initialPosts.length} initial posts.`)
    } else {
      console.log(`[Seeding]: Database already has ${postCount} posts.`)
    }

    console.log('[Seeding]: Complete!')
    process.exit(0)
  } catch (error) {
    console.error('[Seeding Error]:', error)
    process.exit(1)
  }
}

seedData()
