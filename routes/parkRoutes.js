import express from 'express';
import auth from '../middleware/auth.js';
import { getParks, getParkById, createPark, updatePark, deletePark } from '../controllers/parkController.js';

const router = express.Router();

router.get('/', auth, getParks);
router.get('/:id', auth, getParkById);
router.post('/', auth, createPark);
router.put('/:id', auth, updatePark);
router.delete('/:id', auth, deletePark);

export default router;
