// middlewares/multer.js
import multer from "multer";

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, and PDF allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
