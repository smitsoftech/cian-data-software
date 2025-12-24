import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import Product from "../models/ProductModel.js";
import cloudpe from "../utils/cloudpe.js";
import mongoose from "mongoose";
import { uploadToCloudPE } from "../utils/fileUpload.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      keyFeature,
      shortComposition,
      composition,
      howToUse,
      adverseEffect,
      packingProfile,
      producttype,
      stock,
      mrpPerBox,
      mrpPerStrip,
      mrpPerSachet,
      mrpPerJar,
      selleblePrice,
      mrpPerTin,
      mrpPerTube,
      mrpPerBottle,
      bottleType,
      mrpPerQuantity,
      discount,
      coupon,
      productVisibility,
      category,
      productcategory,
      division,
      packingstyle,
      dispatchAddress,
      manufacturerName,
      batchNumber,
      hsn,
      gstProductCategories,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !keyFeature ||
      !composition ||
      !howToUse ||
      !adverseEffect ||
      !packingProfile ||
      !producttype ||
      !productVisibility ||
      !category ||
      !productcategory ||
      !division ||
      !packingstyle ||
      
      !gstProductCategories 
    ) {
      console.log("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Collect image URLs from uploaded files
    let images = [];
    if (req.files && req.files.length > 0) {
      try {
        for (const file of req.files) {
          // Upload each file to CloudPE and get the file URL
          const fileUrl = await uploadToCloudPE(file, "products");
          images.push(fileUrl);
        }
      } catch (uploadError) {
        console.error("Error during file upload process:", uploadError);
        return res.status(500).json({
          message: "Error uploading files",
          error: uploadError.message,
          details: uploadError.stack,
        });
      }
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      keyFeature,
      shortComposition,
      composition,
      howToUse,
      adverseEffect,
      packingProfile,
      producttype,
      stock,
      mrpPerBox,
      mrpPerStrip,
      mrpPerSachet,
      mrpPerJar,
      mrpPerTin,
      mrpPerTube,
      mrpPerBottle,
      bottleType,
      mrpPerQuantity,
      selleblePrice,
      discount,
      coupon,
      productVisibility,
      category,
      productcategory,
      division,
      packingstyle,
      images, // Save the array of image URLs
      dispatchAddress,
      manufacturerName,
      batchNumber,
      hsn,
      gstProductCategories,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let {
      name,
      description,
      keyFeature,
      composition,
      shortComposition,
      howToUse,
      adverseEffect,
      packingProfile,
      producttype,
      stock,
      mrpPerBox,
      mrpPerStrip,
      mrpPerSachet,
      mrpPerJar,
      mrpPerTin,
      mrpPerTube,
      mrpPerBottle,
      bottleType,
      mrpPerQuantity,
      selleblePrice,
      discount,
      coupon,
      productVisibility,
      category,
      productcategory,
      division,
      packingstyle,
      dispatchAddress,
      manufacturerName,
      batchNumber,
      
      hsn,
      gstProductCategories,
    } = req.body;

    // Handle stock - convert to number or set to undefined for removal
    if (
      stock === "null" ||
      stock === "" ||
      stock === null ||
      stock === undefined
    ) {
      stock = undefined;
    } else {
      const parsedStock = Number(stock);
      if (isNaN(parsedStock)) {
        stock = undefined;
      } else {
        stock = parsedStock;
      }
    }

    // Handle discount - always ensure it's a number, default to 0 for empty values
    const parsedDiscount = Number(discount);
    discount = isNaN(parsedDiscount) || discount === "" ? 0 : parsedDiscount;

    // Updated sanitizeNumber function to handle empty strings properly
    const sanitizeNumber = (val) => {
      // If explicitly empty string, set to 0 (to trigger schema default)
      if (val === "") return 0;
      // If null, undefined, or "null" string, set to 0
      if (val === "null" || val === null || val === undefined) return 0;
      const num = Number(val);
      // If not a valid number, set to 0
      return isNaN(num) ? 0 : num;
    };

    // Apply sanitization to all MRP fields
    mrpPerBox = sanitizeNumber(mrpPerBox);
    mrpPerStrip = sanitizeNumber(mrpPerStrip);
    mrpPerSachet = sanitizeNumber(mrpPerSachet);
    mrpPerJar = sanitizeNumber(mrpPerJar);
    mrpPerTin = sanitizeNumber(mrpPerTin);
    mrpPerTube = sanitizeNumber(mrpPerTube);
    mrpPerBottle = sanitizeNumber(mrpPerBottle);

    // Handle mrpPerQuantity as string (not number) - allow empty string
    if (
      mrpPerQuantity === "null" ||
      mrpPerQuantity === null ||
      mrpPerQuantity === undefined
    ) {
      mrpPerQuantity = "";
    }

    // Handle bottleType as string - allow empty string
    if (
      bottleType === "null" ||
      bottleType === null ||
      bottleType === undefined
    ) {
      bottleType = "";
    }

    // Handle coupon as string - allow empty string
    if (coupon === "null" || coupon === null || coupon === undefined) {
      coupon = "";
    }

    // Parse the existing images and images to delete from the request
    let existingImages = [];
    let imagesToDelete = [];

    if (req.body.existingImages) {
      existingImages = JSON.parse(req.body.existingImages);
    }

    if (req.body.imagesToDelete) {
      imagesToDelete = JSON.parse(req.body.imagesToDelete);
    }

    // Delete images from CloudPE that are marked for deletion
    if (imagesToDelete && imagesToDelete.length > 0) {
      for (const imageUrl of imagesToDelete) {
        try {
          // Extract the key from the image URL
          const urlParts = imageUrl.split("/");
          const filename = urlParts[urlParts.length - 1];
          const folder = urlParts[urlParts.length - 2];
          const objectKey = `${folder}/${filename}`;

          // Delete the file from CloudPE
          const deleteParams = {
            Bucket: process.env.CLOUDPE_BUCKET_NAME,
            Key: objectKey,
          };

          await cloudpe.send(new DeleteObjectCommand(deleteParams));
        } catch (deleteError) {
          console.error(
            `Error deleting image from CloudPE: ${deleteError.message}`
          );
        }
      }
    }

    // Upload any new images - Updated to handle the new field structure
    let newUploadedImages = [];
    if (req.files && req.files.newImages && req.files.newImages.length > 0) {
      try {
        for (const file of req.files.newImages) {
          const fileUrl = await uploadToCloudPE(file, "products");
          newUploadedImages.push(fileUrl);
        }
      } catch (uploadError) {
        console.error(
          "Error during file upload process for update:",
          uploadError
        );
        return res.status(500).json({
          success: false,
          message: "Error uploading files for update",
          error: uploadError.message,
        });
      }
    }

    // Parse the image order information from frontend
    let imageOrder = [];
    if (req.body.imageOrder) {
      imageOrder = JSON.parse(req.body.imageOrder);
    }

    // Combine and order images based on the frontend order
    let finalImages = [];

    if (imageOrder && imageOrder.length > 0) {
      // Use the order specified by the frontend
      let existingImageIndex = 0;
      let newImageIndex = 0;

      for (const item of imageOrder) {
        if (item.type === "existing") {
          if (existingImageIndex < existingImages.length) {
            finalImages.push(existingImages[existingImageIndex]);
            existingImageIndex++;
          }
        } else if (item.type === "new") {
          if (newImageIndex < newUploadedImages.length) {
            finalImages.push(newUploadedImages[newImageIndex]);
            newImageIndex++;
          }
        }
      }
    } else {
      // Fallback: combine existing images with new images
      finalImages = [...existingImages, ...newUploadedImages];
    }

    const updateData = {
      name,
      description,
      keyFeature,
      composition,
      shortComposition,
      howToUse,
      adverseEffect,
      packingProfile,
      producttype,
      mrpPerBox,
      mrpPerStrip,
      mrpPerSachet,
      mrpPerJar,
      mrpPerTin,
      mrpPerTube,
      mrpPerBottle,
      bottleType,
      mrpPerQuantity,
      selleblePrice,
      discount,
      coupon,
      productVisibility,
      category,
      productcategory,
      division,
      packingstyle,
      images: finalImages,
      dispatchAddress,
      manufacturerName,
      batchNumber,
      hsn,
      gstProductCategories,
    };

    // Only include stock if it's defined
    if (stock !== undefined) {
      updateData.stock = stock;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${req.params.id} not found`,
      });
    }

    // Delete images from CloudPE
    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        try {
          // Extract the key from the image URL
          // Format: https://s3.in-west3.purestore.io/bucketname/products/filename.jpg
          const urlParts = imageUrl.split("/");
          // Get the folder and filename parts for the correct key
          const filename = urlParts[urlParts.length - 1];
          const folder = urlParts[urlParts.length - 2];
          const objectKey = `${folder}/${filename}`;

          // Delete the file from CloudPE
          const deleteParams = {
            Bucket: process.env.CLOUDPE_BUCKET_NAME,
            Key: objectKey,
          };

          await cloudpe.send(new DeleteObjectCommand(deleteParams));
        } catch (deleteError) {
          console.error(
            `Error deleting image from CloudPE: ${deleteError.message}`
          );
          console.error("Error details:", JSON.stringify(deleteError, null, 2));
          // Continue with deletion even if an image fails to delete
        }
      }
    }

    // Delete product from database
    await product.deleteOne(); // Use deleteOne instead of remove

    res.status(200).json({
      success: true,
      message: `Product with ID ${req.params.id} deleted successfully`,
    });
  } catch (error) {
    console.error(
      `Error deleting product with ID ${req.params.id}:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
      stack: error.stack,
    });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
