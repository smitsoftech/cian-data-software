import express from "express";
import upload from "../utils/fileUpload.js";
import {
  createGlobalProduct,
  getAllGlobalProducts,
  getGlobalProductById,
  updateGlobalProduct,
  deleteGlobalProduct,
} from "./../controllers/globalProductController.js";

const router = express.Router();

// Multer fields for multiple file types
const multipleUpload = upload.fields([
  { name: "images", maxCount: 5 },
  { name: "productLeaflet", maxCount: 1 },
]);

router.post("/", multipleUpload, createGlobalProduct);
router.get("/allget", getAllGlobalProducts);
router.get("/:id", getGlobalProductById);
router.put("/:id", multipleUpload, updateGlobalProduct);
router.delete("/:id", deleteGlobalProduct);

export default router;
