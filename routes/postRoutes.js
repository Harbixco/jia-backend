import express from 'express'
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js'
import { protectAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public or Admin can get posts
router.get('/', getPosts)
router.get('/:slugOrId', getPost)

// Admin protected endpoints
router.post('/', protectAdmin, createPost)
router.put('/:id', protectAdmin, updatePost)
router.delete('/:id', protectAdmin, deletePost)

export default router
