import {Router} from "express"; // Use import instead of require
import { register, login } from "../controllers/authController.js"; // Importing functions with ES module syntax
const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router; // Ensure this is present
