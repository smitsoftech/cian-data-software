import express from "express";
import { getForms, createForm } from "../controllers/formController.js";

const router = express.Router();

router.get("/", getForms);
router.post("/", createForm);

export default router;
