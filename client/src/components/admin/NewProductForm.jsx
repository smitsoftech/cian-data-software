// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// // ---------- Sortable Image Component ----------
// const SortableImage = ({ id, image, onRemove }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };
//   return (
//     <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="relative border border-gray-200">
//       <img src={image.preview || image.url} alt="preview" className="w-24 cursor-grab h-24 object-cover rounded" />
//       <button
//         type="button"
//         // onClick={() => onRemove(id)}  
//         onClick={(e) => {
//           e.stopPropagation(); // ✅ prevent drag event from swallowing click

//           onRemove(id)
//         }}
//         className="absolute  top-0 right-0 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-bl"
//       >
//         ✕
//       </button>

//       {/* <p>{image.id}</p> */}
//     </div>
//   );
// };

// // ---------- Main Form ----------
// const NewProductForm = ({ editProduct, fetchProducts, onCancelEdit }) => {
//   const navigate = useNavigate();

//   // --- State Variables ---
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [keyFeature, setKeyFeature] = useState("");
//   const [composition, setComposition] = useState("");
//   const [shortComposition, setShortComposition] = useState("");
//   const [howToUse, setHowToUse] = useState("");
//   const [adverseEffect, setAdverseEffect] = useState("");
//   const [packingstyle, setPackingStyle] = useState("");
//   const [packingProfile, setPackingProfile] = useState("");
//   const [showPackingDropdown, setShowPackingDropdown] = useState(false);
//   const [mainCategory, setMainCategory] = useState("Medicine");
//   const [subCategory, setSubCategory] = useState("");
//   const [division, setDivision] = useState("");
//   const [manufacturerName, setManufacturerName] = useState("");
//   const [innovatorname, setInnovatorName] = useState("");
//   const [hsn, setHsn] = useState("");
//   const [images, setImages] = useState([]);
//   const [pdfPackInsert, setPdfPackInsert] = useState(null);
//   const [pdfPermission, setPdfPermission] = useState(null);
//   const [pdfDossier, setPdfDossier] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [removedImages, setRemovedImages] = useState([]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   const quillModules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ align: [] }],
//       ["link"],
//       ["clean"],
//     ],
//   };

//   const quillFormats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "list",
//     "bullet",
//     "align",
//     "link",
//   ];


//   // --- Category Options ---
//   const medicineSubs = [
//     "Capsule", "Cream", "Gel", "Injection", "Liquid", "Mouthwash", "Oil",
//     "Ointment", "Paste", "Powder", "Sachet", "Shampoo", "Soap", "Spray", "Tablet"
//   ];

//   const veterinarySubs = ["Small Animal", "Large Animal"];

//   // --- Pre-fill when Editing ---
//   useEffect(() => {
//     if (editProduct) {
//       setName(editProduct.name);
//       setDescription(editProduct.description);
//       setKeyFeature(editProduct.keyFeature);
//       setComposition(editProduct.composition);
//       setShortComposition(editProduct.shortComposition);
//       setHowToUse(editProduct.howToUse);
//       setAdverseEffect(editProduct.adverseEffect);
//       setPackingStyle(editProduct.packingstyle);
//       setPackingProfile(editProduct.packingProfile);
//       setMainCategory(editProduct.mainCategory);
//       setSubCategory(editProduct.subCategory);
//       setDivision(editProduct.division);
//       setManufacturerName(editProduct.manufacturerName);
//       setInnovatorName(editProduct.innovatorname);
//       setHsn(editProduct.hsn);
//       setImages(editProduct.images.map((url, index) => ({ id: `existing-${index}`, url })));
//     }
//   }, [editProduct]);

//   useEffect(() => {
//     if (editProduct) {
//       setImages(
//         editProduct.images.map((url, index) => ({
//           id: `existing-${index}`,
//           url,
//           file: null, // existing images have no file
//         }))
//       );
//     }
//   }, [editProduct]);


//   // --- Image Handlers ---
//   // const handleImageUpload = (e) => {
//   //   const files = Array.from(e.target.files);
//   //   const previews = files.map((file) => ({
//   //     id: `new-${Math.random()}`,
//   //     file,
//   //     preview: URL.createObjectURL(file),
//   //   }));
//   //   setImages((prev) => [...prev, ...previews]);
//   // };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       id: `new-${Math.random()}`,
//       file,
//       preview: URL.createObjectURL(file),
//       url: null, // new images have no url yet
//     }));
//     setImages((prev) => [...prev, ...newImages]);
//   };


//   //  const handleRemoveImage = (id) => {
//   //   const img = images.find((i) => i.id === id);
//   //   if (img?.url) setRemovedImages((prev) => [...prev, img.url]); // mark for deletion
//   //   setImages((prev) => prev.filter((i) => i.id !== id));
//   // };

//   // const handleRemoveImage = (id) => {
//   //   const img = images.find((i) => i.id === id);
//   //   Swal.fire({
//   //     title: "Are you sure?",
//   //     text: "Do you want to remove this image?",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonText: "Yes, remove it!",
//   //     cancelButtonText: "Cancel",
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       if (img?.url) setRemovedImages((prev) => [...prev, img.url]);
//   //       setImages((prev) => prev.filter((i) => i.id !== id));
//   //       Swal.fire("Deleted!", "The image has been removed.", "success");
//   //     }
//   //   });
//   // };

//   const handleRemoveImage = (id) => {
//     const img = images.find((i) => i.id === id);

//     Swal.fire({
//       title: "Remove image?",
//       text: "Are you sure you want to delete this image?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (img?.url) {
//           setRemovedImages((prev) => [...prev, img.url]); // backend ko bhejna
//         }
//         setImages((prev) => prev.filter((i) => i.id !== id));
//       }
//     });
//   };


