import { Router } from 'express';
const router = Router();
import { registerUser, loginUser, logoutUser } from '../controllers/userController';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
