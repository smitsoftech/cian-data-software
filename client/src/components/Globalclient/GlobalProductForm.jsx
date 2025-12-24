import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

const types = ["Cian Health Care Limited", "Dr Smith Biotech Pvt Ltd"];

// Define category options based on type
const categoryOptions = {
  "Cian Health Care Limited": [
    "Pharmaceuticals",
    "Health Supplement and Nutraceutical",
    "Veterinary",
    "Cosmetics",
  ],
  "Dr Smith Biotech Pvt Ltd": [
    "Pharmaceuticals",
    "Health Supplement and Nutraceutical",
  ],
};

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
  "link",
];

useNavigate

const SortableImage = ({ id, src }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: "0.25rem",
    cursor: "grab",
  };

  return <img ref={setNodeRef} src={src} alt="preview" style={style} {...attributes} {...listeners} />;
};

const GlobalProductForm = ({ fetchProducts, editProduct, onCancelEdit }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(types[0]);
  const [category, setCategory] = useState(categoryOptions[types[0]][0]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [pdfName, setPdfName] = useState("");const [loading, setLoading] = useState(false); // 👈 added state
const navigate = useNavigate(); // ✅ call hook at the top

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (editProduct) {
      setProductName(editProduct.productName || "");
      setDescription(editProduct.description || "");
      setType(editProduct.type || types[0]);
      setCategory(editProduct.category || categoryOptions[editProduct.type || types[0]][0]);
      setImages([]);
      setPdf(null);
      setImagePreviews(editProduct.images || []);
      setPdfName(editProduct.productLeaflet ? editProduct.productLeaflet.split("/").pop() : "");
    }
  }, [editProduct]);

  // Reset category when type changes
  useEffect(() => {
    const availableCategories = categoryOptions[type];
    if (!availableCategories.includes(category)) {
      setCategory(availableCategories[0]);
    }
  }, [type]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setPdf(file);
    setPdfName(file?.name || "");
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = imagePreviews.findIndex((_, i) => i === active.id);
      const newIndex = imagePreviews.findIndex((_, i) => i === over.id);
      const newPreviews = arrayMove(imagePreviews, oldIndex, newIndex);
      setImagePreviews(newPreviews);
      if (images.length) {
        const newImages = arrayMove(images, oldIndex, newIndex);
        setImages(newImages);
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!images.length && !editProduct) {
  //     alert("Please select at least one image.");
  //     return;
  //   }
  //   if (!pdf && !editProduct) {
  //     alert("Please select a PDF leaflet.");
  //     return;
  //   }

  //   setLoading(true); // 👈 start loading

  //   const formData = new FormData();
  //   formData.append("productName", productName);
  //   formData.append("description", description);
  //   formData.append("type", type);
  //   formData.append("category", category);

  //   images.forEach((img) => formData.append("images", img));
  //   if (pdf) formData.append("productLeaflet", pdf);

  //   try {
  //     const res = editProduct?._id
  //       ? await axios.put(`${import.meta.env.VITE_SERVER}/api/globalproducts/${editProduct._id}`, formData, {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         })
  //       : await axios.post(`${import.meta.env.VITE_SERVER}/api/globalproducts`, formData, {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         });

  //     console.log("Response:", res.data);
  //     alert(res.data.message || "Product saved successfully");

  //     setProductName("");
  //     setDescription("");
  //     setType(types[0]);
  //     setCategory(categoryOptions[types[0]][0]);
  //     setImages([]);
  //     setImagePreviews([]);
  //     setPdf(null);
  //     setPdfName("");
  //     fetchProducts();
  //     if (onCancelEdit) onCancelEdit();
  //      // ✅ Navigate after add/edit
  //     navigate("/globalclient");
  //   } catch (err) {
  //     console.error("Upload Error:", err.response?.data || err.message);
  //   }  finally {
  //     setLoading(false); // 👈 stop loading
  //      navigate("/globalclient");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 🧩 Validation with SweetAlert2
  if (!images.length && !editProduct) {
    Swal.fire({
      icon: "warning",
      title: "Missing Images",
      text: "Please select at least one image before submitting.",
    });
    return;
  }

  if (!pdf && !editProduct) {
    Swal.fire({
      icon: "warning",
      title: "Missing PDF Leaflet",
      text: "Please select a PDF leaflet before submitting.",
    });
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("description", description);
  formData.append("type", type);
  formData.append("category", category);

  images.forEach((img) => formData.append("images", img));
  if (pdf) formData.append("productLeaflet", pdf);

  try {
    const res = editProduct?._id
      ? await axios.put(
          `${import.meta.env.VITE_SERVER}/api/globalproducts/${editProduct._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
      : await axios.post(
          `${import.meta.env.VITE_SERVER}/api/globalproducts`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

    console.log("Response:", res.data);

    // 🎉 Success Alert
    await Swal.fire({
      icon: "success",
      title: "Success!",
      text: res.data.message || "Product saved successfully!",
      showConfirmButton: false,
      timer: 2000,
    });

    // 🧹 Reset form
    setProductName("");
    setDescription("");
    setType(types[0]);
    setCategory(categoryOptions[types[0]][0]);
    setImages([]);
    setImagePreviews([]);
    setPdf(null);
    setPdfName("");

    fetchProducts();
    if (onCancelEdit) onCancelEdit();

    // 🚀 Redirect
    navigate("/admin/globalclient");
  } catch (err) {
    console.error("Upload Error:", err.response?.data || err.message);

    // ❌ Error Alert
    // Swal.fire({
    //   icon: "error",
    //   title: "Upload Failed",
    //   text: err.response?.data?.message || "Something went wrong while saving the product.",
    // });
  } finally {
    setLoading(false);
    navigate("/admin/globalclient");
  }
};


  return (
    <div className="lg:max-w-3xl lg:mx-auto my-8">

    
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">{editProduct ? "Edit Global Client Product" : "Add Global Client Product"}</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />

      {/* <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded"
        required
      /> */}

      <div>
  <label className="block mb-1 font-medium">Description</label>
  <ReactQuill
    theme="snow"
    value={description}
    onChange={setDescription}
    modules={quillModules}
    formats={quillFormats}
    className="bg-white border rounded h-[200px] mb-10"
  />
</div>

      {/* Type Dropdown */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full rounded"
        required
      >
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Dynamic Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full rounded"
        required
      >
        {categoryOptions[type].map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div>
        <label className="block mb-1">Images (JPG/PNG)</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          accept="image/jpeg,image/png"
          className="border p-2 w-full rounded"
        />

        {imagePreviews.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={imagePreviews.map((_, i) => i)} strategy={verticalListSortingStrategy}>
              <div className="flex gap-2 mt-2 flex-wrap">
                {imagePreviews.map((src, i) => (
                  <SortableImage key={i} id={i} src={src} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div>
        <label className="block mb-1">PDF Leaflet</label>
        <input
          type="file"
          onChange={handlePdfChange}
          accept="application/pdf"
          className="border p-2 w-full rounded"
        />
        {pdfName && <p className="mt-1 text-sm text-gray-600">{pdfName}</p>}
      </div>

      <div className="flex gap-2">
  <button
    type="submit"
    disabled={loading}
    className={`p-2 rounded text-white flex items-center justify-center gap-2 ${
      loading
        ? "bg-[#344153] cursor-not-allowed"
        : "bg-[#1f2937] hover:bg-[#344153]"
    }`}
  >
    {loading ? (
      <>
        <svg
          className="animate-spin h-5 w-5 text-white"
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
        <span>{editProduct ? "Updating..." : "Adding..."}</span>
      </>
    ) : (
      <span>{editProduct ? "Update Product" : "Add Product"}</span>
    )}
  </button>

  {editProduct && (
    <button
      type="button"
      onClick={onCancelEdit}
      disabled={loading}
      className={`p-2 rounded text-white ${
        loading
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-gray-400 hover:bg-gray-500"
      }`}
    >
      Cancel
    </button>
  )}
</div>


    </form>
    </div>
  );
};

export default GlobalProductForm;
