import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

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
    selleblePrice: "",
    discount: "",
    coupon: "",
    productVisibility: "",
    category: "",
    productcategory: "",
    division: "",
    packingstyle: "",
    images: [],
    dispatchAddress: "",
    manufacturerName: "",
    batchNumber: "",

    hsn: "",
    gstProductCategories: "",
  });

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

  // Store existing images separately
  const [existingImages, setExistingImages] = useState([]);
  // Store newly selected images
  const [newImages, setNewImages] = useState([]);
  // Track images to be deleted
  const [imagesToDelete, setImagesToDelete] = useState([]);
  // Add this new state for the final ordered images
  const [orderedImages, setOrderedImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/products/${id}`
        );
        setFormData(response.data.product); // Populate the form with product details

        // Set existing images from the product data
        if (
          response.data.product.images &&
          response.data.product.images.length > 0
        ) {
          setExistingImages(response.data.product.images);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Update ordered images when existing or new images change
  useEffect(() => {
    const allImages = [
      ...existingImages.map((url, index) => ({
        id: `existing-${index}`,
        type: "existing",
        url: url,
        file: null,
      })),
      ...newImages.map((file, index) => ({
        id: `new-${index}`,
        type: "new",
        url: URL.createObjectURL(file),
        file: file,
      })),
    ];
    setOrderedImages(allImages);
  }, [existingImages, newImages]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Optional: Add client-side validation for numeric fields
    const numericFields = [
      "stock",
      "mrpPerBox",
      "mrpPerStrip",
      "mrpPerSachet",
      "mrpPerJar",
      "mrpPerTin",
      "mrpPerTube",
      "mrpPerBottle",
      "discount",
    ];

    let processedValue = value;

    if (numericFields.includes(name) && value !== "" && Number(value) < 0) {
      processedValue = "";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files); // Convert FileList to an array
      setNewImages([...newImages, ...files]);
    }
  };

  // Drag and drop handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setOrderedImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Update existing image removal to also update ordered images
  const handleRemoveExistingImageUpdated = (imageUrl) => {
    setExistingImages(existingImages.filter((img) => img !== imageUrl));
    setImagesToDelete([...imagesToDelete, imageUrl]);
    setOrderedImages(
      orderedImages.filter(
        (item) => !(item.type === "existing" && item.url === imageUrl)
      )
    );
  };

  // Update new image removal to also update ordered images
  const handleRemoveNewImageUpdated = (index) => {
    const fileToRemove = newImages[index];
    setNewImages(newImages.filter((_, i) => i !== index));
    setOrderedImages(
      orderedImages.filter(
        (item) => !(item.type === "new" && item.file === fileToRemove)
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        // Skip the images array in formData
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append existing images that were not removed (maintain order)
    const orderedExistingImages = orderedImages
      .filter((img) => img.type === "existing")
      .map((img) => img.url);

    formDataToSend.append(
      "existingImages",
      JSON.stringify(orderedExistingImages)
    );

    // Append images to delete
    formDataToSend.append("imagesToDelete", JSON.stringify(imagesToDelete));

    // Append new images in the correct order
    const orderedNewImages = orderedImages
      .filter((img) => img.type === "new")
      .map((img) => img.file);

    orderedNewImages.forEach((image) => {
      formDataToSend.append("newImages", image);
    });

    // Send the complete image order information
    const imageOrderInfo = orderedImages.map((img) => ({
      type: img.type,
      id: img.id,
    }));
    formDataToSend.append("imageOrder", JSON.stringify(imageOrderInfo));

    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/products/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product updated successfully!");
      navigate("/admin/products"); // Redirect to the products page
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  const imagePreviews = orderedImages.map((img) => ({
    id: img.id,
    preview: img.url,
    type: img.type,
  }));

  const imageOrder = orderedImages.map((img) => img.id);

  // Sortable Item Component
  // Replace the existing SortableItem component with this updated version:
  const SortableItem = ({ id, imageData, index }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-2 border-gray-300 rounded-md overflow-hidden cursor-move hover:border-purple-400 transition-colors flex-shrink-0 m-1"
      >
        <img
          src={imageData.preview}
          alt={`Image ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 left-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {index + 1}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-10 bg-purple-200 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
        Edit Product
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
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="shortComposition"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Short Composition *
          </label>
          <textarea
            id="shortComposition"
            name="shortComposition"
            value={formData.shortComposition}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          ></textarea>
        </div>

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
          ></textarea>
        </div>

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
          />
        </div>

        <div>
          <label
            htmlFor="selleblePrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Selleble Price
          </label>
          <input
            type="number"
            id="selleblePrice"
            name="selleblePrice"
            value={formData.selleblePrice}
            onChange={handleChange}
          
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Price */}
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
          />
        </div>

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
          />
        </div>

        <div>
          <label
            htmlFor="dispatchAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dipatch Address *
          </label>
          <textarea
            id="dispatchAddress"
            name="dispatchAddress"
            value={formData.dispatchAddress}
            onChange={handleChange}
            
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        {/* <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <label
                htmlFor="dipatchAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
               dipatchAddress *
              </label>
              <input
                type="text"
                id="dipatchAddress"
                name="dipatchAddress"
                value={formData.dipatchAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="dipatchAddress *"
              />
            </div> */}

        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <label
                htmlFor="mrpPerBottle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Manufacturer Name *
              </label>
              <input
                type="text"
                id="manufacturerName"
                name="manufacturerName"
                value={formData.manufacturerName}
                onChange={handleChange}
                
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="manufacturerName *"
              />
        </div>

        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <label
                htmlFor="batchNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                batchNumber *
              </label>
              <input
                type="text"
                id="batchNumber"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
                
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="batchNumber *"
              />
            </div>

           
            

            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <label
                htmlFor="hsn"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
               hsn *
              </label>
              <input
                type="text"
                id="hsn"
                name="hsn"
                value={formData.hsn}
                onChange={handleChange}
                
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="hsn *"
              />
            </div>

            <div>
          <label
            htmlFor="gstProductCategories"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            gstProductCategories *
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
              Select gstProductCategories
            </option>
            {productgst.map((gstProductCategories) => (
              <option key={gstProductCategories} value={gstProductCategories}>
                {gstProductCategories}
              </option>
            ))}
          </select>
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

        {/* Image Upload for New Images */}
        <div>
          <label
            htmlFor="newImages"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Add New Product Images
          </label>
          <input
            type="file"
            id="newImages"
            name="newImages"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className="w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-purple-100 file:text-purple-700
      hover:file:bg-purple-200"
          />

          {/* Display New Image Previews */}
          {newImages.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">New Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                {newImages.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-square max-w-32 sm:max-w-36 md:max-w-40 border border-gray-300 rounded-md overflow-hidden group"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImageUpdated(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display Existing Image Previews */}
          {existingImages.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-700 mb-2">
                Existing Images
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                {existingImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-square max-w-32 sm:max-w-36 md:max-w-40 border border-gray-300 rounded-md overflow-hidden group"
                  >
                    <img
                      src={imageUrl}
                      alt={`Existing Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImageUpdated(imageUrl)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Order Section with Drag and Drop */}
          {imagePreviews.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">
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
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-start">
                    {imageOrder.map((id, index) => {
                      const preview = imagePreviews.find((p) => p.id === id);
                      return (
                        <SortableItem
                          key={id}
                          id={id}
                          imageData={preview}
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
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
