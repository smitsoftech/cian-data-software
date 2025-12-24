import express from "express";

import {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// fields accepted for product create/update
const productUploadFields = [
  { name: "images", maxCount: 10 },
  { name: "packinsert", maxCount: 1 },
  { name: "productpermitions", maxCount: 1 },
  { name: "dossier", maxCount: 5 },
  { name: "copp", maxCount: 1 },
  { name: "fsc", maxCount: 1 },
];

router.post("/", upload.fields(productUploadFields), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.fields(productUploadFields), updateProduct);
router.delete("/:id", deleteProduct);

export default router;

