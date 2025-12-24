

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TfiPencil, TfiTrash } from "react-icons/tfi";
import { FaPlusCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Swal from "sweetalert2";


const GlobalClientProduct = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch all global products
  useEffect(() => {
    const fetchGlobalProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/globalproducts/allget`
        );
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || res.data.products || [];
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching global products:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load data",
          text: "Unable to fetch global client products.",
          confirmButtonColor: "#d33",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalProducts();
  }, []);

  // ✅ Handle search
  useEffect(() => {
    const filteredProducts = products.filter((p) =>
      p.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredProducts);
  }, [searchTerm, products]);

  // ✅ Sidebar toggle


  // ✅ Add new product
  const handleAddProduct = () => navigate("/globalclient/Productadd");

  // ✅ Update product
  const handleUpdateProduct = (id) =>
    navigate(`/admin/globalproducts/edit/${id}`);

  // ✅ Delete product (SweetAlert)
  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_SERVER}/api/globalproducts/${id}`
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
          console.error("Error deleting product:", error);
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Something went wrong while deleting.",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-600">
        Loading global products...
      </div>
    );
  }

  const handleView = (id) => navigate(`/globalproduct/${id}`);

  return (
    <div className="flex h-screen relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Sidebar */}


      {/* Mobile Toggle */}
      

      {/* Main Section */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-6 rounded-2xl shadow-lg mb-8 border border-white/60 backdrop-blur-md flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide flex items-center gap-2">
            🌍 Global Products
            <span className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full shadow-sm">
              {filtered.length}
            </span>
          </h1>

          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow transition-all"
          >
            <FaPlusCircle /> Add New Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full flex justify-end mb-6">
          <input
            type="text"
            placeholder="🔍 Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
          />
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="py-3 px-6 text-center">Image</th>
                <th className="py-3 px-6 text-center">Product Name</th>
                <th className="py-3 px-6 text-center">Company</th>
                <th className="py-3 px-6 text-center">Category</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((product, index) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-100 hover:bg-indigo-50/50 transition-all duration-200"
                  >
                    <td className="py-3 px-6 text-center">
                      <img
                        src={product.images?.[0]}
                        alt={product.productName}
                        className="h-12 w-12 object-cover mx-auto rounded-md border"
                      />
                    </td>
                    <td className="py-3 px-6 text-center font-medium text-gray-800">
                      {product.productName || "—"}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {product.type || "N/A"}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {product.category || "N/A"}
                    </td>

                    {/* ✅ Manufacturer-style Buttons */}
                    <td className="py-3 px-6 text-center flex justify-center gap-2">
                      <button
                        onClick={() => handleView(product._id)}
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

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png')] opacity-10"></div>
    </div>
  );
};

export default GlobalClientProduct;
