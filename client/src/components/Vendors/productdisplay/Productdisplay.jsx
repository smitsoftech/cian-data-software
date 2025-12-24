import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER}/api/v1/products`)
      .then((res) => {
        const visible = res.data.products.filter(
          (product) =>
            product.productVisibility === "Display Product" ||
            product.productVisibility === "Both"
        );
        const sorted = visible.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sorted);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleProductClick = (name, id) => {
    navigate(`/productdetails/${name}`, {
      state: { productId: id },
    });
  };

  const handleFilterClick = (type, value = null) => {
    setFilterType(type);
    setFilterValue(value);
  };

  const handleReset = () => {
    setFilterType(null);
    setFilterValue(null);
    setSearchTerm("");
  };

  const getUniqueValues = (key) => {
    const values = products.map((product) => product[key]);
    return [...new Set(values.filter(Boolean))].sort((a, b) =>
      a.localeCompare(b)
    );
  };

  const groupedBy = (key) => {
    const groups = {};
    products.forEach((product) => {
      const value = product[key] || "Unknown";
      if (!groups[value]) groups[value] = [];
      groups[value].push(product);
    });
    return groups;
  };

  const filteredProducts = products.filter((product) => {
    const matchesFilter =
      !filterType || !filterValue || product[filterType] === filterValue;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white text-black min-h-screen p-6">
      {/* Page Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600">All Products (A–Z)</h1>
        {(filterType || filterValue || searchTerm) && (
          <div className="mt-2 text-lg">
            Showing{" "}
            <b>
              {filterType}
              {filterValue && `: ${filterValue}`}
              {searchTerm && ` | Search: ${searchTerm}`}
            </b>{" "}
            <button
              onClick={handleReset}
              className="ml-4 text-red-600 underline"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Filter Headings */}
      <div className="flex flex-wrap gap-12 justify-center mb-8">
        {[
          { label: "Composition", key: "shortComposition" },
          { label: "Category", key: "category" },
          { label: "Division", key: "division" },
        ].map((filter) => (
          <div key={filter.key} className="relative group">
            <h2
              className="font-bold text-lg mb-2 cursor-pointer"
              onClick={() => handleFilterClick(filter.key)}
            >
              {filter.label}
            </h2>
            <div className="absolute top-full left-0 bg-white shadow-lg border rounded w-52 overflow-y-auto max-h-96 hidden group-hover:flex flex-col z-50">
              {getUniqueValues(filter.key).map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFilterClick(filter.key, val)}
                  className="text-left px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <input
          type="search"
          className="block w-full max-w-lg p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-l-lg focus:ring-gray-700 focus:border-gray-700"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 text-sm font-medium text-white bg-gray-700 rounded-r-lg border border-gray-800 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-900"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>

      {/* Product Display */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {filterType && !filterValue
            ? `Grouped by ${filterType}`
            : filterType && filterValue
            ? `${filterType.charAt(0).toUpperCase() + filterType.slice(1)}: ${filterValue}`
            : "All Products"}
        </h2>

        {filterType && !filterValue ? (
          Object.entries(groupedBy(filterType))
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([group, items]) => (
              <div key={group} className="mb-10">
                <h3 className="text-xl font-semibold mb-2 text-blue-700 md:hidden">
                  {group}
                </h3>
                <h3
                  className="hidden md:inline-block text-xl font-semibold text-blue-700 
                  max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
                  title={group}
                >
                  {group}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-6">
                  {items.map((product) => (
  <div
    key={product._id}
    onClick={() => handleProductClick(product.name, product._id)}
    className="cursor-pointer text-center border rounded-md p-4 shadow hover:shadow-md transition bg-white"
  >
    <img
      src={product?.images?.[0]}
      alt={product?.name}
      className="h-40 w-auto mx-auto object-contain mb-3"
    />
    <h3
      className="text-sm md:text-base font-medium truncate mb-1"
      title={product?.name}
    >
      {product?.name}
    </h3>
    <div className="mt-1 text-gray-500 text-sm">{product?.category}</div>
  </div>
))}

                </div>
              </div>
            ))
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredProducts.map((product) => (
              // <button
              //   key={product._id}
              //   onClick={() => handleProductClick(product._id)}
              //   className="bg-gray-100 hover:bg-gray-200 px-4 py-3 text-left rounded shadow-sm"
              // >
              //   <div className="font-semibold">{product.name}</div>
              //   <div className="text-sm opacity-70">{product.category}</div>
              // </button>

              <div
                key={product._id}
                onClick={() => handleProductClick(product.name,product._id)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-3 text-left rounded shadow-sm"

                
              >
                <img
                  src={product?.images?.[0]}
                  alt={product?.name}
                  className="h-40 w-auto mx-auto object-contain mb-3"
                />
                <h3
                  className="text-sm md:text-base font-medium truncate mb-1"
                  title={product?.name}
                >
                  {product?.name}
                </h3>

                <div className="mt-1 text-gray-500 text-sm">{product?.category}</div>
              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProductDisplay = () => {
//   const [products, setProducts] = useState([]);
//   const [filterType, setFilterType] = useState(null);
//   const [filterValue, setFilterValue] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_SERVER}/api/v1/products`)
//       .then((res) => {
//         const sorted = res.data.products.sort((a, b) =>
//           a.name.localeCompare(b.name)
//         );
//         setProducts(sorted);
//       })
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   const handleProductClick = (id) => {
//     navigate(`/vendor/productdetails/${id}`);
//   };

//   const handleFilterClick = (type, value = null) => {
//     setFilterType(type);
//     setFilterValue(value);
//   };

//   const handleReset = () => {
//     setFilterType(null);
//     setFilterValue(null);
//   };

//   const getUniqueValues = (key) => {
//     const values = products.map((product) => product[key]);
//     return [...new Set(values.filter(Boolean))].sort((a, b) =>
//       a.localeCompare(b)
//     );
//   };

//   const groupedBy = (key) => {
//     const groups = {};
//     products.forEach((product) => {
//       const value = product[key] || "Unknown";
//       if (!groups[value]) groups[value] = [];
//       groups[value].push(product);
//     });
//     return groups;
//   };

//   const filteredProducts =
//     filterType && filterValue
//       ? products.filter((product) => product[filterType] === filterValue)
//       : products;

//   return (
//     <div className="bg-white text-black min-h-screen p-6">
//       {/* Page Heading */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-red-600">All Products (A–Z)</h1>
//         {(filterType || filterValue) && (
//           <div className="mt-2 text-lg">
//             Showing{" "}
//             <b>
//               {filterType}
//               {filterValue && `: ${filterValue}`}
//             </b>{" "}
//             <button
//               onClick={handleReset}
//               className="ml-4 text-red-600 underline"
//             >
//               Reset
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Filter Headings */}
//       <div className="flex flex-wrap gap-12 justify-center mb-12">
//         {[
//           { label: "Composition", key: "shortComposition" },
//           { label: "Category", key: "category" },
//           { label: "Division", key: "division" },
//         ].map((filter) => (
//           <div key={filter.key} className="relative group">
//             <h2
//               className="font-bold text-lg mb-2 cursor-pointer"
//               onClick={() => handleFilterClick(filter.key)}
//             >
//               {filter.label}
//             </h2>
//             <div className="absolute top-full left-0 bg-white shadow-lg border rounded w-52 overflow-y-auto max-h-96 hidden flex-col z-50">
//               {getUniqueValues(filter.key).map((val, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => handleFilterClick(filter.key, val)}
//                   className="text-left px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//                 >
//                   {val}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Product Display */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           {filterType && !filterValue
//             ? `Grouped by ${filterType}`
//             : filterType && filterValue
//               ? `${filterType.charAt(0).toUpperCase() + filterType.slice(1)}: ${filterValue
//               }`
//               : "All Products"}
//         </h2>

