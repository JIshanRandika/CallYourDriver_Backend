import { Router } from "express";
const router = Router();
import auth from "../middleware/auth";
import {
  createDriver,
  getDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
} from "../controllers/driverController";

router.post("/", auth, createDriver);
router.get("/", auth, getDrivers);
router.get("/:id", auth, getDriver);
router.put("/:id", auth, updateDriver);
router.delete("/:id", auth, deleteDriver);

export default router;