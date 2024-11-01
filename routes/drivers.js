import {Router} from "express"; // Use import instead of require
import { addDriver, suggestDriver } from "../controllers/driverController.js"; // Use import for controllers
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/add", authMiddleware, addDriver);
router.get("/suggest", authMiddleware, suggestDriver);

export default router; // Ensure this is present
