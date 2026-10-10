import express from 'express'
import { getAdminStats } from '../controllers/statsController.js'
import { protectAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', protectAdmin, getAdminStats)

export default router
