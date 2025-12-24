import mongoose from "mongoose";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import Product from "../models/ProductModel.js";
import cloudpe from "../utils/cloudpe.js";
import { uploadToCloudPE } from "../utils/fileUpload.js";

// ======================= CREATE PRODUCT =======================
export const createProduct = async (req, res) => {
  try {
    let  {
      name,
      description,
      keyFeature,
      composition,
      shortComposition,
      howToUse,
      adverseEffect,
      packingProfile,
      packingstyle,
      mainCategory,
      subCategory,
      division,
      manufacturer ,
      innovatorname,
      hsn,
    } = req.body;



// 🩺 DEBUG (optional)
console.log("📦 Manufacturer (raw):", manufacturer);

// ✅ Parse manufacturer safely
    if (typeof manufacturer === "string") {
      try {
        manufacturer = JSON.parse(manufacturer);
      } catch {
        manufacturer = [manufacturer];
      }
    } else if (Array.isArray(manufacturer)) {
      try {
        if (manufacturer.length === 1 && typeof manufacturer[0] === "string") {
          const parsed = JSON.parse(manufacturer[0]);
          manufacturer = Array.isArray(parsed) ? parsed : [parsed];
        }
      } catch {
        manufacturer = manufacturer.flat();
      }
    }

    console.log("✅ Final Manufacturer IDs:", manufacturer);

    // 🖼️ Upload product images
    let images = [];
    if (req.files?.images?.length > 0) {
      for (const file of req.files.images) {
        const fileUrl = await uploadToCloudPE(file, "products/images");
        images.push(fileUrl);
      }
    }

    // 📄 Upload pack insert file (optional)
    let packinsertUrl = "";
    if (req.files?.packinsert?.length > 0) {
      packinsertUrl = await uploadToCloudPE(
        req.files.packinsert[0],
        "products/packinsert"
      );
    }

    // 📄 Upload product permissions file (optional)
    let productpermitionsUrl = "";
    if (req.files?.productpermitions?.length > 0) {
      productpermitionsUrl = await uploadToCloudPE(
        req.files.productpermitions[0],
        "products/productpermitions"
      );
    }

    // 📄 Upload dossier files (optional)
    let dossierUrls = [];
    if (req.files?.dossier?.length > 0) {
      for (const file of req.files.dossier) {
        const fileUrl = await uploadToCloudPE(file, "products/dossier");
        dossierUrls.push(fileUrl);
      }
    }

   // 📄 Upload product permissions file (optional)
    let coppUrl = "";
    if (req.files?.copp?.length > 0) {
      coppUrl = await uploadToCloudPE(
        req.files.copp[0],
        "products/copp"
      );
    }

    // 📄 Upload product permissions file (optional)
    let fscUrl = "";
    if (req.files?.fsc?.length > 0) {
      fscUrl = await uploadToCloudPE(
        req.files.fsc[0],
        "products/fsc"
      );
    }

    // 🧩 Create new product
    const newProduct = new Product({
      name,
      description,
      keyFeature,
      shortComposition,
      composition,
      howToUse,
      adverseEffect,
      packingProfile,
      packingstyle,
      mainCategory,
      subCategory,
      division,
      manufacturer , // array of manufacturer _ids,
      innovatorname,
      hsn,
      images,
      packinsert: packinsertUrl,
      productpermitions: productpermitionsUrl,
      dossier: dossierUrls,
      copp:coppUrl,
      fsc:fscUrl,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("❌ Error creating product:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// ======================= GATE ALL PRODUCT =======================
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// ======================= GET PRODUCT BY ID =======================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// ======================= UPDATE PRODUCT =======================
// export const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const existingProduct = await Product.findById(id);

//     if (!existingProduct)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     // 🖼️ Handle existing images
//     const existingImages = req.body.existingImages
//       ? JSON.parse(req.body.existingImages)
//       : existingProduct.images;

//     const imagesToDelete = req.body.imagesToDelete
//       ? JSON.parse(req.body.imagesToDelete)
//       : [];

//     // 🧹 Delete unwanted images from CloudPE
//     for (const imageUrl of imagesToDelete) {
//       await deleteFromCloudPE(imageUrl);
//     }

//     // 🖼️ Upload new images
//     let newUploadedImages = [];
//     if (req.files?.newImages?.length > 0) {
//       for (const file of req.files.newImages) {
//         const fileUrl = await uploadToCloudPE(file, "products/images");
//         newUploadedImages.push(fileUrl);
//       }
//     }

//     // 🧩 Combine images
//     let finalImages = [...existingImages, ...newUploadedImages];
//     if (req.body.imageOrder) {
//       const order = JSON.parse(req.body.imageOrder);
//       finalImages = order.map((o) =>
//         o.type === "existing" ? existingImages[o.index] : newUploadedImages[o.index]
//       );
//     }

//     // 🧹 Replace old packinsert if new one uploaded
//     let packinsertUrl = existingProduct.packinsert;
//     if (req.files?.packinsert?.length > 0) {
//       if (existingProduct.packinsert) await deleteFromCloudPE(existingProduct.packinsert);
//       packinsertUrl = await uploadToCloudPE(
//         req.files.packinsert[0],
//         "products/packinsert"
//       );
//     }

//     // 🧹 Replace old productpermitions if new one uploaded
//     let productpermitionsUrl = existingProduct.productpermitions;
//     if (req.files?.productpermitions?.length > 0) {
//       if (existingProduct.productpermitions)
//         await deleteFromCloudPE(existingProduct.productpermitions);
//       productpermitionsUrl = await uploadToCloudPE(
//         req.files.productpermitions[0],
//         "products/productpermitions"
//       );
//     }

//     // 🧩 Update product data
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//         ...req.body,
//         images: finalImages,
//         packinsert: packinsertUrl,
//         productpermitions: productpermitionsUrl,
//       },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: " Product updated successfully",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     console.error(" Error updating product:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Error updating product",
//       error: error.message,
//     });
//   }
// };

// ======================= UPDATE PRODUCT =======================


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProduct = await Product.findById(id);
    if (!existingProduct)
      return res.status(404).json({ success: false, message: "Product not found" });

    const parseJSON = (str, fallback = []) => {
      try { return JSON.parse(str); } catch { return fallback; }
    };

    // --- 1️⃣ Remove images ---
    const imagesToDelete = parseJSON(req.body.removedImages);
    console.log("🟡 Images to delete:", imagesToDelete);

    // Filter existing images
    let existingImages = existingProduct.images.filter(
      img => !imagesToDelete.some(toDelete => img.includes(toDelete.split("/").pop()))
    );

    // Delete from cloud
    for (const imageUrl of imagesToDelete) {
      await deleteFromCloudPE(imageUrl);
    }

    // --- 2️⃣ Upload new images ---
    const newImagesMap = {}; // filename => uploaded URL
    if (req.files?.images) {
      for (const file of req.files.images) {
        const uploadedUrl = await uploadToCloudPE(file, "products/images");
        newImagesMap[file.originalname] = uploadedUrl;
      }
    }

    // --- 3️⃣ Merge existing + new images according to imageOrder ---
    let allImages = [];
    const imageOrder = parseJSON(req.body.imageOrder);
    if (imageOrder.length > 0) {
      allImages = imageOrder.map(item => {
        if (item.type === "existing") return existingImages.find(img => img === item.url);
        if (item.type === "new") return newImagesMap[item.filename];
      }).filter(Boolean);
    } else {
      // fallback: all existing + newly uploaded images
      allImages = [...existingImages, ...Object.values(newImagesMap)];
    }

    // --- 4️⃣ Upload PDFs if provided ---
    let packinsertUrl = existingProduct.packinsert;
    if (req.files?.packinsert?.length > 0) {
      if (packinsertUrl) await deleteFromCloudPE(packinsertUrl);
      packinsertUrl = await uploadToCloudPE(req.files.packinsert[0], "products/packinsert");
    }

    let productpermitionsUrl = existingProduct.productpermitions;
    if (req.files?.productpermitions?.length > 0) {
      if (productpermitionsUrl) await deleteFromCloudPE(productpermitionsUrl);
      productpermitionsUrl = await uploadToCloudPE(req.files.productpermitions[0], "products/productpermitions");
    }

        // --- 5️⃣ Handle COPP file ---
    let coppUrl = existingProduct.copp;
    if (req.files?.copp?.length > 0) {
      if (coppUrl) await deleteFromCloudPE(coppUrl);
      coppUrl = await uploadToCloudPE(req.files.copp[0], "products/copp");
    }

        // --- 6️⃣ Handle FSC file ---
    let fscUrl = existingProduct.fsc;
    if (req.files?.fsc?.length > 0) {
      if (fscUrl) await deleteFromCloudPE(fscUrl);
      fscUrl = await uploadToCloudPE(req.files.fsc[0], "products/fsc");
    }

    
    // --- 7️⃣ Handle Dossier files ---
    let dossierUrls = existingProduct.dossier || [];
    // Delete removed dossier files if specified
    const removedDossiers = parseJSON(req.body.removedDossiers, []);
    dossierUrls = dossierUrls.filter(url => !removedDossiers.includes(url));
    for (const dossierUrl of removedDossiers) {
      await deleteFromCloudPE(dossierUrl);
    }
    // Add new dossier files
    if (req.files?.dossier?.length > 0) {
      for (const file of req.files.dossier) {
        const fileUrl = await uploadToCloudPE(file, "products/dossier");
        dossierUrls.push(fileUrl);
      }
    }

    // --- 8️⃣ Update DB (only schema fields + images + PDFs) ---
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          keyFeature: req.body.keyFeature,
          composition: req.body.composition,
          shortComposition: req.body.shortComposition,
          howToUse: req.body.howToUse,
          adverseEffect: req.body.adverseEffect,
          packingstyle: req.body.packingstyle,
          packingProfile: req.body.packingProfile,
          mainCategory: req.body.mainCategory,
          subCategory: req.body.subCategory,
          division: req.body.division,
          manufacturerName: req.body.manufacturerName,
          manufacturer: req.body.manufacturer ? JSON.parse(req.body.manufacturer) : existingProduct.manufacturer,
          innovatorname: req.body.innovatorname,
          hsn: req.body.hsn,
          images: allImages,
          packinsert: packinsertUrl,
          productpermitions: productpermitionsUrl,
          copp:coppUrl,
          fsc: fscUrl,
          dossier: dossierUrls
        }
      },
      { new: true, runValidators: true }
    );

    console.log("✅ Final image array:", allImages);
    console.log("✅ Updated DB product:", updatedProduct.images);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};





// ======================= Helper: Delete from CloudPE =======================
// const deleteFromCloudPE = async (fileUrl) => {
//   try {
//     const keyStartIndex = fileUrl.indexOf("products/");
//     if (keyStartIndex === -1) return console.error("Invalid file URL:", fileUrl);

//     const objectKey = fileUrl.substring(keyStartIndex); // e.g. "products/images/abc123.jpg"
//     await cloudpe.send(
//       new DeleteObjectCommand({
//         Bucket: process.env.CLOUDPE_BUCKET_NAME,
//         Key: objectKey,
//       })
//     );
//   } catch (err) {
//     console.error(`Failed to delete ${fileUrl}: ${err.message}`);
//   }
// };

// ======================= Helper: Delete from CloudPE =======================

const deleteFromCloudPE = async (fileUrl) => {
  try {
    const keyStartIndex = fileUrl.indexOf("products/");
    if (keyStartIndex === -1) return console.error("Invalid file URL:", fileUrl);

    const objectKey = fileUrl.substring(keyStartIndex); // e.g. "products/images/abc.jpg"
    await cloudpe.send(
      new DeleteObjectCommand({
        Bucket: process.env.CLOUDPE_BUCKET_NAME,
        Key: objectKey,
      })
    );
    console.log("🗑️ Deleted from Cloud:", objectKey);
  } catch (err) {
    console.error(`Failed to delete ${fileUrl}: ${err.message}`);
  }
};



// ======================= DELETE PRODUCT =======================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    // 🧹 Delete all images
    for (const img of product.images) await deleteFromCloudPE(img);

    // 🧹 Delete packinsert and productpermitions if exist
    if (product.packinsert) await deleteFromCloudPE(product.packinsert);
    if (product.productpermitions) await deleteFromCloudPE(product.productpermitions);
    if (product.copp) await deleteFromCloudPE(product.copp);
    if (product.fsc) await deleteFromCloudPE(product.fsc);

    await product.deleteOne();
    res.status(200).json({ success: true, message: "🗑️ Product deleted successfully" });
  } catch (error) {
    console.error(" Error deleting product:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

