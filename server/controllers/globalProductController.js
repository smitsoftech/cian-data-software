import GlobalProduct from "../models/GlobalProduct.js";
import { uploadToCloudPE } from "../utils/fileUpload.js";

// ✅ Create new product
export const createGlobalProduct = async (req, res) => {
  try {
    const { productName, description, type, category } = req.body;

    // Validate fields
    if (!productName || !description || !type || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload images
    const imageFiles = req.files?.images || [];
    const pdfFile = req.files?.productLeaflet?.[0];

    if (imageFiles.length === 0 || !pdfFile) {
      return res
        .status(400)
        .json({ message: "Images and PDF leaflet are required" });
    }

    const imageUrls = [];
    for (const img of imageFiles) {
      const uploadedUrl = await uploadToCloudPE(img, "globalProducts/images");
      imageUrls.push(uploadedUrl);
    }

    const pdfUrl = await uploadToCloudPE(pdfFile, "globalProducts/pdfs");

    const product = await GlobalProduct.create({
      productName,
      images: imageUrls,
      description,
      productLeaflet: pdfUrl,
      type,
      category,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all products
// export const getAllGlobalProducts = async (req, res) => {
//   try {
//     const products = await GlobalProduct.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const getAllGlobalProducts = async (req, res) => {
  try {
    const { type, category } = req.query;
    const query = {};
    if (type) query.type = type;
    if (category) query.category = category;

    const products = await GlobalProduct.find(query);
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};



// ✅ Get single product by ID
export const getGlobalProductById = async (req, res) => {
  try {
    const product = await GlobalProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update product
export const updateGlobalProduct = async (req, res) => {
  try {
    const { productName, description, type, category } = req.body;
    const product = await GlobalProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // If new images uploaded
    if (req.files?.images?.length) {
      const imageUrls = [];
      for (const img of req.files.images) {
        const uploadedUrl = await uploadToCloudPE(img, "globalProducts/images");
        imageUrls.push(uploadedUrl);
      }
      product.images = imageUrls;
    }

    // If new PDF uploaded
    if (req.files?.productLeaflet?.length) {
      const pdfUrl = await uploadToCloudPE(
        req.files.productLeaflet[0],
        "globalProducts/pdfs"
      );
      product.productLeaflet = pdfUrl;
    }

    product.productName = productName || product.productName;
    product.description = description || product.description;
    product.type = type || product.type;
    product.category = category || product.category;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete product
export const deleteGlobalProduct = async (req, res) => {
  try {
    const product = await GlobalProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
