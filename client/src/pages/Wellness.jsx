import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Backend API
const API = `${import.meta.env.VITE_SERVER}/api/v1/products`;

// Dummy addToCart function — Replace with actual logic/context
const addToCart = (product) => {
  console.log("Added to cart:", product.name);
};

const Wellness = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.products.filter(
          (item) => item.productcategory === "Wellness"
        );
        setProducts(filtered);
      })
      .catch((err) => console.error("Failed to fetch products:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleProductClick = (name,id) => {
    navigate(`/productdetails/${name}`, {
      state: { productId: id },
    });
  };
  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Wellness Products</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-6">
        {products.length > 0 ? (
          products.map((product) => {
            const {
              _id,
              name,
              images,
              mrpPerBottle,
              packingstyle,
              productVisibility,
            } = product;

            return (
              <div
                key={_id}
                onClick={() => handleProductClick(name,_id)}
                className="cursor-pointer text-center border rounded-md p-4 shadow hover:shadow-md transition bg-white"
              >
                <img
                  src={images?.[0]}
                  alt={name}
                  className="h-40 w-auto mx-auto object-contain mb-3"
                />
                <h3
                  className="text-sm md:text-base font-medium truncate mb-1"
                  title={name}
                >
                  {name}
                </h3>

                {/* <div className="mt-1 text-gray-500 text-sm">{packingstyle}</div> */}

                {/* <div className="mt-1 font-semibold text-lg text-black">
                  ₹{mrpPerBottle}
                </div> */}

                {/* {productVisibility !== "Display Product" ? (
                   <button
                      className={`text-white text-xs md:text-sm font-medium py-1 md:py-2 px-2 md:px-4 w-full mt-2 md:mt-4 rounded-md ${product.name === "Stress-Q"
                          ? "bg-black hover:bg-gray-800 cursor-pointer opacity-100"
                          : "bg-gray-400 cursor-not-allowed opacity-60"
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      disabled={name !== "Stress-Q"}
                    >
                      ADD TO CART
                    </button>
                ) : (
                  <span className="text-red-600 text-sm font-medium mt-4 block">
                    This product is only for display.
                  </span>
                )} */}
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center">No wellness products found.</p>
        )}
      </div>
    </div>
  );
};

export default Wellness;