//   useEffect(() => { }, [removedImages]);

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       setImages((items) => {
//         const oldIndex = items.findIndex((i) => i.id === active.id);
//         const newIndex = items.findIndex((i) => i.id === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   // --- Submit Form ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!images.length && !editProduct) {
//       Swal.fire("⚠️", "Please upload at least one image.", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("keyFeature", keyFeature);
//       formData.append("composition", composition);
//       formData.append("shortComposition", shortComposition);
//       formData.append("howToUse", howToUse);
//       formData.append("adverseEffect", adverseEffect);
//       formData.append("packingstyle", packingstyle);
//       formData.append("packingProfile", packingProfile);
//       formData.append("mainCategory", mainCategory);
//       // if (subCategory) formData.append("subCategory", subCategory);
//       formData.append("subCategory", subCategory || "");




//       formData.append("division", division);
//       formData.append("manufacturerName", manufacturerName);
//       formData.append("innovatorname", innovatorname);
//       formData.append("hsn", hsn);

//       // const newImages = images.filter((img) => img.file);
//       // newImages.forEach((img) => formData.append("images", img.file));

//       // --- Removed images (send as JSON) ---
//       formData.append("imagesToDelete", JSON.stringify(removedImages));

//       // --- New images ---
//       const newImages = images.filter((img) => img.file);
//       newImages.forEach((img) => formData.append("images", img.file));

//       // --- Image order (existing + new) ---
//       const existingImages = images.filter((img) => img.url).map((img) => img.url);
//       const imageOrder = images.map((img) =>
//         img.url
//           ? { type: "existing", index: existingImages.findIndex((i) => i === img.url) }
//           : { type: "new", index: newImages.findIndex((i) => i.id === img.id) }
//       );

//       formData.append("imageOrder", JSON.stringify(imageOrder));

//       if (pdfPackInsert) formData.append("packinsert", pdfPackInsert);
//       if (pdfPermission) formData.append("productpermitions", pdfPermission);
//       // if (pdfDossier) formData.append("dossier", pdfDossier);

//       const url = editProduct
//         ? `${import.meta.env.VITE_SERVER}/api/v1/products/${editProduct._id}`
//         : `${import.meta.env.VITE_SERVER}/api/v1/products`;

//       const method = editProduct ? axios.put : axios.post;

//       const res = await method(url, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       Swal.fire("✅ Success", res.data.message, "success");
//       setLoading(false);
//       // fetchProducts();
//       // Call fetchProducts only if it exists
//       if (typeof fetchProducts === "function") {
//         fetchProducts();
//       }
//       // navigate("/globalclient");
//     } catch (error) {
//       console.error(error);
//       Swal.fire(" Error", error.response?.data?.message || "Failed to save product", "error");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="lg:max-w-3xl lg:mx-auto my-8">
//       <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded space-y-4">
//         <h2 className="text-2xl font-bold">{editProduct ? "Update Product" : "Add  Product"}</h2>

//         {/* Product Name */}
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         {/* Description */}
//         <div className="">
//           <ReactQuill className="h-[200px] pb-10" theme="snow"
//            value={description} 
//            onChange={setDescription} 
//            placeholder="Product Description..." modules={quillModules}
//             formats={quillFormats} />
//         </div>

//         <div className="my-10">
//           <ReactQuill className="h-[200px] pb-10" theme="snow" 
//           value={keyFeature}
//           onChange={ setKeyFeature}
//           placeholder="Key Features" modules={quillModules}
//           formats={quillFormats} />
//         </div>

//         <div className="my-10">
//           <ReactQuill className="h-[200px] pb-10" theme="snow" 
//           placeholder="Composition"
//           value={composition}
//           onChange={setComposition}
//           modules={quillModules}
//           formats={quillFormats} />
//         </div>

//         <div className="">
//           <ReactQuill className="h-[200px] pb-10" theme="snow" 
//           placeholder="Short Composition"
//           value={shortComposition}
//           onChange={ setShortComposition}
//           modules={quillModules}
//             formats={quillFormats} />
//         </div>

//         <div className="">
//           <ReactQuill className="h-[200px] pb-10" theme="snow" 
//           placeholder="How to Use"
//           value={howToUse}
//           onChange={ setHowToUse}
//           modules={quillModules}
//             formats={quillFormats} />
//         </div>

//         <div className="">
//           <ReactQuill className="h-[200px] pb-10" theme="snow" 
//            placeholder="Adverse Effects"
//           value={adverseEffect}
//           onChange={ setAdverseEffect}
//           modules={quillModules}
//             formats={quillFormats} />
//         </div>


//         {/* Key Feature */}
//         {/* <input
//           type="text"
//           placeholder="Key Features"
//           value={keyFeature}
//           onChange={(e) => setKeyFeature(e.target.value)}
//           className="w-full border p-2 rounded"
//         /> */}

//         {/* Composition */}
//         {/* <input
//           type="text"
//           placeholder="Composition"
//           value={composition}
//           onChange={(e) => setComposition(e.target.value)}
//           className="w-full border p-2 rounded"
//         /> */}

//         {/* Short Composition */}
//         {/* <input
//           type="text"
//           placeholder="Short Composition"
//           value={shortComposition}
//           onChange={(e) => setShortComposition(e.target.value)}
//           className="w-full border p-2 rounded"
//         /> */}

//         {/* How to Use */}
//         {/* <input
//           type="text"
//           placeholder="How to Use"
//           value={howToUse}
//           onChange={(e) => setHowToUse(e.target.value)}
//           className="w-full border p-2 rounded"
//         /> */}

//         {/* Adverse Effect */}
//         {/* <input
//           type="text"
//           placeholder="Adverse Effects"
//           value={adverseEffect}
//           onChange={(e) => setAdverseEffect(e.target.value)}
//           className="w-full border p-2 rounded"
//         /> */}

//         {/* Packing Style */}
//         <input
//           type="text"
//           placeholder="Packing Style"
//           value={packingstyle}
//           onChange={(e) => setPackingStyle(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         {/* Packing Profile */}
//         <input
//           type="text"
//           placeholder="Packing Profile"
//           value={packingProfile}
//           onChange={(e) => setPackingProfile(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         {/* Packing Profile Dropdown with Checkboxes */}
// {/* <div className="relative">
//   <label className="block text-gray-700 font-medium mb-1">
//     Packing Profile
//   </label>

//   <div
//     onClick={() => setShowPackingDropdown(!showPackingDropdown)}
//     className="border p-2 rounded cursor-pointer bg-white"
//   >
//     {packingProfile?.length > 0
//       ? packingProfile.join(", ")
//       : "Select Packing Profiles"}
//   </div>

//   {showPackingDropdown && (
//     <div className="absolute z-10 w-full bg-white border rounded mt-1 max-h-48 overflow-y-auto shadow-lg">
//       {[
//         "BOTTLE",
//         "JAR",
//         "LAMITUBE",
//         "VIAL",
//         "DISPOPACK",
//         "TIN",
//         "CARTON",
//         "SACHET",
//         "INFUSION",
//         "ALU ALU",
//         "BLISTER",
//         "TREY PACK",
//         "ALUMINIUM STRIP",
//         "AMPUOLE",
//         "ALUMINIUMN TUBE",
//         "TOOTHPASTE",
//       ].map((option, index) => (
//         <label
//           key={index}
//           className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
//         >
//           <input
//             type="checkbox"
//             checked={packingProfile?.includes(option)}
//             onChange={() => {
//               if (packingProfile.includes(option)) {
//                 setPackingProfile(packingProfile.filter((item) => item !== option));
//               } else {
//                 setPackingProfile([...(packingProfile || []), option]);
//               }
//             }}
//             className="mr-2 accent-blue-600"
//           />
//           {option}
//         </label>
//       ))}
//     </div>
//   )}
// </div> */}


//         {/* Category Dropdowns */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="font-medium">Main Category</label>
//             <select
//               value={mainCategory}
//               onChange={(e) => {
//                 setMainCategory(e.target.value);
//                 setSubCategory("");
//               }}
//               className="w-full border p-2 rounded"
//             >
//               <option value="Medicine">Medicine</option>
//               <option value="Wellness">Wellness</option>
//               <option value="Beauty">Beauty</option>
//               <option value="Veterinary">Veterinary</option>
//             </select>
//           </div>

//           {/* Conditional Subcategory */}
//           {(mainCategory === "Medicine" || mainCategory === "Veterinary") && (
//             <div>
//               <label className="font-medium">Subcategory</label>
//               <select
//                 value={subCategory}
//                 onChange={(e) => setSubCategory(e.target.value)}
//                 className="w-full border p-2 rounded"
//               >
//                 <option value="">Select Subcategory</option>
//                 {(mainCategory === "Medicine" ? medicineSubs : veterinarySubs).map((sub) => (
//                   <option key={sub} value={sub}>
//                     {sub}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Division */}
//         <input
//           type="text"
//           placeholder="Division"
//           value={division}
//           onChange={(e) => setDivision(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         {/* Manufacturer */}
//         <input
//           type="text"
//           placeholder="Manufacturer Name"
//           value={manufacturerName}
//           onChange={(e) => setManufacturerName(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         {/* Innovator */}
//         <input
//           type="text"
//           placeholder="Innovator Name"
//           value={innovatorname}
//           onChange={(e) => setInnovatorName(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         {/* HSN */}
//         <input
//           type="text"
//           placeholder="HSN Code"
//           value={hsn}
//           onChange={(e) => setHsn(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         {/* Image Upload */}
//         {/* <div>

//          <label className="block mb-1"> Upload Images (JPG/PNG)</label>
//         <input
//           type="file"
//           multiple
//           onChange={handleImageUpload}
//           accept="image/jpeg,image/png"
//           className="border p-2 w-full rounded"
//         />
//         <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <SortableContext items={images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
//             <div className="flex flex-wrap gap-3 mt-3">
//               {images.map((img) => (
//                 <SortableImage key={img.id} id={img.id} image={img} onRemove={handleRemoveImage}  />
//               ))}
//             </div>
//           </SortableContext>
//         </DndContext>
//       </div> */}

//         {/* Image Upload */}
//         <div>
//           <label className="font-medium">Upload Images (JPG/PNG)</label>
//           <input
//             type="file"
//             multiple
//             onChange={handleImageUpload}
//             accept="image/jpeg,image/png"
//             className="border p-2 w-full rounded"
//           />

//           {/* ✅ Existing Images Section */}
//           {images.some((img) => img.url && !img.preview) && (
//             <div className="mt-4">
//               <h3 className="font-semibold mb-2">Existing Images</h3>
//               <div className="flex flex-wrap gap-3">
//                 {images
//                   .filter((img) => img.url && !img.preview)
//                   .map((img) => (
//                     <div key={img.id} className="relative">
//                       <img
//                         src={img.url}
//                         alt="existing"
//                         className="w-24 h-24 object-cover rounded"
//                       />
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleRemoveImage(img.id);
//                         }}
//                         className="absolute top-0 right-[-20px] bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-bl"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           )}

//           {/* 🆕 New Preview Images Section */}
//           {/* {images.some((img) => img.preview) && (
//     <div className="mt-4">
//       <h3 className="font-semibold mb-2">Preview Images</h3>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={images.filter((img) => img.preview).map((img) => img.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <div className="flex flex-wrap gap-3 mt-3">
//             {images
//               .filter((img) => img.preview)
//               .map((img) => (
//                 <SortableImage
//                   key={img.id}
//                   id={img.id}
//                   image={img}
//                   onRemove={handleRemoveImage}
//                 />
//               ))}
//           </div>
//         </SortableContext>
//       </DndContext>
//     </div>
//   )} */}

//           {/* 🧩 Unified Reorder Section (Existing + Preview) */}
//           {images.length > 0 && (
//             <div className="mt-4  rounded-md p-5 shadow-lg border border-gray-200  ">
//               <h3 className="font-semibold mb-2">Preview Images</h3>
//               <DndContext
//                 sensors={sensors}
//                 collisionDetection={closestCenter}
//                 onDragEnd={handleDragEnd}
//               >
//                 <SortableContext
//                   items={images.map((img) => img.id)}
//                   strategy={verticalListSortingStrategy}
//                 >
//                   <div className="flex flex-wrap gap-3 mt-3">
//                     {images.map((img) => (
//                       <SortableImage
//                         key={img.id}
//                         id={img.id}
//                         image={img}
//                         onRemove={handleRemoveImage}
//                       />
//                     ))}
//                   </div>
//                 </SortableContext>
//               </DndContext>
//             </div>
//           )}


//         </div>


//         {/* PDF Uploads */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           {/* <div>
//           <label className="font-medium">Pack Insert (PDF)</label>
//           <input type="file" accept="application/pdf" onChange={(e) => setPdfPackInsert(e.target.files[0])} />
//         </div>
//         <div>
//           <label className="font-medium">Product Permissions (PDF)</label>
//           <input type="file" accept="application/pdf" onChange={(e) => setPdfPermission(e.target.files[0])} />
//         </div> */}
//           {/* <div>
//           <label className="font-medium">Dossier (PDF)</label>
//           <input type="file" accept="application/pdf" onChange={(e) => setPdfDossier(e.target.files[0])} />
//         </div> */}
//         </div>

//         <div>
//           <label className="block mb-1">Pack Insert (PDF) </label>
//           <input
//             type="file"
//             onChange={(e) => setPdfPackInsert(e.target.files[0])}
//             accept="application/pdf"
//             className="border p-2 w-full rounded"
//           />
//           {/* {pdfName && <p className="mt-1 text-sm text-gray-600">{pdfName}</p>} */}
//         </div>

//         <div>
//           <label className="block mb-1">Product Permissions (PDF) </label>
//           <input
//             type="file"
//             onChange={(e) => setPdfPermission(e.target.files[0])}
//             accept="application/pdf"
//             className="border p-2 w-full rounded"
//           />
//           {/* {pdfName && <p className="mt-1 text-sm text-gray-600">{pdfName}</p>} */}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NewProductForm;



import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
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
import { LucideSwatchBook } from "lucide-react";
import Select from "react-select";

// ---------- Sortable Image Component ----------
const SortableImage = ({ id, image, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="relative border border-gray-200"
    >
      <img
        src={image.preview || image.url}
        alt="preview"
        className="w-24 cursor-grab h-24 object-cover rounded"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // prevent drag swallowing click
          onRemove(id);
        }}
        className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-bl"
      >
        ✕
      </button>
      <p>{image.id}</p>
    </div>
  );
};

