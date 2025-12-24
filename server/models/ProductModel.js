// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     keyFeature: { type: String, required: true }, // New field
//     shortComposition: { type: String },
//     composition: { type: String, required: true }, // New field
//     howToUse: { type: String, required: true }, // New field
//     adverseEffect: { type: String, required: true }, // New field
//     packingProfile: { type: String, required: true },
//     producttype: { type: String, required: true },
//     stock: { type: Number },
//     mrpPerBox: { type: Number, default: 0 },
//     mrpPerStrip: { type: Number, default: 0 },
//     mrpPerSachet: { type: Number, default: 0 },
//     mrpPerJar: { type: Number, default: 0 },
//     mrpPerTin: { type: Number, default: 0 },
//     mrpPerTube: { type: Number, default: 0 },
//     mrpPerBottle: { type: Number, default: 0 },
//     selleblePrice: { type: Number, default: 0 },
//     bottleType: { type: String },
//     mrpPerQuantity: { type: String },
//     discount: { type: Number, default: 0 }, // Default discount 0%
//     coupon: { type: String },
//     productVisibility: { type: String, required: true },
//     category: { type: String, required: true },
//     productcategory: { type: String, required: true },
//     division: { type: String, required: true },
//     packingstyle: { type: String, required: true },
//     images: [{ type: String }], // Array of image URLs
//     dispatchAddress: { type: String,  },
//     manufacturerName: { type: String,  },
//     batchNumber: { type: String,  },
//     hsn: { type: String,  },
//     gstProductCategories: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, },
    description: { type: String, },
    keyFeature: { type: String, }, // New field
    composition: { type: String, }, // New field
    shortComposition: { type: String },
    howToUse: { type: String, }, // New field
    adverseEffect: { type: String, }, // New field
    packingstyle: { type: String, },
    packingProfile: { type: String, },
    mainCategory: {
      type: String,
      enum: ["Medicine", "Wellness", "Beauty", "Veterinary"],
    },
    subCategory: {
      type: String,
      // enum: [
      //   "Capsule",
      //   "Cream",
      //   "Gel",
      //   "Injection",
      //   "Liquid",
      //   "Mouthwash",
      //   "Oil",
      //   "ointment",
      //   "Paste",
      //   "Powder",
      //   "Sachet",
      //   "Shampoo",
      //   "Soap",
      //   "Spray",
      //   "Tablet",
      //   "Small Animal",
      //   "Large Animal",
      //   "Others",
      // ],
      // default:"Others"
    },
    division: { type: String, },
    // manufacturerName: { type: String, },
    manufacturer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manufacturer",
      },
    ],

    innovatorname: { type: String, },
    hsn: { type: String, },
    images: [{ type: String }], // Array of image URLs
    packinsert: { type: String }, //image or file
    productpermitions: { type: String }, //image or file
    dossier: [{ type: String }], //image or file
    copp: { type: String }, //image or file
    fsc: { type: String }, //image or file


  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;






