// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Backend API
// const API = `${import.meta.env.VITE_SERVER}/api/v1/products`;

// // Dummy addToCart function — Replace this with your actual function from context or props
// const addToCart = (product) => {
//   console.log("Added to cart:", product.name);
// };

// const Medicines = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//   fetch(API)
//     .then((res) => res.json())
//     .then((data) => {
//       const filtered = data.products
//         .filter((item) => item.mainCategory === "Medicine")
//         .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
//       setProducts(filtered);
//     })
//     .catch((err) => console.error("Failed to fetch products:", err))
//     .finally(() => setLoading(false));
// }, []);


//   const handleProductClick = (name, id) => {
//     navigate(`/productdetails/${name}`, {
//       state: { productId: id },
//     });
//   };

//   if (loading) {
//     return <p className="text-center mt-10 text-lg">Loading...</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6 text-center">Medicines</h1>

//       <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-6">
//         {products.length > 0 ? (
//           products.map((product) => {
//             const {
//               _id,
//               name,
//               images,
//               mrpPerBottle,
//               packingstyle,
//               productVisibility,
//               price,
//               mrpPerBox
              	
//             } = product;

//             return (
//               <div
//                 key={_id}
//                 onClick={() => handleProductClick(name, _id)}
//                 className="cursor-pointer text-center border rounded-md p-4 shadow hover:shadow-md transition bg-white"
//               >
//                 <img
//                   src={images?.[0]}
//                   alt={name}
//                   className="h-40 w-auto mx-auto object-contain mb-3"
//                 />

//                 <h3
//                   className="text-sm md:text-base font-medium truncate mb-1"
//                   title={name}
//                 >
//                   {name}
//                 </h3>

//                 {/* <div className="mt-1 text-gray-500 text-sm">{packingstyle}</div> */}

//                 {/* <div className="mt-1 font-semibold text-lg text-black">
//                   ₹{mrpPerBox}
//                 </div> */}

//                 {/* {productVisibility !== "Display Product" ? (
//                   <button
//                       className={`text-white text-xs md:text-sm font-medium py-1 md:py-2 px-2 md:px-4 w-full mt-2 md:mt-4 rounded-md ${product.name === "Stress-Q"
//                           ? "bg-black hover:bg-gray-800 cursor-pointer opacity-100"
//                           : "bg-gray-400 cursor-not-allowed opacity-60"
//                         }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addToCart(product);
//                       }}
//                       disabled={name !== "Stress-Q"}
//                     >
//                       ADD TO CART
//                     </button>
//                 ) : (
//                   <span className="text-red-600 text-sm font-medium mt-4 block">
//                     This product is only for display.
//                   </span>
//                 )} */}
//               </div>
//             );
//           })
//         ) : (
//           <p className="col-span-full text-center">No medicines found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Medicines;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Backend API
const API = `${import.meta.env.VITE_SERVER}/api/v1/products`;

const addToCart = (product) => {
  console.log("Added to cart:", product.name);
};

const Medicines = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const navigate = useNavigate();

  const subCategories = [
    "All",
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
    "Others",
  ];

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.products
          .filter((item) => item.mainCategory === "Medicine")
          .sort((a, b) => a.name.localeCompare(b.name));
        setProducts(filtered);
        setFilteredProducts(filtered);
      })
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedSubCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item) => item.subCategory === selectedSubCategory)
      );
    }
  }, [selectedSubCategory, products]);

  const handleProductClick = (name, id) => {
    navigate(`/productdetails/${name}`, {
      state: { productId: id },
    });
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg h-[100vh]">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Medicines</h1>

      {/* 🔳 SubCategory Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {subCategories.map((sub, index) => (
          <button
            key={index}
            onClick={() => setSelectedSubCategory(sub)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200
              ${
                selectedSubCategory === sub
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* 🧱 Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const {
              _id,
              name,
              images,
              mrpPerBottle,
              packingstyle,
              productVisibility,
              price,
              mrpPerBox,
            } = product;

            return (
              <div
                key={_id}
                onClick={() => handleProductClick(name, _id)}
                className="cursor-pointer text-center border rounded-md p-4 shadow hover:shadow-md transition bg-white"
              >
                <img
                  src={images?.[0]}
                  alt={name}
                  className="h-40 w-auto mx-auto object-contain mb-3 hover:bg-gray-300"
                />

                <h3
                  className="text-sm md:text-base font-medium truncate mb-1"
                  title={name}
                >
                  {name}
               </h3>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center">No medicines found.</p>
        )}
      </div>
    </div>
  );
};


export default Medicines;
