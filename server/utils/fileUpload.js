// path utils/fileUpload.js
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";
import crypto from "crypto";
import path from "path";

// Multer config
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

function bufferToStream(buffer) {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export const uploadToCloudPE = async (file, folderName = "general") => {
  try {
    if (!file.buffer || file.buffer.length === 0) {
      throw new Error("File buffer is empty. Upload failed.");
    }

    const ENDPOINT = process.env.CLOUDPE_ENDPOINT?.replace(/\/$/, ""); // Remove trailing slash
    const REGION = process.env.CLOUDPE_REGION || "auto";
    const BUCKET_NAME = process.env.CLOUDPE_BUCKET_NAME;

    const s3Client = new S3Client({
      region: REGION,
      endpoint: ENDPOINT,
      credentials: {
        accessKeyId: process.env.CLOUDPE_ACCESS_KEY,
        secretAccessKey: process.env.CLOUDPE_SECRET_KEY,
      },
      forcePathStyle: true,
    });

    const ext = path.extname(file.originalname) || ".bin";
    const uniqueFilename = `${crypto.randomUUID()}${ext}`;
    const fileKey = `${folderName}/${uniqueFilename}`;

    const fileStream = bufferToStream(file.buffer);

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: fileKey,
        Body: fileStream,
        ContentType: file.mimetype || "application/octet-stream",
        ACL: "public-read",
      },
      queueSize: 4,
      partSize: 5 * 1024 * 1024,
    });

    const result = await upload.done();
    
    
    const fileUrl = `${ENDPOINT}/${BUCKET_NAME}/${fileKey}`;

    return fileUrl;
  } catch (error) {
    console.error("Upload to CloudPE failed:", error.message);
    if (error.Code === "SignatureDoesNotMatch") {
      console.error("Authentication error – check credentials/region.");
    }
    try {
      console.error("Full error:", JSON.stringify(error, null, 2));
    } catch (jsonErr) {
      console.error("Unable to stringify error:", jsonErr.message);
    }
    throw error;
  }
};

export default upload;
export { upload };
