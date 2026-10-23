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
      'It was an evening steeped in the raw, tangible glory of God at the Ogun State Supernatural Conference on the 14th of September 2024. Mighty miracles, deliverance from long-standing bondages, and apostolic empowerment swept across the sanctuary as Jesus touched every open heart.',
    image: '/images/ogun-2024/PSH_5504.jpg',
    date: 'September 14, 2024',
    category: 'Supernatural Recap',
    author: 'Prophet Oludamola Daramola',
    readTime: '6 min read',
    status: 'published',
    featured: true,
    views: 320,
    content: [
      {
        type: 'paragraph',
        text: 'As the twilight settled over Ogun State, the atmosphere inside the auditorium grew intensely charged with divine anticipation. Pilgrims, seekers, and families had gathered from across the state and neighboring communities with one united longing: to encounter the resurrected Christ in the fullness of His supernatural power.',
      },
      {
        type: 'heading',
        text: 'The Descent of the Glory Cloud',
      },
      {
        type: 'paragraph',
        text: 'The evening service erupted with a wave of deep, unfiltered adoration. There was no pretense, only a room full of hungry souls yielding completely to the Holy Spirit. As voices ascended in reverent unison, a sacred solemnity fell upon the auditorium—a holy weight known across scriptures as the Kabod of God.',
      },
      {
        type: 'image',
        url: '/images/ogun-2024/PSH_5571.jpg',
        text: 'High-energy praise and celestial adoration electrified the atmosphere during the grand evening session.',
      },
      {
        type: 'paragraph',
        text: 'Songs of surrender gave way to fiery declarations of spiritual freedom. In that atmosphere, the presence of the Lord became so tangible that hearts were softened and chains of generational delay, depression, and spiritual heaviness began to dissolve in the light of His truth.',
      },
      {
        type: 'quote',
        text: '“For the kingdom of God does not consist in talk, but in power.” — 1 Corinthians 4:20. When Jesus enters any territory, tears of shame are wiped away, sickness is banished, and light dispels every darkness.',
        author: 'Prophet Oludamola Daramola',
      },
      {
        type: 'heading',
        text: 'The Living Word & The Fire of Revival',
      },
      {
        type: 'paragraph',
        text: 'Mounting the platform with deep apostolic burden, Prophet Oludamola Daramola delivered an uncompromising message on the mandate of the believer in this prophetic hour. He proclaimed that Africa is not a land forsaken, but the very staging ground for heaven’s end-time harvest.',
      },
      {
        type: 'image',
        url: '/images/ogun-2024/PSH_5519.jpg',
        text: 'Prophet Oludamola Daramola declaring the unshakeable counsel of God and releasing apostolic decrees over Africa.',
      },
      {
        type: 'paragraph',
        text: 'Opening from the scriptures, the servant of God emphasized that true faith is not a passive wish, but an aggressive agreement with what heaven has already finalized. The sermon pierced through complacency, awakening a fierce desire in attendees to live as carriers of the holy fire in their families, marketplaces, and universities.',
      },
      {
        type: 'heading',
        text: 'Signs, Wonders, and Sudden Healings',
      },
      {
        type: 'paragraph',
        text: 'Following the Word came a swift and undeniable manifestation of the Holy Spirit. As hands were lifted and prayers were made, testimonies broke out across the room. Several delegates suffering from chronic lumbar spine agony, persistent migrainous oppression, and severe joint stiffness declared sudden, complete relief.',
      },
      {
        type: 'image',
        url: '/images/ogun-2024/PSH_5544.jpg',
        text: 'Delegates crowding the altar, weeping tears of gratitude and liberation under divine power.',
      },
      {
        type: 'paragraph',
        text: 'At the altar call, dozens surged forward—some weeping in repentance, others trembling under the weight of the Spirit. Youth, elders, and entire households received personal words of prophetic clarity, turning what began as a conference into an epochal night of spiritual rebirth.',
      },
      {
        type: 'heading',
        text: 'Commissioned as Torchbearers for Africa',
      },
      {
        type: 'paragraph',
        text: 'The night concluded with an impartation of boldness. Attendees were instructed not to hoard the encounter within four walls, but to go forth as fearless ambassadors of Jesus Christ across their neighborhoods, schools, and cities. The fire ignited in Ogun State will not be quenched; it is spreading across Africa.',
      },
    ],
    gallery: [
      {
        src: '/images/ogun-2024/PSH_5504.jpg',
        caption: 'Prophet Oludamola Daramola ministering with prophetic authority on stage',
      },
      {
        src: '/images/ogun-2024/PSH_5571.jpg',
        caption: 'Vibrant musical ministration lifting the entire sanctuary into high praise',
      },
      {
        src: '/images/ogun-2024/PSH_5519.jpg',
        caption: 'The declaration of the uncompromised Word of God',
      },
      {
        src: '/images/ogun-2024/PSH_5587.jpg',
        caption: 'Unrestrained joy and celebration as miracles were confirmed',
      },
      {
        src: '/images/ogun-2024/PSH_5544.jpg',
        caption: 'Attendees kneeling at the altar during the deep deliverance call',
      },
      {
        src: '/images/ogun-2024/PSH_5508.jpg',
        caption: 'Young believers lost in deep, transformative intercession',
      },
      {
        src: '/images/ogun-2024/PSH_5516.jpg',
        caption: 'Prophet Oludamola releasing prophetic decrees into destinies',
      },
      {
        src: '/images/ogun-2024/PSH_5580.jpg',
        caption: 'The congregation basking in the radiant presence of the Holy Spirit',
      },
    ],
  },
  {
    title: 'Supernatural Conference, Ogun State, 2024, Day 2 Recap',
    slug: 'supernatural-conference-ogun-state-2024-day-2-recap',
    excerpt:
      'The morning sun was shining brightly as delegates poured into the auditorium around 10:40 am for Day 2. With high-octane praise, deep doctrinal revelations on faith, and extraordinary manifestations of healing, hearts were thoroughly set ablaze for kingdom purpose.',
    image: '/images/ogun-2024/PSH_5549.jpg',
    date: 'September 14, 2024',
    category: 'Conference Teaching',
    author: 'JIA Media Team',
    readTime: '6 min read',
    status: 'published',
    featured: false,
    views: 245,
    content: [
      {
        type: 'paragraph',
        text: 'Day 2 of the Ogun State Supernatural Conference launched with electric vitality. By 10:40 am, the sanctuary was brimming with ministers, students, and community families who arrived determined not to miss a second of heaven’s agenda for the day.',
      },
      {
        type: 'heading',
        text: 'High Praise and Joyful Exaltation',
      },
      {
        type: 'paragraph',
        text: 'Before the teaching commenced, the praise choir took the stage with vibrant rhythm and infectious joy. Hands were raised, bodies were dancing, and every heavy spirit was swiftly replaced with the oil of joy. The room was not simply singing songs; they were actively pulling down strongholds through high praise.',
      },
      {
        type: 'image',
        url: '/images/ogun-2024/PSH_5415.jpg',
        text: 'The vibrant joy of the Holy Ghost radiating through youth and delegates during the daytime ministration.',
      },
      {
        type: 'paragraph',
        text: 'Youth from diverse institutions across Ogun State stood side by side with seasoned church elders, capturing precious moments and harmonizing in loud shouts of victory. The generational unity in the room was a prophetic picture of what God is doing across the African continent.',
      },
      {
        type: 'heading',
        text: 'The Architecture of Biblical Faith',
      },
      {
        type: 'paragraph',
        text: 'The teaching segment plunged into the core principles of operational faith. It was emphasized that biblical faith is neither blind positive thinking nor an emotional impulse; it is the absolute spiritual conviction born from the hearing and doing of God’s Word.',
      },
      {
        type: 'image',
        url: '/images/ogun-2024/PSH_5485.jpg',
        text: 'Minister Abiodun Agbaje expounding the foundational laws of biblical faith and active kingdom authority.',
      },
      {
        type: 'quote',
        text: '“Faith does not wait for feelings or circumstances to align. Faith operates from the throne room, speaking what God has settled in eternity until the physical realm complies.”',
        author: 'General Evangelist Oludamola Daramola',
      },
      {
        type: 'paragraph',
        text: 'Delegates opened their notebooks and Bibles, eagerly drinking from the revelatory stream. The message demystified the believer’s authority in Christ, teaching everyday believers how to pray effectively, enforce dominion over infirmity, and walk in divine protection.',
      },
      {
        type: 'image',
        url: '/images/ogun-2024/PSH_5490.jpg',
        text: 'A packed auditorium hanging on every word of revelation, soaking in scriptural truths with intense hunger.',
      },
      {
        type: 'heading',
        text: 'The Prophetic Impartation and Healing Service',
      },
      {
        type: 'paragraph',
        text: 'As the doctrinal session reached its zenith, a wave of healing power swept the aisles. People with physical discomfort placed their hands upon their bodies as corporate prayers went forth. What followed were instant shouts of praise as deaf ears opened, sharp chest tightness vanished, and long-standing fatigue was broken.',
      },
      {
        type: 'paragraph',
        text: 'Young men and women were seen praying fervently for one another, stepping into practical demonstrations of ministry without fear or hesitation. Day 2 proved that when the Word is taught in truth and power, miracles are the natural consequence.',
      },
    ],
    gallery: [
      {
        src: '/images/ogun-2024/PSH_5549.jpg',
        caption: 'Pastors and delegates standing united with hands lifted in high consecration',
      },
      {
        src: '/images/ogun-2024/PSH_5485.jpg',
        caption: 'Minister Abiodun Agbaje delivering deep revelatory truths on kingdom authority',
      },
      {
        src: '/images/ogun-2024/PSH_5415.jpg',
        caption: 'Joy and radiant smiles filling the faces of the next generation',
      },
      {
        src: '/images/ogun-2024/PSH_5490.jpg',
        caption: 'Full auditorium captivated during the deep Word ministration',
      },
      {
        src: '/images/ogun-2024/PSH_5461.jpg',
        caption: 'Earnest delegates pouring out their hearts in focused, personal prayer',
      },
      {
        src: '/images/ogun-2024/PSH_5457.jpg',
        caption: 'Children and teenagers lifting holy hands in simple, reverent worship',
      },
      {
        src: '/images/ogun-2024/PSH_5450.jpg',
        caption: 'Unrestrained rejoicing and dancing before the presence of the King',
      },
      {
        src: '/images/ogun-2024/PSH_5422.jpg',
        caption: 'Attentive delegates hanging onto every prophetic instruction',
      },
    ],
  },
  {
    title: 'Supernatural Conference, Ogun State, 2024, Day 1 Recap',
    slug: 'supernatural-conference-ogun-state-2024-day-1-recap',
    excerpt:
      'The morning was bright and the air thick with anticipation as delegates from diverse cities streamed into the sanctuary for the grand opening on September 13. An extraordinary commencement marked by thunderous thanksgiving and an apostolic awakening for Africa.',
    image: '/images/ogun-2024/PSH_5497.jpg',
    date: 'September 13, 2024',
    category: 'Conference Opening',
    author: 'JIA Media Team',
    readTime: '5 min read',
    status: 'published',
    featured: false,
    views: 198,
    content: [
      {
        type: 'paragraph',
        text: 'From the early hours of Friday, September 13th, the conference grounds were alive with joyful anticipation. Convoy after convoy arrived from Abeokuta, Sagamu, Ijebu-Ode, Lagos, and surrounding rural outposts, carrying believers who had fasted and prayed for this momentous weekend.',
      },
      {
        type: 'heading',
        text: 'A Foundation Laid in Pure Thanksgiving',
      },
      {
        type: 'paragraph',
        text: 'The conference kicked off with a heartfelt session of national thanksgiving. Ministers led the congregation to thank God for His preserving mercy over Nigeria, for open doors across African nations, and for the preservation of families through turbulent economic seasons.',
      },
      {
        type: 'image',
        url: '/images/ogun-2024/PSH_5497.jpg',
        text: 'The opening charge led by ministers on stage, uniting the congregation in songs of gratitude.',
      },
      {
        type: 'paragraph',
        text: 'As the scriptures command in Psalm 100:4, the people entered His gates with thanksgiving and His courts with praise. The collective gratitude was so genuine that it immediately unlocked an extraordinary peace and warmth across the entire sanctuary.',
      },
      {
        type: 'heading',
        text: 'Soul-Stirring Worship and Consecration',
      },
      {
        type: 'paragraph',
        text: 'Minister Janet and the anointed worship team stepped forward, leading a sacred sequence of traditional and contemporary hymns. The pure sound of worship filled every corner of the auditorium, causing people to kneel, raise holy hands, and renew their vows of devotion to Christ.',
      },
      {
        type: 'image',
        url: '/images/ogun-2024/PSH_5381.jpg',
        text: 'Minister Janet leading deep, soul-stirring worship, welcoming the sweet presence of the Holy Spirit.',
      },
      {
        type: 'quote',
        text: '“Africa is not forgotten. In this season, God is raising a generation of believers whose lives will burn with purity, love, and undeniable spiritual authority.”',
        author: 'Prophet Oludamola Daramola',
      },
      {
        type: 'heading',
        text: 'Laying the Spiritual Groundwork for Revival',
      },
      {
        type: 'paragraph',
        text: 'The keynote address on Day 1 set the spiritual compass for the entire gathering. Attendees were reminded that miracles are not circus tricks; they are signs pointing a broken world to the living Savior. Repentance, spiritual hunger, and unity among believers were highlighted as the mandatory seeds for genuine community awakening.',
      },
      {
        type: 'image',
        url: '/images/ogun-2024/PSH_5481.jpg',
        text: 'The entire congregation standing united in solemn intercession for Ogun State, Nigeria, and the nations of Africa.',
      },
      {
        type: 'paragraph',
        text: 'As night fell on Day 1, people lingered long after the benediction, embracing one another and discussing the profound peace they had felt. The foundation had been solidly established, and everyone knew that Day 2 and the grand finale would bring even greater downpours of divine favor.',
      },
    ],
    gallery: [
      {
        src: '/images/ogun-2024/PSH_5497.jpg',
        caption: 'Ministers and worship team officially opening the conference in joyful praise',
      },
      {
        src: '/images/ogun-2024/PSH_5381.jpg',
        caption: 'Minister Janet in passionate adoration on the conference stage',
      },
      {
        src: '/images/ogun-2024/PSH_5481.jpg',
        caption: 'Delegates standing shoulder to shoulder in corporate intercession',
      },
      {
        src: '/images/ogun-2024/PSH_5386.jpg',
        caption: 'Songs of surrender lifting the hearts of all who gathered',
      },
      {
        src: '/images/ogun-2024/PSH_5411.jpg',
        caption: 'The conference choir harmonizing in rich, sacred praise',
      },
      {
        src: '/images/ogun-2024/PSH_5435.jpg',
        caption: 'Unrestrained joy as delegates celebrated God’s eternal faithfulness',
      },
      {
        src: '/images/ogun-2024/PSH_5452.jpg',
        caption: 'Dynamic praise stirring holy fire across every row of the auditorium',
      },
      {
        src: '/images/ogun-2024/PSH_5478.jpg',
        caption: 'Quiet moments of rededication and communion on opening night',
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
        password: process.env.ADMIN_PASSWORD || '@Laura24$',
        role: 'superadmin',
      })
      console.log(`[Seeding]: Admin created (${adminEmail})`)
    } else {
      console.log(`[Seeding]: Admin already exists (${adminEmail})`)
    }

    // 2. Remove obsolete placeholder posts not in initialPosts
    const currentSlugs = initialPosts.map((p) => p.slug)
    const deleteResult = await Post.deleteMany({ slug: { $nin: currentSlugs } })
    console.log(`[Seeding]: Cleaned up ${deleteResult.deletedCount} outdated posts.`)

    // 3. Upsert the 3 improved posts
    for (const post of initialPosts) {
      await Post.findOneAndUpdate(
        { slug: post.slug },
        { $set: post },
        { upsert: true, new: true }
      )
      console.log(`[Seeding]: Upserted post: ${post.title}`)
    }

    console.log('[Seeding]: Complete!')
    process.exit(0)
  } catch (error) {
    console.error('[Seeding Error]:', error)
    process.exit(1)
  }
}

seedData()
