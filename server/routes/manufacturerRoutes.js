import express from "express";
import {
  addManufacturer,
  getAllManufacturers,
  getManufacturerById,
  updateManufacturer,
  deleteManufacturer,
} from "../controllers/manufacturerController.js";

const router = express.Router();

// Add new manufacturer
router.post("/add", addManufacturer);

// Get all manufacturers
router.get("/all", getAllManufacturers);

// Get manufacturer by ID
router.get("/:id", getManufacturerById);

// Update manufacturer
router.put("/:id", updateManufacturer);

// Delete manufacturer
router.delete("/:id", deleteManufacturer);

export default router;
