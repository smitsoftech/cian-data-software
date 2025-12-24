import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Context } from "../../main";
import { Context } from "./../main";
import heroImage from "../assets/img1.png";
import {
  FiHeart,
  FiShoppingCart,
  FiSearch,
  FiUpload,
  FiFile,
  FiPhone,
  FiMenu,
  FiX,
} from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import Media from "./../assets/venderhome/Media.png";

const medicinesData = ["All Medicines", "Buy Again", "Order Online"];
const wellnessData = [
  [
    { title: null, items: ["Ayurvedic", "Unani", "Homeopathy", "Siddha"] },
    {
      title: "Diabetes Support",
      items: [
        "Glucometers",
        "Sugar Substitutes",
        "Diabetes Management Supplements",
        "Diabetes Care Ayurveda",
        "Lancets & Test Strips",
      ],
    },
  ],
  [
    {
      title: "Fitness",
      items: ["Weight Management", "Sports Supplements"],
    },
    {
      title: "Health Conditions",
      items: [
        "Women's Care",
        "Bone and Joint Pain",
        "Liver Care",
        "Piles Care",
        "Weight Care (EW)",
        "Stomach Care",
        "Mental Care",
        "De-Addiction",
        "Diabetic Care",
        "Cardiac Care",
        "Cold and Fever",
      ],
    },
  ],
  [
    {
      title: null,
      items: [
        "Immunity Care",
        "Smoking Cessation Support",
        "Vitamins and Supplements",
        "Family Nutrition",
      ],
    },
    {
      title: "Personal Care",
      items: [
        "Home & Health",
        "Senior Care",
        "Face Personal Care",
        "Hands & Feet",
        "Oral Care",
        "Bath & Shower",
        "Body Care",
        "Personal Care Tools & Accessories",
        "Up Care",
        "Bathing Accessories",
      ],
    },
  ],
];

const beautyData = [
  {
    title: "Hair",
    items: ["Hair Care", "Scalp Treatments", "Shop By Hair Type"],
  },
  {
    title: "Mom & Baby",
    items: [
      "Baby Bath Time",
      "Baby Care",
      "Feminine Hygiene",
      "Maternity Accessories",
      "Maternity Care",
      "Toy & Games",
    ],
  },
  {
    title: "Skin Care",
    items: ["Aromatherapy", "Cleansers", "Eye Care", "Face Skin Care", "Masks"],
  },
  {
    title: "Personal Care",
    items: [
      "Bath & Shower",
      "Bathing Accessories",
      "Body Care",
      "Face Personal Care",
      "Hands & Feet",
      "Up Care",
      "Oral Care",
      "Personal Care Tools & Accessories",
      "Senior Care",
    ],
  },
];

const Dropdown = ({ children, className = "" }) => (
  <div className={`absolute bg-white shadow-lg p-6 z-50 ${className}`}>
    {children}
  </div>
);

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

//   useEffect(() => {
//   const logout = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_SERVER}/api/v1/user/logout`,
//         {
//           withCredentials: true,
//         }
//       );

//       toast.success(res.data.message);
//       setUser(null);
//       setIsAuthenticated(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Logout failed");
//       console.error(err);
//     }
//   };

//   logout(); // Call logout immediately on mount
// }, [setUser, setIsAuthenticated]);