//         {filterType && !filterValue ? (
//           Object.entries(groupedBy(filterType))
//             .sort(([a], [b]) => a.localeCompare(b)) // ✅ Group titles sorted alphabetically
//             .map(([group, items]) => (
//               <div key={group} className="mb-10">
//                 <h3 className="text-xl font-semibold mb-2 text-blue-700 md:hidden">
//                   {group}
//                 </h3>
//                 <h3
//                   className="hidden md:inline-block text-xl font-semibold text-blue-700 
//                max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer" 
//                   title={group}
//                 >
//                   {group}
//                 </h3>

//                 {/* Tooltip shown only on hover (md and up) */}
//                 <div className="absolute z-50 left-0 top-full mt-1 hidden md:group-hover:block 
//                   max-w-xl w-max bg-gray-100 text-sm text-gray-800 p-2 rounded shadow-lg border">
//                   {group}
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {items.map((product) => (
//                     <button
//                       key={product._id}
//                       onClick={() => handleProductClick(product._id)}
//                       className="bg-gray-100 hover:bg-gray-200 px-4 py-3 text-left rounded shadow-sm"
//                     >
//                       <div className="font-semibold">{product.name}</div>
//                       <div className="text-sm opacity-70">
//                         {product.category}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))
//         ) : filteredProducts.length === 0 ? (
//           <p className="text-center text-gray-500">No products found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <button
//                 key={product._id}
//                 onClick={() => handleProductClick(product._id)}
//                 className="bg-gray-100 hover:bg-gray-200 px-4 py-3 text-left rounded shadow-sm"
//               >
//                 <div className="font-semibold">{product.name}</div>
//                 <div className="text-sm opacity-70">{product.category}</div>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDisplay;



