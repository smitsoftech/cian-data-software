import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Zoom from "react-medium-image-zoom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import { FaFilePdf } from "react-icons/fa";

const GlobalProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/globalproducts/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  // Custom arrow components for react-slick
  const PrevArrow = ({ onClick }) => (
    <button
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-700/70 text-white p-2 rounded-full hover:bg-gray-900 transition"
      onClick={onClick}
    >
      ❮
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-700/70 text-white p-2 rounded-full hover:bg-gray-900 transition"
      onClick={onClick}
    >
      ❯
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
        <Link
          to="/globalclient"
          className="text-blue-600   mb-6 inline-block"
        >
          <span className="hover:text-green-500" > Global </span> / <span className="hover:text-green-500">{product.type}</span> / <span className="hover:text-green-500">{product.category}</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Slider with Zoom */}
          {/* <div className="relative">
            <Slider {...sliderSettings}>
              {product.images?.map((img, index) => (
                <div key={index} className="flex justify-center items-center border border-gray-700 rounded-sm" >
                  <Zoom>
                    <img
                      src={img}
                      alt={`${product.productName}-${index}`}
                      className="w-96 h-96 object-contain cursor-zoom-in items-center"
                    />
                  </Zoom>
                </div>
              ))}
            </Slider>
          </div> */}

          <div className="relative border border-gray-300 rounded-md ">
            <Slider {...sliderSettings}>
              {product.images?.map((img, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center  w-96 h-96 mx-auto rounded-md bg-white"
                >
                  <div className="flex justify-center items-center w-full h-full">
                    <Zoom>
                      <img
                        src={img}
                        alt={`${product.productName}-${index}`}
                        className="max-w-full max-h-full object-contain cursor-zoom-in"
                      />
                    </Zoom>
                  </div>

                </div>
              ))}
            </Slider>
          </div>


          {/* Product Info */}
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              {product.productName}
            </h2>

            <p className="font-bold"> Description:</p>
            
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  product.description || "<p>No description available.</p>",  
              }}
            ></div>

            {product?.price && (
              <p className="text-gray-800 font-semibold mb-4">
                <strong>Price:</strong> ₹{product.price}
              </p>
            )}

            {product?.productLeaflet && (
              <a
                href={product.productLeaflet}
                target="_blank"
                rel="noopener noreferrer"
                className=" flex justify-center items-center w-fit bg-red-600 text-white px-6 py-2 rounded-md mt-7 ver:bg-red-700 transition"
              >
                <FaFilePdf className=""/> <span className="pl-2">View Product Leaflet</span>
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        {/* <div className="border-b mt-10 flex gap-8 text-lg font-medium text-gray-700">
          <button
            className={`pb-2 border-b-2 ${activeTab === "description"
              ? "border-blue-600 text-blue-600"
              : "border-transparent hover:text-blue-600"
              }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`pb-2 border-b-2 ${activeTab === "reviews"
              ? "border-blue-600 text-blue-600"
              : "border-transparent hover:text-blue-600"
              }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (0)
          </button>
        </div> */}

        {/* Tab Content */}
        {/* <div className="mt-6">
          {activeTab === "description" && (
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html:
                  product.description || "<p>No description available.</p>",
              }}
            ></div>
          )}

          {activeTab === "reviews" && (
            <p className="text-gray-600 italic">No reviews yet.</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default GlobalProductDetail;