const renderDropdownColumn = (section, index) => (
  <div key={index} className="flex flex-col space-y-2 text-center">
    {section.title && (
      <span className="text-blue-600 font-semibold">{section.title}</span>
    )}
    {section.items.map((item) => (
      <a href="#" key={item} className="hover:text-blue-500 text-gray-600">
        {item.split("\n").map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </a>
    ))}
  </div>
);

const Navbar = () => {
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const { user, setUser } = useContext(Context);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState(0);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/user/me`,
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );
        setIsAdmin(response.data.user.role == "admin");
        console.log(response.data);
        // Correctly access the role from response.data.user
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setIsLoading(false); // Set loading to false after the API call
      }
    };

    fetchUserRole();

    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart.length); // Set the total number of items in the cart
  }, []);

  const handleMouseEnter = (key) => {
    setHoveredDropdown(key);
  };

  const handleCartClick = () => {
    navigate("/vendor/cart"); // Navigate to the cart page
  };

  const handleMouseLeave = () => {
    setHoveredDropdown(null);
  };

  const navItems = ["medicines", "wellness", "beauty"];
  const logout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/user/logout`,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Logged out successfully");

      setUser(null);
      setIsAuthenticated(false);
      setTimeout(() => {
        navigateTo("/auth"); // navigate is correct, not navigateTo
      }, 1000);
    } catch (err) {
      console.error("Logout error:", err);
      if (!err.response) {
        toast.error("Network error");
      } else {
        toast.error(err.response.data?.message || "Logout failed");
      }
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-4 relative z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* <img
            src={Media}
            alt="Logo"
            className="h-12 w-16 sm:h-16 sm:w-20 md:h-20 md:w-24"
          /> */}

          <Link to="/">
            <img
              src={heroImage}
              alt="Logo"
              className="h-12 w-16 sm:h-16 sm:w-20 md:h-20 md:w-24"
            />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-8 text-gray-700 font-medium">
          {/* {navItems.map((key) => (
            <div
              key={key}
              className="relative group py-2"
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={handleMouseLeave}
            >
              <span
                className={`cursor-pointer ${hoveredDropdown === key
                  ? "text-blue-600"
                  : "hover:text-blue-500"
                  }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>

              {hoveredDropdown === key && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2">
                  {key === "medicines" && (
                    <Dropdown className="min-w-[600px] max-w-[90vw]">
                      <div className="flex flex-col ">
                        {medicinesData.map((item) => (
                          <a
                            href="#"
                            key={item}
                            className="hover:text-blue-500"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </Dropdown>
                  )}

                  {key === "wellness" && (
                    <Dropdown className="min-w-[800px] max-w-[95vw]">
                      <div className="flex gap-12 px-4">
                        {wellnessData.map((column, colIdx) => (
                          <div
                            key={colIdx}
                            className="flex flex-col space-y-6 text-left"
                          >
                            {column.map((section, idx) => (
                              <div key={idx} className="space-y-2">
                                {section.title && (
                                  <span className="text-blue-600 font-semibold">
                                    {section.title}
                                  </span>
                                )}
                                {section.items.map((item) => (
                                  <a
                                    href="#"
                                    key={item}
                                    className="hover:text-blue-500 text-gray-600 block"
                                  >
                                    {item}
                                  </a>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </Dropdown>
                  )}

                  {key === "beauty" && (
                    <Dropdown className="min-w-[700px] max-w-[95vw]">
                      <div className="flex flex-wrap gap-8">
                        {beautyData.map((section, i) =>
                          renderDropdownColumn(section, i)
                        )}
                      </div>
                    </Dropdown>
                  )}
                </div>
              )}
            </div>
          ))} */}

          <Link
            to="/veterinary"
            className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
          >
            <span>Veterinary</span>
          </Link>

          <Link
            to="/medicines"
            className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
          >
            <span>Medicines</span>
          </Link>

          <Link
            to="/wellness"
            className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
          >
            <span>Wellness</span>
          </Link>

          <Link
            to="/beauty"
            className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
          >
            <span>Beauty</span>
          </Link>

          <Link
            to="/vendor/productdisplay"
            className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
          >
            <span>Product Display</span>
          </Link>

          <Link
            to="/globalclient"
            className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
          >
            <span>Global Client</span>
          </Link>
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition "
            >
              Admin
            </Link>
          )}
        </div>

        {/* <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">

        <Link
    to="/auth"
          <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition">
            <User className="h-5 w-5" />
            <span>Login/Sign Up</span>
          </div>
           </Link>
          <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
          </div>
        </div> */}

        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          )}

          {/* <div className="relative">
            
            <button
              className="text-gray-700 hover:text-blue-600 transition-colors md:block"
              onClick={handleCartClick}
            >
              <FiShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            </button>
           
            {cartItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-[13px] h-[13px] flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </div> */}

          {/* <Link
            to="/vendor/cart"
            className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
          </Link> */}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 text-gray-800 font-medium">
          {/* {navItems.map((key) => (
            <div key={key} className="flex flex-col">
              <button
                className="flex justify-between items-center py-2 px-2 bg-white rounded"
                onClick={() =>
                  setMobileDropdown((prev) => (prev === key ? null : key))
                }
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                <span>{mobileDropdown === key ? "▲" : "▼"}</span>
              </button>

              {mobileDropdown === key && (
                <div className="pl-4 py-2 space-y-2">
                  {key === "medicines" &&
                    medicinesData.map((item) => (
                      <a
                        href="#"
                        key={item}
                        className="block hover:text-blue-500"
                      >
                        {item}
                      </a>
                    ))}
                  {key === "wellness" &&
                    wellnessData.map((column, i) => (
                      <div key={i} className="mb-2">
                        {column.map((section, j) => (
                          <div key={j} className="mb-1">
                            {section.title && (
                              <div className="font-semibold text-blue-600">
                                {section.title}
                              </div>
                            )}
                            <div className="pl-2 space-y-1">
                              {section.items.map((item) => (
                                <a
                                  href="#"
                                  key={item}
                                  className="block hover:text-blue-500"
                                >
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  {key === "beauty" &&
                    beautyData.map((section, i) => (
                      <div key={i} className="mb-2">
                        {section.title && (
                          <div className="font-semibold text-blue-600">
                            {section.title}
                          </div>
                        )}
                        <div className="pl-2 space-y-1">
                          {section.items.map((item) => (
                            <a
                              href="#"
                              key={item}
                              className="block hover:text-blue-500"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))} */}

          <div className="border-t pt-4 flex flex-col space-y-4">
            <Link
              to="/veterinary"
              className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
            >
              <span>Veterinary</span>
            </Link>

            <Link
              to="/medicines"
              className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
            >
              <span>Medicines</span>
            </Link>

            <Link
              to="/wellness"
              className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
            >
              <span>Wellness</span>
            </Link>

            <Link
              to="/beauty"
              className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
            >
              <span>Beauty</span>
            </Link>

            {/* <Link
              to="/vendor/cart"
              className="flex items-center space-x-2 hover:text-blue-500 cursor-pointer transition"
            >
              <span>Cart</span>
              <ShoppingCart className="h-5 w-5" />
            </Link> */}

            <Link
              to="/vendor/productdisplay"
              className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
            >
              <span>ProductDisplay</span>
            </Link>

            {/* <Link
              to="/"
              className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition"
            >
              <span>Product</span>
            </Link> */}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition "
              >
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="bg-gray-700 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
