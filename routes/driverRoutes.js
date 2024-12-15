import express from 'express';
import auth from '../middleware/auth.js';
import {
  createDriver,
  getDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
  suggestDriver,
  deductPointsByContactNumber,
  toggleAvailabilityViaURL,
  getDriverDetailsbyConctactNumber,
  toggleAvailability
} from '../controllers/driverController.js';

const router = express.Router();

router.post('/', auth, createDriver);
router.get('/', auth, getDrivers);
router.get('/:id', auth, getDriver);
router.put('/:id', auth, updateDriver);
router.delete('/:id', auth, deleteDriver);

// Suggest driver route
router.post('/suggest',  suggestDriver);

router.post('/deductPoints', auth, deductPointsByContactNumber);

router.get('/:id/toggleAvailability', toggleAvailabilityViaURL);

router.post('/details', getDriverDetailsbyConctactNumber);

router.post('/toggle-availability', toggleAvailability);


export default router;
