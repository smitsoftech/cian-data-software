
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { BsFiletypeXlsx } from "react-icons/bs";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
 
  const [searchTerm, setSearchTerm] = useState("");
  const [productLength, setProductLength] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const navigate = useNavigate();

  // =================== Fetch Products ===================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/products`
        );
        const data = response.data?.products || [];

        setProducts(data);
        setFilteredProducts(data);
        setProductLength(data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to load products. Please try again later.",
        });
      }
    };
    fetchProducts();
  }, []);

  // =================== Search Filter ===================
  useEffect(() => {
    const filtered = products.filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setTotalResult(searchTerm.trim() ? filtered.length : 0);
  }, [searchTerm, products]);

  // =================== Excel Download ===================
  const handleDownloadExcel = () => {
    if (!products.length) {
      Swal.fire({
        icon: "info",
        title: "No Data!",
        text: "No products available to export.",
      });
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "products.xlsx");

    Swal.fire({
      icon: "success",
      title: "Download Complete!",
      text: "Products exported successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // =================== Delete Product ===================
  const handleDeleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_SERVER}/api/v1/products/${id}`
        );

        setProducts((prev) => prev.filter((p) => p._id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete product. Try again.",
        });
      }
    }
  };

  // =================== Navigation ===================
  
  const handleAddProduct = () => navigate("/newaddproduct");
  const handleViewAllFilteredProducts = () => navigate("/viewall/filteredproducts");
  const handleUpdateProduct = (id) =>
    navigate(`/newaddproduct/edit/${id}`);
  const handleProductClick = (name, id) =>
    navigate(`/productdetails/${name}`, {
      state: { productId: id },
    });
  const handleManufacturerView = (id) =>
    navigate(`/admin/manufacturers/view/${id}`);

  if (!products.length && !searchTerm)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto transition-all duration-300 p-6 md:p-10 ml-0">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-5 rounded-2xl shadow-md mb-6 border border-white/60 backdrop-blur-md flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-3">
           

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              🛒 All Products
            </h1>

            <span className="text-sm text-gray-600">
              ({productLength})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search */}
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-56 md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />

            {/* Excel Download */}
            {/* <button
              onClick={handleDownloadExcel}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-all"
            >
              <BsFiletypeXlsx className="text-lg" />
              Excel
            </button> */}

            <button
              onClick={handleViewAllFilteredProducts}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-all"
            >
              <BsFiletypeXlsx className="text-lg" />
              View All Filtered Product
            </button>

            {/* Add Product */}
            <button
              onClick={handleAddProduct}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
            >
              <FaPlusCircle /> Add Product
            </button>
          </div>
        </div>

        {/* Search Result Count */}
        {totalResult > 0 && (
          <p className="text-sm text-gray-600 mb-2">
            🔍 Found <b>{totalResult}</b> matching results
          </p>
        )}

        {/* Product Table */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="py-3 px-6 text-center font-semibold">Image</th>
                <th className="py-3 px-6 text-center font-semibold  ">Name</th>
                <th className="py-3 px-6 text-center font-semibold">
                  View Manufacturer
                </th>
                {/* <th className="py-3 px-6 text-center font-semibold">Code</th> */}
                <th className="py-3 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`border-b ${index % 2 === 0
                        ? "bg-gray-50 hover:bg-indigo-50"
                        : "bg-white hover:bg-indigo-50"
                      } transition`}
                  >
                    {/* Image */}
                    <td className="py-1 px-2 text-center">
                      <img
                        src={
                          product.images?.[0] ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFlhSWwrzGBZnqDlW7uLEEJWBhFc8sW_Ruw&s"
                        }
                        alt={product.name}
                        className="h-8 w-8 object-cover rounded-md mx-auto border"
                      />
                    </td>

                    {/* Name */}
                    <td className="py-1 px-2 text-center font-medium text-gray-800 ">
                      <div className="max-w-sm mx-auto text-center">{product.name || "—"}</div>
                    </td>

                    {/* Manufacturers */}
                    <td className="py-1 px-2 text-center ">
                      <div className="flex justify-center gap-2 ">
                        {(product?.manufacturer || []).map((id, index) => (
                          <button
                            key={id}
                            onClick={() => handleManufacturerView(id)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md transition"
                          >
                            View {index + 1}
                          </button>
                        ))}
                      </div>
                    </td>



                    {/* Actions */}
                    <td className="py-1 px-2 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleProductClick(product.name, product._id)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md transition"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleUpdateProduct(product._id)}
                          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-md transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
