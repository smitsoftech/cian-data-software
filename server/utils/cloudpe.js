// path utils/cloudpe.js

import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const normalizeRegion = (region) => {
  // If the region already looks like a standard AWS region format, return it
  if (/^[a-z]+-[a-z]+-\d+$/.test(region)) {
    return region;
  }

  // If it's a custom format like S3-INWEST3, convert to lowercase and add hyphens if needed
  return region
    .toLowerCase()
    .replace("s3-", "")
    .replace(/([a-z])([0-9])/g, "$1-$2");
};

// Configuration for the S3 client
const ENDPOINT = process.env.CLOUDPE_ENDPOINT || "";
const REGION = normalizeRegion(process.env.CLOUDPE_REGION || "auto");
const BUCKET_NAME = process.env.CLOUDPE_BUCKET_NAME;

// Initialize CloudPE/S3 client
const cloudpe = new S3Client({
  region: REGION,
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDPE_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDPE_SECRET_KEY,
  },
  forcePathStyle: true, // Required for S3-compatible storage services
  maxAttempts: 3, // Retry up to 3 times for better reliability
});


export default cloudpe;
