import express from 'express';
import auth from '../middleware/auth.js';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', auth, getCategories);
router.get('/:id', auth, getCategoryById);
router.post('/', auth, createCategory);
router.put('/:id', auth, updateCategory);
router.delete('/:id', auth, deleteCategory);

export default router;
