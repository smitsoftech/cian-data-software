// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const types = ["Cian Health Care Limited", "Dr Smith Biotech Pvt Ltd"];

// const categoryOptions = {
//   "Cian Health Care Limited": [
//     "Pharmaceuticals",
//     "Health Supplement and Nutraceutical",
//     "Veterinary",
//     "Cosmetics",
//   ],
//   "Dr Smith Biotech Pvt Ltd": [
//     "Pharmaceuticals",
//     "Health Supplement and Nutraceutical",
//   ],
// };

// const PRODUCTS_PER_PAGE = 24;

// const GlobalProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedType, setSelectedType] = useState(types[0]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts();
//   }, [selectedType]);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_SERVER}/api/globalproducts/allget?type=${encodeURIComponent(selectedType)}`
//       );
//       setProducts(res.data.products || []);
//       setCurrentPage(1);
//       setSelectedCategory(null);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   const availableCategories = categoryOptions[selectedType];
//   const filteredProducts = selectedCategory
//     ? products.filter((p) => p.category === selectedCategory)
//     : products;

//   const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * PRODUCTS_PER_PAGE,
//     currentPage * PRODUCTS_PER_PAGE
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto py-10 px-4">
//         <h1 className="text-3xl font-bold text-center mb-8">Global Clients</h1>

//         {/* Type Buttons */}
//         <div className="flex justify-center gap-4 mb-6 flex-wrap">
//           {types.map((t) => (
//             <button
//               key={t}
//               onClick={() => setSelectedType(t)}
//               className={`px-4 py-2 rounded ${selectedType === t
//                   ? "bg-[#1f2937] text-white"
//                   : "bg-white border text-gray-700"
//                 }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>



//         {/* Dynamic Category Filters */}
//         <div className="flex justify-center gap-4 mb-6 flex-wrap">
//           {availableCategories.map((c) => (
//             <button
//               key={c}
//               onClick={() =>
//                 setSelectedCategory(selectedCategory === c ? null : c)
//               }
//               className={`px-4 py-2 rounded border ${selectedCategory === c
//                   ? "bg-[#1f2937] text-white"
//                   : "bg-white text-gray-700"
//                 }`}
//             >
//               {c}
//             </button>
//           ))}
//         </div>

//         <div className="flex justify-center">
//           <button
//             onClick={() => (window.location.href = "/readydossierlist")}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Go to Ready Dossier List
//           </button>

//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-5">
//           {paginatedProducts.map((product) => (
//             <div
//               key={product._id}
//               onClick={() => navigate(`/globalproduct/${product._id}`)}
//               className="bg-white shadow rounded p-2 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
//             >
//               <img
//                 src={product.images[0]}
//                 alt={product.productName}
//                 className="w-full  object-contain mb-2"
//               />
//               <p className="text-center text-sm font-bold">
//                 {product.productName}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-8 gap-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded border ${currentPage === i + 1
//                     ? "bg-red-600 text-white"
//                     : "bg-white text-gray-700"
//                   }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GlobalProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const types = ["Cian Health Care Limited", "Dr Smith Biotech Pvt Ltd"];

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

const PRODUCTS_PER_PAGE = 24;

const GlobalProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch ALL products (without type filter) on first load
    fetchAllProducts();
  }, []);

  // 🔹 Fetch all products (default)
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/globalproducts/allget`
      );

      // Sort alphabetically A–Z
      const sortedProducts = (res.data.products || []).sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );

      setProducts(sortedProducts);
      setCurrentPage(1);
      setSelectedType(null);
      setSelectedCategory(null);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // 🔹 Fetch by selected Type (when user clicks)
  const fetchProductsByType = async (type) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/globalproducts/allget?type=${encodeURIComponent(type)}`
      );

      const sortedProducts = (res.data.products || []).sort((a, b) =>
        a.productName.localeCompare(b.productName)
      );

      setProducts(sortedProducts);
      setSelectedType(type);
      setSelectedCategory(null);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // 🔹 Apply category filter when clicked
  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  const availableCategories = selectedType
    ? categoryOptions[selectedType]
    : [];

  // Apply category filter (only if user clicked category)
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts
    .sort((a, b) => a.productName.localeCompare(b.productName))
    .slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Global Clients</h1>

        {/* Type Buttons */}
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => fetchProductsByType(t)}
              className={`px-4 py-2 rounded ${selectedType === t
                ? "bg-[#1f2937] text-white"
                : "bg-white border text-gray-700"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Dynamic Category Filters */}
        {selectedType && (
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {availableCategories.map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryClick(c)}
                className={`px-4 py-2 rounded border ${selectedCategory === c
                  ? "bg-[#1f2937] text-white"
                  : "bg-white text-gray-700"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => (window.location.href = "/readydossierlist")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Go to Ready Dossier List
          </button>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 text-lg font-semibold">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-5">
            {paginatedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/globalproduct/${product._id}`)}
                className="bg-white shadow rounded p-2 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
              >
                <div>
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full object-contain mb-2 max-h-[200px]"
                  />
                </div>
                <p className="text-center text-sm font-bold">
                  {product.productName}
                </p>
              </div>
            ))}
          </div>
        )}


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded border ${currentPage === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalProduct;
