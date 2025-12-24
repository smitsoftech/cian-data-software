import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    keyFeature: "",
    shortComposition: "",
    composition: "",
    howToUse: "",
    adverseEffect: "",
    packingProfile: "",
    producttype: "",
    stock: "",
    mrpPerBox: "",
    mrpPerStrip: "",
    mrpPerSachet: "",
    mrpPerJar: "",
    mrpPerTin: "",
    mrpPerTube: "",
    mrpPerBottle: "",
    bottleType: "",
    mrpPerQuantity: "",
    discount: "",
    coupon: "",
    productVisibility: "",
    category: "",
    productcategory: "",
    division: "",
    packingstyle: "",
    images: [], // Updated to handle multiple images
    dispatchAddress: "",
    manufacturerName: "",
    batchNumber: "",
    hsn: "",
    gstProductCategories: "",
    selleblePrice: "",
  });

  const navigate = useNavigate();

  const [imagePreviews, setImagePreviews] = useState([]); // Store image previews
  const [imageOrder, setImageOrder] = useState([]); // Store the order of images
  const [loading, setLoading] = useState(false);


  const categories = [
    "Antibiotic Preparation",
    "Anti-inflammatory/Analgesics",
    "Anti-Ulcerants/Antinauseants",
    "Calcium Preparation",
    "Haematinic Preparation",
    "Multivitamin Preparation",
    "Protein Preparation",
    "ORS",
    "Mouth Hygiene",
    "Ortho Preparation",
    "Gynaec Preparation",
    "Cardiac and Diabetic Preparation",
    "Cough Preparation",
    "GI Preparation",
    "Derma Preparation",
    "Soaps",
    "Neuro",
    "Injectables",
    "Veterinary",
  ];

  const producttypes = [
    "BOTTLE",
    "JAR",
    "LAMITUBE",
    "Vial",
    "DISPOPACK",
    "TIN",
    "CARTON",
    "SACHET",
    "INFUSION",
    "ALU ALU / BLISTER / Trey pack / ALUMINIUM STRIP / AMPUOLE",
  ];

  const segments = [
    "GI PREPARATION",
    "COUGH PREPARATION",
    "ANTI-ULCERANTS/ ANTINAUSEANTS",
    "CARDIAC & DIABETIC PREPARATION",
    "COUGH PREPARATION",
    "MOUTH HYGINE",
    "ANTI-INFLAMMATORY/ ANALGESIC",
    "DERMA PREPARATION",
    "GYNAEC PREPARATION",
    "MULTIVITAMIN PREPARATION",
    "INJECTABLES",
    "CALCIUM PREPARATION",
    "ORTHO PREPARATION",
    "ANTIBIOTIC PREPARATION",
    "ORS",
    "SOAPS",
    "PROTEIN PREPARATION",
    "NEURO",
    "HAEMATINIC PREPARATION",
  ];

  const divisions = [
    "CIAN HEALTHCARE LTD",
    "CELESTA",
    "CV CURE",
    "RESPIROVA",
    "DENTALIS",
    "J.M.SIMS",
    "OSCURA",
    "TRANS I VAC",
    "CIANSTAR",
    "CADMAXY",
    "CADOGS",
    "PETAGE",
    "DERMACIA",
  ];

  const packingProfiles = [
    "BOTTLE",
    "JAR",
    "LAMITUBE",
    "VIAL",
    "DISPOPACK",
    "TIN",
    "CARTON",
    "SACHET",
    "INFUSION",
    "ALU ALU",
    "BLISTER",
    "TREY PACK",
    "ALUMINIUM STRIP",
    "AMPUOLE",
    "ALUMINIUMN TUBE",
    "TOOTHPASTE",
  ];

  const productvisibilities = ["Sellable Product", "Display Product", "Both"];

  const productcategories = ["Medicine", "Wellness", "Beauty", "Veterinary"];

  const productgst = ["12", "18"];

  const bottleTypes = ["Tablet", "Capsule", "Liquid"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteImage = (imageId) => {
    // Find the preview to get the originalIndex
    const previewToDelete = imagePreviews.find((p) => p.id === imageId);

    if (previewToDelete) {
      // Remove from images array
      const updatedImages = formData.images.filter(
        (_, index) => index !== previewToDelete.originalIndex
      );

      // Remove from previews
      const updatedPreviews = imagePreviews.filter((p) => p.id !== imageId);

      // Remove from order
      const updatedOrder = imageOrder.filter((id) => id !== imageId);

      // Update originalIndex for remaining previews
      const reindexedPreviews = updatedPreviews.map((preview, index) => ({
        ...preview,
        originalIndex: index,
      }));

      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(previewToDelete.preview);

      setFormData({
        ...formData,
        images: updatedImages,
      });
      setImagePreviews(reindexedPreviews);
      setImageOrder(updatedOrder);
    }
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files); // Convert FileList to an array

    // Combine existing images with new files
    const updatedImages = [...formData.images, ...newFiles];

    setFormData({
      ...formData,
      images: updatedImages,
    });

    // Generate previews for new files only
    const newPreviews = newFiles.map((file, index) => ({
      id: `image-${Date.now()}-${index}`, // Use timestamp to ensure unique IDs
      preview: URL.createObjectURL(file),
      file: file,
      originalIndex: formData.images.length + index, // Adjust index based on existing images
    }));

    // Combine existing previews with new previews
    const updatedPreviews = [...imagePreviews, ...newPreviews];
    const updatedOrder = [...imageOrder, ...newPreviews.map((p) => p.id)];

    setImagePreviews(updatedPreviews);
    setImageOrder(updatedOrder);

    // Clear the input value to allow selecting the same files again if needed
    e.target.value = "";
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImageOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Update the images array in formData to match the new order
        const reorderedImages = newOrder.map((id) => {
          const preview = imagePreviews.find((p) => p.id === id);
          return preview.file;
        });

        setFormData((prev) => ({
          ...prev,
          images: reorderedImages,
        }));

        return newOrder;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("keyFeature", formData.keyFeature);
    formDataToSend.append("shortComposition", formData.shortComposition);
    formDataToSend.append("composition", formData.composition);
    formDataToSend.append("howToUse", formData.howToUse);
    formDataToSend.append("adverseEffect", formData.adverseEffect);
    formDataToSend.append("packingProfile", formData.packingProfile);
    formDataToSend.append("producttype", formData.producttype);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("mrpPerBox", formData.mrpPerBox);
    formDataToSend.append("mrpPerStrip", formData.mrpPerStrip);
    formDataToSend.append("mrpPerSachet", formData.mrpPerSachet);
    formDataToSend.append("mrpPerJar", formData.mrpPerJar);
    formDataToSend.append("mrpPerTin", formData.mrpPerTin);
    formDataToSend.append("mrpPerTube", formData.mrpPerTube);
    formDataToSend.append("discount", formData.discount);
    formDataToSend.append("coupon", formData.coupon);
    formDataToSend.append("productVisibility", formData.productVisibility);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("productcategory", formData.productcategory);
    formDataToSend.append("division", formData.division);
    formDataToSend.append("packingstyle", formData.packingstyle);
    formDataToSend.append("dispatchAddress", formData.dispatchAddress);
    formDataToSend.append("manufacturerName", formData.manufacturerName);
    formDataToSend.append("batchNumber", formData.batchNumber);
    
    formDataToSend.append("hsn", formData.hsn);
    formDataToSend.append("gstProductCategories", formData.gstProductCategories);
    formDataToSend.append("selleblePrice", formData.selleblePrice);

    if (formData.mrpPerBottle) {
      formDataToSend.append("mrpPerBottle", formData.mrpPerBottle);
    }
    if (formData.bottleType) {
      formDataToSend.append("bottleType", formData.bottleType);
    }
    if (formData.mrpPerQuantity) {
      formDataToSend.append("mrpPerQuantity", formData.mrpPerQuantity);
    }

    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loader
    }
  };


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const SortableItem = ({ id, preview, index }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative w-full aspect-square max-w-32 sm:max-w-36 md:max-w-40 border-2 border-gray-300 rounded-md overflow-hidden cursor-grab active:cursor-grabbing hover:border-purple-400 bg-white"
      >
        <img
          src={preview}
          alt={`Preview ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 left-1 bg-purple-600 text-white text-xs px-2 py-1 rounded">
          {index + 1}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-purple-200 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter product description"
          ></textarea>
        </div>

        {/* Key Feature */}
        <div>
          <label
            htmlFor="keyFeature"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Key Feature *
          </label>
          <textarea
            id="keyFeature"
            name="keyFeature"
            value={formData.keyFeature}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter key features"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="composition"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Short Composition
          </label>
          <textarea
            id="shortComposition"
            name="shortComposition"
            value={formData.shortComposition}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Short composition"
          ></textarea>
        </div>

        {/* Composition */}
        <div>
          <label
            htmlFor="composition"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Composition *
          </label>
          <textarea
            id="composition"
            name="composition"
            value={formData.composition}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter composition"
          ></textarea>
        </div>

        {/* How to Use */}
        <div>
          <label
            htmlFor="howToUse"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            How to Use *
          </label>
          <textarea
            id="howToUse"
            name="howToUse"
            value={formData.howToUse}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter usage instructions"
          ></textarea>
        </div>

        {/* Adverse Effect */}
        <div>
          <label
            htmlFor="adverseEffect"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Adverse Effect *
          </label>
          <textarea
            id="adverseEffect"
            name="adverseEffect"
            value={formData.adverseEffect}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter adverse effects"
          ></textarea>
        </div>

        {/* Product Pack Size */}
        <div>
          <label
            htmlFor="packingstyle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Packing Style *
          </label>
          <textarea
            id="packingstyle"
            name="packingstyle"
            value={formData.packingstyle}
            onChange={handleChange}
            required
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter packing style"
          ></textarea>
        </div>

        {/* producttype */}
        <div>
          <label
            htmlFor="producttype"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Type *
          </label>
          <select
            id="producttype"
            name="producttype"
            value={formData.producttype}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Select a product type
            </option>
            {producttypes.map((producttype) => (
              <option key={producttype} value={producttype}>
                {producttype}
              </option>
            ))}
          </select>
        </div>

        {formData.producttype === "BOTTLE" && (
          <>
            {/* Gender Field */}
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <label
                htmlFor="bottleType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bottle Type *
              </label>
              <select
                id="bottleType"
                name="bottleType"
                value={formData.bottleType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" disabled>
                  Select Bottle Type
                </option>
                {bottleTypes.map((bottleType) => (
                  <option key={bottleType} value={bottleType}>
                    {bottleType}
                  </option>
                ))}
              </select>
            </div>

            {/* Age Field */}
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <label
                htmlFor="mrpPerBottle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mrp Per Bottle *
              </label>
              <input
                type="text"
                id="mrpPerBottle"
                name="mrpPerBottle"
                value={formData.mrpPerBottle}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="mrpPerBottle (₹) *"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <label
                htmlFor="mrpPerQuantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                U.S.P *
              </label>
              <textarea
                id="mrpPerQuantity"
                name="mrpPerQuantity"
                value={formData.mrpPerQuantity}
                onChange={handleChange}
                required
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g per N xx₹ , per 5ml xx₹, per 10ml xx₹, per ml xx₹"
              ></textarea>
            </div>
          </>
        )}

        <div>
          <label
            htmlFor="mrpPerBox"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
          Selleble Price (₹)
          </label>
          <input
            type="number"
            id="selleblePrice"
            name="selleblePrice"
            value={formData.selleblePrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>

        {/* MRP per Box */}
        <div>
          <label
            htmlFor="mrpPerBox"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            MRP Per Box (₹)
          </label>
          <input
            type="number"
            id="mrpPerBox"
            name="mrpPerBox"
            value={formData.mrpPerBox}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>

        {/* MRP Per Strip */}
        <div>
          <label
            htmlFor="mrpPerStrip"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            MRP Per Strip (₹)
          </label>
          <input
            type="number"
            id="mrpPerStrip"
            name="mrpPerStrip"
            value={formData.mrpPerStrip}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label
            htmlFor="mrpPerSachet"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            MRP Per Sachet (₹)
          </label>
          <input
            type="number"
            id="mrpPerSachet"
            name="mrpPerSachet"
            value={formData.mrpPerSachet}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label
            htmlFor="mrpPerJar"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            MRP Per Jar (₹)
          </label>
          <input
            type="number"
            id="mrpPerJar"
            name="mrpPerJar"
            value={formData.mrpPerJar}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label
            htmlFor="mrpPerTin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            MRP Per Tin (₹)
          </label>
          <input
            type="number"
            id="mrpPerTin"
            name="mrpPerTin"
            value={formData.mrpPerTin}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label
            htmlFor="mrpPerTube"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            MRP Per Tube (₹)
          </label>
          <input
            type="number"
            id="mrpPerTube"
            name="mrpPerTube"
            value={formData.mrpPerTube}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label
            htmlFor="productVisibility"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Visibility *
          </label>
          <select
            id="productVisibility"
            name="productVisibility"
            value={formData.productVisibility}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Select a Product Visibility
            </option>
            {productvisibilities.map((productVisibility) => (
              <option key={productVisibility} value={productVisibility}>
                {productVisibility}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="productcategory"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Category *
          </label>
          <select
            id="productcategory"
            name="productcategory"
            value={formData.productcategory}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Select a product category
            </option>
            {productcategories.map((productcategory) => (
              <option key={productcategory} value={productcategory}>
                {productcategory}
              </option>
            ))}
          </select>
        </div>

        {/* Segment */}
        {/* <div>
          <label
            htmlFor="segment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Segment *
          </label>
          <select
            id="segment"
            name="segment"
            value={formData.segment}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Select a Segment
            </option>
            {segments.map((segment) => (
              <option key={segment} value={segment}>
                {segment}
              </option>
            ))}
          </select>
        </div> */}

        {/* Division */}
        <div>
          <label
            htmlFor="division"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Division *
          </label>
          <select
            id="division"
            name="division"
            value={formData.division}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Select a Division
            </option>
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </div>

        {/* Packing Style */}
        <div>
          <label
            htmlFor="packingProfile"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Packing Profile *
          </label>
          <select
            id="packingProfile"
            name="packingProfile"
            value={formData.packingProfile}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Select a Product Packing Profile
            </option>
            {packingProfiles.map((packingProfile) => (
              <option key={packingProfile} value={packingProfile}>
                {packingProfile}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="dispatchAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dipatch Address
          </label>
          <textarea
            id="dispatchAddress"
            name="dispatchAddress"
            value={formData.dispatchAddress}
            onChange={handleChange}
            
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter product Dispatch Address"
          ></textarea>
        </div>
        {/* <div>
          <label
            htmlFor="dipatchAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product dipatchAddress Name *
          </label>
          <input
            type="text"
            id="dipatchAddress"
            name="dipatchAddress"
            value={formData.dipatchAddress}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter product dipatchAddress Name"
          />
        </div> */}

        <div>
          <label
            htmlFor="manufacturerName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Manufacturer Name
          </label>
          <input
            type="text"
            id="manufacturerName"
            name="manufacturerName"
            value={formData.manufacturerName}
            onChange={handleChange}
            
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter product Manufacturer Name"
          />
        </div>

        <div>
          <label
            htmlFor="batchNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product batchNumber
          </label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={formData.batchNumber}
            onChange={handleChange}
            
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter product batchNumber"
          />
        </div>

        

        <div>
          <label
            htmlFor="hsn"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product HSN
          </label>
          <input
            type="text"
            id="hsn"
            name="hsn"
            value={formData.hsn}
            onChange={handleChange}
            
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter product HSN"
          />
        </div>

        <div>
          <label
            htmlFor="gstProductCategories"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GST Product Categories *
          </label>
          <select
            id="gstProductCategories"
            name="gstProductCategories"
            value={formData.gstProductCategories}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Select GST Product Categories in %
            </option>
            {productgst.map((gstProductCategories) => (
              <option key={gstProductCategories} value={gstProductCategories}>
                {gstProductCategories}
              </option>
            ))}
          </select>
        </div>


        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="This field is Optional "
          />
        </div>

        <div>
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="This field is Optional"
          />
        </div>

        <div>
          <label
            htmlFor="coupon"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Coupon
          </label>
          <input
            type="text"
            id="coupon"
            name="coupon"
            value={formData.coupon}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="This field is Optional"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Images *
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}




            accept="image/*"
            multiple // Allow multiple file selection
            className="w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-purple-100 file:text-purple-700
      hover:file:bg-purple-200"
          />

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div
                  key={preview.id}
                  className="relative group w-32 h-32 border border-gray-300 rounded-md overflow-hidden"
                >
                  <img
                    src={preview.preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Delete button for regular preview */}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(preview.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Delete image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Image Display Order Section */}
          {imagePreviews.length > 0 && (
            <div className="mt-6 bg-white p-4 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Image Display Order (Drag to Reorder)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This is the order images will be saved and displayed. Drag to
                rearrange.
              </p>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={imageOrder}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                    {imageOrder.map((id, index) => {
                      const preview = imagePreviews.find((p) => p.id === id);
                      return (
                        <SortableItem
                          key={id}
                          id={id}
                          preview={preview.preview}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center bg-purple-600 text-white py-2 px-4 rounded-md 
      ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"} 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProductForm;
