import mongoose from "mongoose";

const globalProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String], // array of URLs from CloudPE
    //   required: true,
    },
    description: {
      type: String,
    //   required: true,
    },
    productLeaflet: {
      type: String, // PDF URL
    //   required: true,
    },
    type: {
      type: String,
      enum: ["Cian Health Care Limited", "Dr Smith Biotech Pvt Ltd"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Pharmaceuticals",
        "Health Supplement and Nutraceutical",
        "Veterinary",
        "Cosmetics",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const GlobalProduct = mongoose.model("GlobalProduct", globalProductSchema);

export default GlobalProduct;
