import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import { FaPlusCircle } from "react-icons/fa";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();



  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/customers/all`
      );
      setCustomers(response?.data?.data || []);
    } catch (error) {
      console.error("❌ Error fetching customers:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to load data",
        text: "Unable to fetch customers. Please try again later.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Navigation
  const handleAdd = () => navigate("/admin/addCustomer");
  const handleView = (id) => navigate(`/admin/customers/view/${id}`);
  const handleEdit = (id) => navigate(`/admin/customers/edit/${id}`);

  // Delete customer
  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the customer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_SERVER}/api/customers/${id}`
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Customer deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchCustomers();
      } catch (error) {
        console.error("❌ Error deleting:", error);
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Something went wrong while deleting the customer.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <p className="text-gray-600 text-lg">Loading customers...</p>
      </div>
    );

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      
   
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 p-6 md:p-10 ml-0`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-5 rounded-2xl shadow-md mb-6 border border-white/60 backdrop-blur-md flex justify-between items-center">
          <div className="flex items-center gap-2">
           
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              👥 All Customers
            </h1>
            <span className="text-sm text-gray-600 mt-1">
              ({customers.length})
            </span>
          </div>

          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <FaPlusCircle /> Add Customer
          </button>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">#</th>
                <th className="py-3 px-6 text-left font-semibold">
                  Customer Name
                </th>
                <th className="py-3 px-6 text-left font-semibold">Code</th>
                <th className="py-3 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.length > 0 ? (
                customers.map((c, index) => (
                  <tr
                    key={c._id}
                    className="border-b border-gray-200 hover:bg-indigo-50 transition-colors"
                  >
                    <td className="py-3 px-6">{index + 1}</td>

                    <td className="py-3 px-6 font-medium text-gray-800">
                      {c.CustName || "—"}
                    </td>

                    <td className="py-3 px-6 text-gray-500 text-sm">
                      {c.CustCd || "—"}
                    </td>

                    <td className="py-3 px-6 text-center flex justify-center gap-2">
                      <button
                        onClick={() => handleView(c._id)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEdit(c._id)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-md transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(c._id)}
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
                    colSpan="4"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No customers found.
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

export default CustomerList;