// ---------- Helper ----------
const getFilenameFromUrl = (url) => {
  try {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1].split("?")[0];
  } catch {
    return url;
  }
};

// ---------- Main Form ----------
const NewProductForm = ({ editProduct, fetchProducts, onCancelEdit }) => {
  const navigate = useNavigate();

  // --- State Variables ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keyFeature, setKeyFeature] = useState("");
  const [composition, setComposition] = useState("");
  const [shortComposition, setShortComposition] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [adverseEffect, setAdverseEffect] = useState("");
  const [packingstyle, setPackingStyle] = useState("");
  const [packingProfile, setPackingProfile] = useState("");
  const [showPackingDropdown, setShowPackingDropdown] = useState(false);
  const [mainCategory, setMainCategory] = useState("Medicine");
  const [subCategory, setSubCategory] = useState("");
  const [division, setDivision] = useState("");
  const [manufacturerName, setManufacturerName] = useState("");
  const [innovatorname, setInnovatorName] = useState("");
  const [hsn, setHsn] = useState("");
  const [images, setImages] = useState([]); // items: {id, url?, file?, preview?}
  const [pdfPackInsert, setPdfPackInsert] = useState(null);
  const [pdfPermission, setPdfPermission] = useState(null);
  const [pdfDossier, setPdfDossier] = useState([]);
  const [pdfCopp, setPdfCopp] = useState(null);
  const [pdfFsc, setPdfFsc] = useState(null);

  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [allManufacturers, setAllManufacturers] = useState([]);



  const [loading, setLoading] = useState(false);
  const [removedImages, setRemovedImages] = useState([]); // store removed existing image URLs

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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


  const medicineSubs = [
    "Capsule",
    "Cream",
    "Gel",
    "Injection",
    "Liquid",
    "Mouthwash",
    "Oil",
    "Ointment",
    "Paste",
    "Powder",
    "Sachet",
    "Shampoo",
    "Soap",
    "Spray",
    "Tablet",
  ];

  // Add this above your component

  //   const manufacturers = [
  //   "9 M India Limited",
  //   "ACME Group of Companies",
  //   "Acies Pharmaceuticals Pvt. Ltd.",
  //   "Acme Group of Companies",
  //   "ADSILA ORGANICS Pvt. Ltd.",
  //   "ADMAC Group of Companies",
  //   "Afra Pharma Consultant",
  //   "Akhil Healthcare",
  //   "Alexon Healthcare Pvt. Ltd.",
  //   "ANG LIFESCIENCES INDIA LTD",
  //   "ANANTA MEDICARE",
  //   "Arab Company for Pharm. & Medicinal Plants S.A.E.",
  //   "Argon Remedies",
  //   "ATN BIOPHARMA / ATN ENTERPRISES / RAFALE PHARMA",
  //   "Axa Parenterals Ltd",
  //   "Beta Drug Ltd. / ADLEY Formulation Pvt. Ltd. / ADLEY LAB LTD",
  //   "BIOLS Pharmaceutical",
  //   "Brooks Laboratories Limited",
  //   "Bruck Pharma Pvt. Ltd.",
  //   "B Shah and Sons / Shah and Associates",
  //   "BUENO Salud Care",
  //   "CACHET PHARMACEUTICALS PVT. LTD. (subsidiary of ALKEM LABORATORIES LTD.)",
  //   "California Greens",
  //   "Catalysis",
  //   "Centurion Remedies Private Limited",
  //   "Chemence Medical, Inc.",
  //   "CIRON DRUGS & PHARMACEUTICALS PVT. LTD.",
  //   "COSMO PHARMA",
  //   "Crius Life Sciences Private Limited",
  //   "Cubit Lifesciences LLP",
  //   "Cubit Medisurge LLP",
  //   "CVPT (Canada Vitamin & Pharma Tech)",
  //   "Doshi Medicare Pvt. Ltd.",
  //   "East African",
  //   "EDKEM Pharmaceuticals Ltd.",
  //   "Elements Pharma Inc",
  //   "Europort Pharmaceuticals",
  //   "Evolet Healthcare Pvt. Ltd.",
  //   "Expert Pharmaceuticals Pvt. Ltd.",
  //   "Florencia Healthcare Pvt. Ltd.",
  //   "Fourrts (India) Laboratories Pvt. Limited",
  //   "GSS PHARMA PVT. LTD.",
  //   "Globela Pharma Pvt. Ltd.",
  //   "GMH Organics",
  //   "Gufic Biosciences Limited",
  //   "HAB Pharmaceuticals and Research Ltd.",
  //   "Halewood Laboratories Pvt. Ltd.",
  //   "HANUCHEM LABORATORIES",
  //   "Hanuchem Laboratories",
  //   "HANKOOK KORUS PHARM. CO. LTD.",
  //   "Health Biotech Limited",
  //   "Health For All Medicals",
  //   "Healthy Life Pharma Pvt. Ltd.",
  //   "Heet Health Care Pvt. Ltd.",
  //   "HEILSA LIFE SCIENCES PVT. LTD. (A Subsidiary of Axa Parenterals Ltd.)",
  //   "Hiral Labs Ltd.",
  //   "HMD Healthcare Ltd.",
  //   "Humble Healthcare Limited",
  //   "Innova CAPTAB",
  //   "InterMed Laboratories Pvt. Ltd.",
  //   "KARE SOLUTIONS",
  //   "Klaim",
  //   "KREMOINT PHARMA PVT. LTD.",
  //   "Kript Pharmaceuticals",
  //   "KRIPT PHARMACEUTICALS",
  //   "Laborate Pharmaceuticals India Ltd.",
  //   "Lifecareneuro.com",
  //   "Linux Life Sciences Pvt. Ltd. / Linux Laboratories",
  //   "MATINS HEALTHCARE PVT. LTD.",
  //   "M Care",
  //   "Mascot Health Series Pvt. Ltd.",
  //   "Medyra Pharmaceutical",
  //   "MEENAXY PHARMA PVT. LTD.",
  //   "Memphis Vision Care Pvt. Ltd.",
  //   "Merit Organics Ltd.",
  //   "Modern East For Trading & Agencies",
  //   "M.M. Pharma",
  //   "New Pharma Plus EK Limited",
  //   "NOVO Medi Sciences Pvt. Ltd.",
  //   "Nusearch Pharma Impex (A Division of NuSearch Pharma)",
  //   "October Pharma",
  //   "Orison Pharma International (Group of Companies)",
  //   "PH Shop",
  //   "Pinnacle Life Science (Subsidiary of Aarti Drugs Ltd)",
  //   "PLICA VACCINES PVT LTD (subsidiary site of PLICA INDIA PVT LTD.)",
  //   "Prime Health",
  //   "Prince Supplico Pharma Pvt. Ltd.",
  //   "Primus Pharmaceuticals",
  //   "PRO-VEN Probiotics",
  //   "PROMISED MEDICAL DEVICES INC.",
  //   "PROTECH BIOSYSTEMS PVT. LTD.",
  //   "PSA Chemicals & Pharmaceuticals Pvt. Ltd.",
  //   "Renown Pharmaceuticals Pvt. Ltd.",
  //   "Rivpra Formulation Pvt Ltd.",
  //   "Robinson Pharma",
  //   "Ronak Healthcare",
  //   "RRG BIOTECH PRIVATE LIMITED",
  //   "RTM Healthcare Private Limited",
  //   "Salud Care (India) Pvt. Ltd",
  //   "SaludCare (India) Pvt. Ltd",
  //   "Savorite Pharmaceutical Pvt. Ltd.",
  //   "Shivalik Rasayan Limited / MEDICAMEN Biotech Limited",
  //   "Skymap Pharmaceuticals Pvt. Ltd.",
  //   "SUBGE Pharmaceuticals",
  //   "Sunmount Laboratories Private Limited",
  //   "SURGE Pharmaceuticals",
  //   "Surmount Laboratories Private Limited",
  //   "Suyash Healthcare Pvt. Ltd.",
  //   "Swiss Garniers Biotech Private Limited",
  //   "Synokem Pharmaceuticals Ltd.",
  //   "Taurian Pharma Private Limited",
  //   "THEON PHARMACEUTICAL LTD",
  //   "U S Pharma Private Limited",
  //   "UNIVERSE PHARMA",
  //   "Vaishali Pharma Ltd.",
  //   "VASCO Pharmaceutical Co. Ltd.",
  //   "Virchow Healthcare Pvt. Ltd.",
  //   "Visionmed Ltd.",
  //   "ZEST PHARMA",
  //   "Zyphar's Pharmaceutics Pvt. Ltd.",
  //   "Zyrex Healthcare Pvt. Ltd."
  // ];



  const veterinarySubs = ["Small Animal", "Large Animal"];

  useEffect(() => {
    const fetchManufacturers = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/manufacturers/all`
      );
      // setManufacturers(response?.data?.data || []);
      setManufacturers(
  (response?.data?.data || []).map((m) => ({
    value: m._id,
    label: m.manufacturerName,
  }))
);

setAllManufacturers(
  (response?.data?.data )
)

      console.log("Fetched manufacturers:", response.data.data || []);
      console.log("Mapped manufacturers:", manufacturers);
      console.log("All manufacturers:", allManufacturers);
    };
    fetchManufacturers();
  }, [editProduct]);


  useEffect(() => {
  console.log("All manufacturers updated:", manufacturers);
}, [manufacturers, editProduct]);

  // --- Prefill when Editing (single effect) ---
  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name || "");
      setDescription(editProduct.description || "");
      setKeyFeature(editProduct.keyFeature || "");
      setComposition(editProduct.composition || "");
      setShortComposition(editProduct.shortComposition || "");
      setHowToUse(editProduct.howToUse || "");
      setAdverseEffect(editProduct.adverseEffect || "");
      setPackingStyle(editProduct.packingstyle || "");
      setPackingProfile(editProduct.packingProfile || "");
      setMainCategory(editProduct.mainCategory || "Medicine");
      setSubCategory(editProduct.subCategory || "");
      setDivision(editProduct.division || "");
      setManufacturerName(editProduct.manufacturerName || "");
      // setSelectedManufacturers(
      //   (editProduct.manufacturer || []).map((id) => {
      //     const found = manufacturers.find((m) => m.value === id);
      //     return found || { value: id, label: "Unknown Manufacturer" };
      //   })
      // );

  setSelectedManufacturers(
  (editProduct.manufacturer || []).map((id) => {
    // ✅ Use id (not _id)
    const found = manufacturers.find((m) => m.value === id);

    return {
      value: id,
      label: `${found ? found.label : "Unknown Manufacturer"}`,
    };
  })
);


      setInnovatorName(editProduct.innovatorname || "");
      setHsn(editProduct.hsn || "");
      // map existing image URLs to objects
      setImages(
        (editProduct.images || []).map((url, index) => ({
          id: `existing-${index}`,
          url,
          file: null,
          preview: null,
        }))
      );
    }
  }, [editProduct]);

  useEffect(() => {
  if (manufacturers.length > 0 && editProduct?.manufacturer?.length) {
    setSelectedManufacturers(
      editProduct.manufacturer.map((id) => {
        const found = manufacturers.find((m) => m.value === id);
        return {
          value: id,
          label: `${found ? found.label : "Unknown Manufacturer"}`,
        };
      })
    );
  }
}, [manufacturers, editProduct]);


  // --- Image Handlers ---
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: `new-${Math.random().toString(36).slice(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      url: null, // new images have no url yet
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  // const handleRemoveImage = (id) => {
  //   const img = images.find((i) => i.id === id);

  //   Swal.fire({
  //     title: "Remove image?",
  //     text: "Are you sure you want to delete this image?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       if (img?.url) {
  //         // mark existing image for backend deletion (send URL and filename) / backend ko bhejna
  //         setRemovedImages((prev) => [...prev, img.url]);
  //       }
  //       setImages((prev) => prev.filter((i) => i.id !== id));
  //     }
  //   });
  // };

  const handleRemoveImage = async (id) => {
    const img = images.find((i) => i.id === id);

    const result = await Swal.fire({
      title: "Remove image?",
      text: "Are you sure you want to delete this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
    });

    if (result.isConfirmed) {
      // instantly update UI first (optimistic update)
      setImages((prev) => prev.filter((i) => i.id !== id));

      if (img?.url) {
        // queue for backend deletion
        setRemovedImages((prev) => [...prev, img.url]);
      }

      // optional — small success popup (non-blocking)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Image removed",
        showConfirmButton: false,
        timer: 1000,
        background: "#fff",
        toast: true,
      });
    }
  };


  const handleDragEnd = (event) => {
    const { active, over } = event;
    // guard: if no destination (dropped outside), do nothing
    if (!over || active.id === over.id) return;

    setImages((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return items;
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  // --- Submit Form ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images.length && !editProduct) {
      Swal.fire("⚠️", "Please upload at least one image.", "warning");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("keyFeature", keyFeature);
      formData.append("composition", composition);
      formData.append("shortComposition", shortComposition);
      formData.append("howToUse", howToUse);
      formData.append("adverseEffect", adverseEffect);
      formData.append("packingstyle", packingstyle);
      formData.append("packingProfile", packingProfile);
      formData.append("mainCategory", mainCategory);
      formData.append("subCategory", subCategory || "");
      formData.append("division", division);
      formData.append("manufacturerName", manufacturerName);
    const manufacturerIds = selectedManufacturers.map((m) => m.value);

formData.append("manufacturer", JSON.stringify(manufacturerIds));
      formData.append("innovatorname", innovatorname);
      formData.append("hsn", hsn);

      // --- Removed images (send as URLs + filenames) ---
      const imagesToDeleteUrls = removedImages;
      const imagesToDeleteNames = removedImages.map(getFilenameFromUrl);
      // formData.append("imagesToDeleteUrls", JSON.stringify(imagesToDeleteUrls));
      // formData.append("imagesToDeleteNames", JSON.stringify(imagesToDeleteNames));
      formData.append("removedImages", JSON.stringify(removedImages));

      // --- New images (files) ---
      const newImages = images.filter((img) => img.file);
      newImages.forEach((img) => {
        // append files; backend should match these with "tempId" in imageOrder
        formData.append("images", img.file);
      });

      // --- Build clear imageOrder payload ---
      // For each item in images array (which is already in final order), create an entry:
      // existing => {type:'existing', url: 'https://...'}
      // new => {type:'new', tempId: 'new-xxx', filename: 'originalname.png'}


      // const imageOrder = images.map((img) =>
      //   img.url
      //     ? { type: "existing", url: img.url, filename: getFilenameFromUrl(img.url) }
      //     : { type: "new", tempId: img.id, filename: img.file?.name || null }
      // );

      const imageOrder = images.map(img =>
        img.url
          ? { type: "existing", url: img.url, filename: getFilenameFromUrl(img.url) }
          : { type: "new", tempId: img.id, filename: img.file.name }
      );

      // send imageOrder as JSON
      formData.append("imageOrder", JSON.stringify(imageOrder));

      console.log("final imageOrder:", imageOrder)

      if (pdfPackInsert) formData.append("packinsert", pdfPackInsert);
      if (pdfPermission) formData.append("productpermitions", pdfPermission);
      // Append each dossier file individually
      if (pdfDossier && pdfDossier.length > 0) {
        pdfDossier.forEach(file => formData.append("dossier", file));
      }

      if (pdfCopp) formData.append("copp", pdfCopp);
      if (pdfFsc) formData.append("fsc", pdfFsc);
      // if 

      const url = editProduct
        ? `${import.meta.env.VITE_SERVER}/api/v1/products/${editProduct._id}`
        : `${import.meta.env.VITE_SERVER}/api/v1/products`;

      const method = editProduct ? axios.put : axios.post;

      // NOTE: when using PUT with multipart/form-data, some servers expect POST + _method=PUT;
      // If your server rejects the PUT with formdata, try POST + formData.append('_method','PUT') on the server.
      const res = await method(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("✅ Success", res.data.message, "success");
      setLoading(false);
      if (typeof fetchProducts === "function") {
        fetchProducts();
      }
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.response?.data?.message || "Failed to save product", "error");
      setLoading(false);
    }
  };

  return (
    <div className="lg:max-w-3xl lg:mx-auto my-8">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded space-y-4">
        <h2 className="text-2xl font-bold">{editProduct ? "Update Product" : "Add  Product"}</h2>

        {/* Product Name */}
        <div>
          <label className="font-medium">Product Name</label>
          <input
            type="text"
            placeholder="Enter Product Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        {/* <div className="">
          <label className="font-medium">Product Description</label>
          <ReactQuill
            className="h-[200px] pb-10"
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Enter Product Description..."
            modules={quillModules}
            formats={quillFormats}
          />
        </div> */}
        <div>
          <label className="font-medium">Product Description</label>
          <input
            type="text"
            placeholder="Enter Product Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded h-[100px]"
          />
        </div>

        {/* Key Feature */}
        {/* <div className="my-10">
          <label className="font-medium">Key Features</label>
          <ReactQuill
            className="h-[200px] pb-10"
            theme="snow"
            value={keyFeature}
            onChange={setKeyFeature}
            placeholder="Enter Key Features..."
            modules={quillModules}
            formats={quillFormats}
          />
        </div> */}
        <div>
          <label className="font-medium">Key Features</label>
          <input
            type="text"
            placeholder="Enter Key Features..."
            value={keyFeature}
            onChange={(e) => setKeyFeature(e.target.value)}
            className="w-full border p-2 rounded h-[100px]"
          />
        </div>

        {/* Composition */}
        {/* <div className="my-10">
          <label className="font-medium">Composition</label>
          <ReactQuill
            className="h-[200px] pb-10"
            theme="snow"
            placeholder="Enter Composition..."
            value={composition}
            onChange={setComposition}
            modules={quillModules}
            formats={quillFormats}
          />
        </div> */}
        <div>
          <label className="font-medium">Composition </label>
          <input
            type="text"
            placeholder="Enter Composition..."
            value={composition}
            onChange={(e) => setComposition(e.target.value)}
            className="w-full border p-2 rounded h-[100px]"
          />
        </div>

        {/* Short Composition */}
        {/* <div className="">
          <label className="font-medium">Short Composition</label>
          <ReactQuill
            className="h-[200px] pb-10"
            theme="snow"
            placeholder="Enter Short Composition..."
            value={shortComposition}
            onChange={setShortComposition}
            modules={quillModules}
            formats={quillFormats}
          />
        </div> */}
        <div>
          <label className="font-medium">Short Composition </label>
          <input
            type="text"
            placeholder="Enter Product Short Composition..."
            value={shortComposition}
            onChange={(e) => setShortComposition(e.target.value)}
            className="w-full border p-2 rounded h-[100px]"
          />
        </div>

        {/* How to Use */}
        {/* <div className="">
          <label className="font-medium">How to Use</label>
          <ReactQuill
            className="h-[200px] pb-10"
            theme="snow"
            placeholder=" Enter How to Use..."
            value={howToUse}
            onChange={setHowToUse}
            modules={quillModules}
            formats={quillFormats}
          />
        </div> */}

        <div>
          <label className="font-medium">How to Use </label>
          <input
            type="text"
            placeholder="Enter How to Use..."
            value={howToUse}
            onChange={(e) => setHowToUse(e.target.value)}
            className="w-full border p-2 rounded h-[100px]"
          />
        </div>

        {/* Adverse Effects */}
        {/* <div className="">
          <label className="font-medium">Adverse Effects</label>
          <ReactQuill
            className="h-[200px] pb-10"
            theme="snow"
            placeholder="Enter Adverse Effects"
            value={adverseEffect}
            onChange={setAdverseEffect}
            modules={quillModules}
            formats={quillFormats}
          />
        </div> */}
        <div>
          <label className="font-medium">Adverse Effects </label>
          <input
            type="text"
            placeholder="Enter Adverse Effects..."
            value={adverseEffect}
            onChange={(e) => setAdverseEffect(e.target.value)}
            className="w-full border p-2 rounded h-[100px]"
          />
        </div>

        {/* Packing Style */}
        <div>
          <label className="font-medium">Packing Style </label>
          <input
            type="text"
            placeholder="Enter Packing Style..."
            value={packingstyle}
            onChange={(e) => setPackingStyle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Packing Profile */}
        <div>
          <label className="font-medium">Packing Profile</label>
          <input
            type="text"
            placeholder="Enter Packing Profile..."
            value={packingProfile}
            onChange={(e) => setPackingProfile(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        {/* Packing Profile Dropdown with Checkboxes  */}
        {/* <div className="relative">
          <label className="block text-gray-700 font-medium mb-1">
            Packing Profile
          </label>

          <div
            onClick={() => setShowPackingDropdown(!showPackingDropdown)}
            className="border p-2 rounded cursor-pointer bg-white"
          >
            {packingProfile?.length > 0
              ? packingProfile.join(", ")
              : "Select Packing Profiles"}
          </div>

          {showPackingDropdown && (
            <div className="absolute z-10 w-full bg-white border rounded mt-1 max-h-48 overflow-y-auto shadow-lg">
              {[
                "Bottle",
                "Jar",
                "Lamitube",
                "Vial",
                "Dispopack",
                "Tin",
                "Carton",
                "Sachet",
                "Infusion",
                "Alu alu",
                "Blister",
                "Trey pack",
                "Aluminium strip",
                "Ampuole",
                "Aluminiumn tube",
                "Toothpaste",
              ].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={packingProfile?.includes(option)}
                    onChange={() => {
                      if (packingProfile.includes(option)) {
                        setPackingProfile(packingProfile.filter((item) => item !== option));
                      } else {
                        setPackingProfile([...(packingProfile || []), option]);
                      }
                    }}
                    className="mr-2 accent-blue-600"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div> */}




        {/* Category Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Main Category</label>
            <select
              value={mainCategory}
              onChange={(e) => {
                setMainCategory(e.target.value);
                setSubCategory("");
              }}
              className="w-full border p-2 rounded"
            >
              <option value="Medicine">Medicine</option>
              <option value="Wellness">Wellness</option>
              <option value="Beauty">Beauty</option>
              <option value="Veterinary">Veterinary</option>
            </select>
          </div>

          {/* Conditional Subcategory */}
          {(mainCategory === "Medicine" || mainCategory === "Veterinary") && (
            <div>
              <label className="font-medium">Subcategory</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Subcategory</option>
                {(mainCategory === "Medicine" ? medicineSubs : veterinarySubs).map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Division */}
        <div>
          <label className="font-medium">Division</label>
          <input
            type="text"
            placeholder="Enter Division..."
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Manufacturer */}
        {/* <div>
          <label className="font-medium">Manufacturer Name</label>
          <select
            value={manufacturerName}
            onChange={(e) => setManufacturerName(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div> */}

        {/* <div>
          <label className="font-medium">Manufacturer Name</label>
          <select
            multiple
            value={selectedManufacturers}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) => option.value);
              setSelectedManufacturers(values);
            }}
          >
            {manufacturers.map((m) => (
              <option key={m._id} value={m._id}>
                {m.manufacturerName}
              </option>
            ))}
          </select>

        </div> */}

         {/* Manufacturer Multi-Select */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Manufacturer(s)
          </label>
          <Select
            isMulti
            isLoading={loading}
            options={manufacturers}
            value={selectedManufacturers}
            onChange={(selected) => setSelectedManufacturers(selected)}
            placeholder="Search or select manufacturers..."
            className="w-full"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "#4f46e5",
                boxShadow: "none",
                "&:hover": { borderColor: "#4338ca" },
                borderRadius: "0.75rem",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#e0e7ff",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "#3730a3",
              }),
            }}
          />
        </div>


        {/* Innovator */}
        <div>
          <label className="font-medium"> Innovator Name</label>
          <input
            type="text"
            placeholder="Enter Innovator Name..."
            value={innovatorname}
            onChange={(e) => setInnovatorName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* HSN */}
        <div>
          <label className="font-medium">HSN Code </label>
          <input
            type="text"
            placeholder="Enter HSN Code..."
            value={hsn}
            onChange={(e) => setHsn(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-medium">Upload Images (JPG/PNG)</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            accept="image/jpeg,image/png"
            className="border p-2 w-full rounded"
          />

          {/* Unified Reorder Section (Existing + Preview) */}
          {images.length > 0 && (
            <div className="mt-4 rounded-md p-5 shadow-lg border border-gray-200">
              <h3 className="font-semibold mb-2">Preview Images</h3>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {images.map((img) => (
                      <SortableImage key={img.id} id={img.id} image={img} onRemove={() => handleRemoveImage(img.id)} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>

        {/* PDF Uploads */}
        <div className="flex flex-col sm:flex-row gap-4"></div>

        <div>
          <label className="block mb-1">Pack Insert (PDF) </label>
          <input
            type="file"
            onChange={(e) => setPdfPackInsert(e.target.files[0])}
            accept="application/pdf"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Product Permissions (PDF) </label>
          <input
            type="file"
            onChange={(e) => setPdfPermission(e.target.files[0])}
            accept="application/pdf"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Product COPP (PDF) </label>
          <input
            type="file"
            onChange={(e) => setPdfCopp(e.target.files[0])}
            accept="application/pdf"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Product FSC (PDF) </label>
          <input
            type="file"
            onChange={(e) => setPdfFsc(e.target.files[0])}
            accept="application/pdf"
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="space-y-4">
          <label className="block mb-1 font-medium">Product Dossier (PDF) - Multiple files allowed</label>
          <div className="relative">
            <input
              type="file"
              multiple
              onChange={(e) => setPdfDossier(Array.from(e.target.files))}
              accept="application/pdf"
              className="border-2 border-dashed border-gray-300 p-6 w-full rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
            />
            {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Drop PDF files here or click to browse</p>
              </div>
            </div> */}
          </div>

          {pdfDossier.length > 0 && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Selected Dossier Files ({pdfDossier.length})</h4>
              <div className="space-y-2">
                {pdfDossier.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPdfDossier(current => current.filter((_, i) => i !== index));
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="bg-[#1f2937] text-white px-6 py-2 rounded hover:bg-[#353e4b]">
          {loading ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default NewProductForm;
