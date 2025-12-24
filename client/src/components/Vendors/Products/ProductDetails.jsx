import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight, Plus, Minus, X } from "lucide-react";
import img1 from "./../../../assets/Products/product1Blue.png";
import img2 from "./../../../assets/Products/product1Green.png";
import img3 from "./../../../assets/Products/product2Green.png";
import img4 from "./../../../assets/Products/product3Gray.png";

const ProductDetails = () => {
  const location = useLocation();
  const id = location.state?.productId;
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [productImageIndex, setProductImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Details");

  // Preview modal states
  const [showPreview, setShowPreview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}/api/v1/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data.product);

        // Dynamically set the first available option
        const p = data.product;
        if (
          p.mrpPerStrip !== undefined &&
          p.mrpPerStrip !== null &&
          p.mrpPerStrip !== "" &&
          p.mrpPerStrip !== 0
        )
          setSelectedOption("option1");
        else if (
          p.mrpPerBox !== undefined &&
          p.mrpPerBox !== null &&
          p.mrpPerBox !== "" &&
          p.mrpPerBox !== 0
        )
          setSelectedOption("option2");
        else if (
          p.mrpPerTin !== undefined &&
          p.mrpPerTin !== null &&
          p.mrpPerTin !== "" &&
          p.mrpPerTin !== 0
        )
          setSelectedOption("option3");
        else if (
          p.mrpPerJar !== undefined &&
          p.mrpPerJar !== null &&
          p.mrpPerJar !== "" &&
          p.mrpPerJar !== 0
        )
          setSelectedOption("option4");
        else if (
          p.mrpPerTube !== undefined &&
          p.mrpPerTube !== null &&
          p.mrpPerTube !== "" &&
          p.mrpPerTube !== 0
        )
          setSelectedOption("option5");
        else if (
          p.mrpPerBottle !== undefined &&
          p.mrpPerBottle !== null &&
          p.mrpPerBottle !== "" &&
          p.mrpPerBottle !== 0
        )
          setSelectedOption("option6");
        else if (
          p.mrpPerSachet !== undefined &&
          p.mrpPerSachet !== null &&
          p.mrpPerSachet !== "" &&
          p.mrpPerSachet !== 0
        )
          setSelectedOption("option7");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const thumbnails = product?.images?.length
    ? product.images
    : [img1, img2, img3, img4];

  const discountPercent = 0;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  const handleWishlist = () => setWishlist((prev) => !prev);
  const handlePrevImage = () =>
    setProductImageIndex((prev) =>
      prev === 0 ? thumbnails.length - 1 : prev - 1
    );
  const handleNextImage = () =>
    setProductImageIndex((prev) => (prev + 1) % thumbnails.length);
  const handleChange = (event) => setSelectedOption(event.target.value);

  // Preview modal functions
  const openPreview = (index = productImageIndex) => {
    setCurrentImageIndex(index);
    setShowPreview(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closePreview = () => {
    setShowPreview(false);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? thumbnails.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % thumbnails.length);
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  // Handle keyboard navigation in preview
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showPreview) return;

      switch (e.key) {
        case "Escape":
          closePreview();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showPreview]);

  const getFirstAvailableMRP = (product) => {
    if (
      product.mrpPerBox !== undefined &&
      product.mrpPerBox !== null &&
      product.mrpPerBox !== "" &&
      product.mrpPerBox !== 0
    ) {
      return { price: product.mrpPerBox, label: "MRP Per Box" };
    }
    if (
      product.mrpPerTin !== undefined &&
      product.mrpPerTin !== null &&
      product.mrpPerTin !== "" &&
      product.mrpPerTin !== 0
    ) {
      return { price: product.mrpPerTin, label: "MRP Per Tin" };
    }
    if (
      product.mrpPerTube !== undefined &&
      product.mrpPerTube !== null &&
      product.mrpPerTube !== "" &&
      product.mrpPerTube !== 0
    ) {
      return { price: product.mrpPerTube, label: "MRP Per Tube" };
    }
    if (
      product.mrpPerJar !== undefined &&
      product.mrpPerJar !== null &&
      product.mrpPerJar !== "" &&
      product.mrpPerJar !== 0
    ) {
      return { price: product.mrpPerJar, label: "MRP Per Jar" };
    }
    if (
      product.mrpPerSachet !== undefined &&
      product.mrpPerSachet !== null &&
      product.mrpPerSachet !== "" &&
      product.mrpPerSachet !== 0
    ) {
      return { price: product.mrpPerSachet, label: "MRP Per Sachet" };
    }
    if (
      product.mrpPerBottle !== undefined &&
      product.mrpPerBottle !== null &&
      product.mrpPerBottle !== "" &&
      product.mrpPerBottle !== 0
    ) {
      return { price: product.mrpPerBottle, label: "MRP Per Bottle" };
    }

    return { price: 0, label: "MRP" };
  };

  const addToCart = (product, selectedOption) => {
    let price = 0;
    let priceLabel = "";

    if (selectedOption === "option1") {
      price = product.mrpPerStrip;
      priceLabel = "MRP Per Strip";
    } else if (selectedOption === "option2") {
      price = product.mrpPerBox;
      priceLabel = "MRP Per Box";
    } else if (selectedOption === "option3") {
      price = product.mrpPerTin;
      priceLabel = "MRP Per Tin";
    } else if (selectedOption === "option4") {
      price = product.mrpPerJar;
      priceLabel = "MRP Per Jar";
    } else if (selectedOption === "option5") {
      price = product.mrpPerTube;
      priceLabel = "MRP Per Tube";
    } else if (selectedOption === "option6") {
      price = product.mrpPerBottle;
      priceLabel = "MRP Per Bottle";
    } else if (selectedOption === "option7") {
      price = product.mrpPerSachet;
      priceLabel = "MRP Per Sachet";
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [
      ...existingCart,
      { ...product, selectedOption, quantity, price, priceLabel },
    ];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Item added to cart");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-sm text-gray-500 mb-4">
        Category / {product.category} / {product.name}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
              onClick={handlePrevImage}
            >
              <ChevronLeft size={18} />
            </button>
            <img
              src={thumbnails[productImageIndex]}
              alt={product.name}
              className="w-full h-[400px] sm:h-[500px] rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity object-contain bg-gray-50"
              onClick={() => openPreview(productImageIndex)}
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
              onClick={handleNextImage}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex space-x-2 mt-4 justify-center">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index}`}
                className={`border-2 ${productImageIndex === index
                    ? "border-blue-500"
                    : "border-gray-200"
                  } rounded-md w-16 h-16 cursor-pointer hover:border-blue-300 transition-colors`}
                onClick={() => {
                  setProductImageIndex(index);
                  openPreview(index);
                }}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex items-center   mb-4">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className=" text-gray-600 pb-2 pl-4">
              ({" "}
              {product.productcategory === "Veterinary"
                ? "Veterinary"
                : "Human"}{" "}
              )
            </p>
          </div>

          {/* <div className="text-xl font-semibold text-green-500 mb-4">
            MRP  ₹
            {selectedOption === "option1" && product.mrpPerStrip
              ? product.mrpPerStrip
              : selectedOption === "option2" && product.mrpPerBox
                ? product.mrpPerBox
                : selectedOption === "option3" && product.mrpPerTin
                  ? product.mrpPerTin
                  : selectedOption === "option4" && product.mrpPerJar
                    ? product.mrpPerJar
                    : selectedOption === "option5" && product.mrpPerTube
                      ? product.mrpPerTube
                      : selectedOption === "option6" && product.mrpPerBottle
                        ? product.mrpPerBottle
                        : selectedOption === "option7" && product.mrpPerSachet
                          ? product.mrpPerSachet
                          : 0}
          </div> */}

          {/* <div className="mb-4">
            {product.mrpPerStrip !== undefined &&
              product.mrpPerStrip !== null &&
              product.mrpPerStrip !== "" &&
              product.mrpPerStrip !== 0 && (
                <label className="lg:mr-10 md:mr-10">
                  <input
                    type="radio"
                    value="option1"
                    checked={selectedOption === "option1"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  MRP Per Strip{" "}
                  <span className="text-green-500">₹{product.mrpPerStrip}</span>
                </label>
              )}
            {product.mrpPerBox !== undefined &&
              product.mrpPerBox !== null &&
              product.mrpPerBox !== "" &&
              product.mrpPerBox !== 0 && (
                <label className="lg:mr-10 md:mr-10">
                  <input
                    type="radio"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  MRP Per Box{" "}
                  <span className="text-green-500">₹{product.mrpPerBox}</span>
                </label>
              )}
            {product.mrpPerTin !== undefined &&
              product.mrpPerTin !== null &&
              product.mrpPerTin !== "" &&
              product.mrpPerTin !== 0 && (
                <label className="lg:mr-10 md:mr-10">
                  <input
                    type="radio"
                    value="option3"
                    checked={selectedOption === "option3"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  MRP Per Tin{" "}
                  <span className="text-green-500">₹{product.mrpPerTin}</span>
                </label>
              )}
            {product.mrpPerJar !== undefined &&
              product.mrpPerJar !== null &&
              product.mrpPerJar !== "" &&
              product.mrpPerJar !== 0 && (
                <label className="lg:mr-10 md:mr-10">
                  <input
                    type="radio"
                    value="option4"
                    checked={selectedOption === "option4"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  MRP Per Jar{" "}
                  <span className="text-green-500">₹{product.mrpPerJar}</span>
                </label>
              )}
            {product.mrpPerTube !== undefined &&
              product.mrpPerTube !== null &&
              product.mrpPerTube !== "" &&
              product.mrpPerTube !== 0 && (
                <label className="lg:mr-10 md:mr-10">
                  <input
                    type="radio"
                    value="option5"
                    checked={selectedOption === "option5"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  MRP Per Tube{" "}
                  <span className="text-green-500">₹{product.mrpPerTube}</span>
                </label>
              )}
            {product.mrpPerBottle !== undefined &&
              product.mrpPerBottle !== null &&
              product.mrpPerBottle !== "" &&
              product.mrpPerBottle !== 0 && (
                <label className="lg:mr-10 md:mr-10">
                  <input
                    type="radio"
                    value="option6"
                    checked={selectedOption === "option6"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  MRP Per Bottle{" "}
                  <span className="text-green-500">
                    ₹{product.mrpPerBottle}
                  </span>
                  <delete className="ps-2">₹500</delete> off this product
                </label>
              )}
            {product.mrpPerSachet !== undefined &&
              product.mrpPerSachet !== null &&
              product.mrpPerSachet !== "" &&
              product.mrpPerSachet !== 0 && (
                <label className="lg:mr-10 md:mr-10">
                  <input
                    type="radio"
                    value="option7"
                    checked={selectedOption === "option7"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  MRP Per Sachet{" "}
                  <span className="text-green-500">
                    ₹{product.mrpPerSachet}
                  </span>
                </label>
              )}
          </div> */}

          {/* {product.producttype === "BOTTLE" && (
            <div>
              <p>U.S.P / {product.mrpPerQuantity}</p>
            </div>
          )} */}

          <div className="flex  items-center flex-wrap mb-4">
            <span>Packing Style - {product.packingstyle} </span>
            <span className="lg:ml-6 md:ml-6">
              Packing Profile - {product.packingProfile}{" "}
            </span>
          </div>



          {/* {product.name !== "Stress-Q" && (
            <p className="text-red-600 text-xs mb-2">
              This product is currently not available
            </p>
          )} */}

          {/* <div className="flex items-center space-x-2 mb-4">
            {product.productVisibility !== "Display Product" ? (
              <div className="flex flex-col sm:flex-row gap-2">

                
                {product.name === "Stress-Q" && (
                  <div className="flex items-center border rounded-md">
                    <button className="px-3 py-2" onClick={decrementQuantity}>
                      <Minus size={16} />
                    </button>
                    <span className="px-3">{quantity}</span>
                    <button className="px-3 py-2" onClick={incrementQuantity}>
                      <Plus size={16} />
                    </button>
                  </div>
                )}

                
                <button
                  className={`py-2 px-4 rounded-md w-full ${product.name === "Stress-Q"
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-400 text-white cursor-not-allowed opacity-60"
                    }`}
                  onClick={() => addToCart(product, selectedOption)}
                  disabled={product.name !== "Stress-Q"}
                >
                  Add to cart
                </button>
              </div>
            ) : (
              <span className="text-red-600 text-sm font-medium ml-4">
                This product is only for display.
              </span>
            )}
          </div> */}

          {/* <button
            className="flex items-center text-sm mb-3"
            onClick={handleWishlist}
          >
            <Heart
              size={16}
              className={wishlist ? "fill-red-500 text-red-500" : ""}
            />
            <span className="ml-2">
              {wishlist ? "Remove from wishlist" : "Add to wishlist"}
            </span>
          </button> */}

          <div className="border-b py-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Description</h3>
            </div>
            <p className="m-2 text-gray-600">{product.description}</p>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b">
              {["Details"].map((tab) => (
                <button
                  key={tab}
                  className={`py-3 px-6 focus:outline-none ${activeTab === tab ? "border-b-2 border-black" : ""
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Expandable Sections */}
            <div className="py-4">
              <div className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">KEY FEATURES</h3>
                </div>
                <p className="m-2 text-gray-600">{product.keyFeature}</p>
              </div>

              <div className="border-b py-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">Composition</h3>
                </div>
                <p className="m-2 text-gray-600">{product.composition}</p>
              </div>

              <div className="border-b py-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">Adverse Effect</h3>
                </div>
                <p className="m-2 text-gray-600">{product.adverseEffect}</p>
              </div>

              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">HOW TO USE</h3>
                </div>
                <div className="mt-4 text-gray-600">
                  <p className="m-2 text-gray-600">{product.howToUse}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showPreview && thumbnails && thumbnails.length > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            // Close preview when clicking on the background (not on the content)
            if (e.target === e.currentTarget) {
              closePreview();
            }
          }}
        >
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Close button with improved visibility */}
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 bg-black border-2 border-white rounded-full p-2 text-white z-10 shadow-lg hover:bg-gray-800 transition-colors"
              aria-label="Close preview"
              style={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
            >
              <X size={17} />
            </button>

            {/* Media container with fixed dimensions */}
            <div className="relative flex flex-col items-center bg-white rounded-lg overflow-hidden">
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 h-[85vh] bg-white flex items-center justify-center">
                  <img
                    src={thumbnails[currentImageIndex]}
                    alt={`${product.name} - View ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "80vh",
                    }}
                  />
                </div>
              </div>

              {/* <p className="text-base text-gray-600 mt-2 mb-2">
                Note: Product image for illustration purpose only.
              </p> */}
            </div>

            {/* Preview Navigation Arrows - only show if multiple images */}
            {thumbnails.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black border border-white rounded-full p-2 sm:p-3 text-white shadow-lg hover:bg-gray-800 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={13} className="sm:hidden" />
                  <ChevronLeft size={17} className="hidden sm:block" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black border border-white rounded-full p-2 sm:p-3 text-white shadow-lg hover:bg-gray-800 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={13} className="sm:hidden" />
                  <ChevronRight size={17} className="hidden sm:block" />
                </button>
              </>
            )}

            {/* Preview Dots indicator - only show if multiple images */}
            {thumbnails.length > 1 && (
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 overflow-x-auto py-2">
                <div className="flex space-x-3 px-2 bg-black/40 rounded-full py-2 backdrop-blur-sm">
                  {thumbnails.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${currentImageIndex === index
                          ? "bg-white scale-110"
                          : "bg-white/40 hover:bg-white/70"
                        } flex-shrink-0`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
