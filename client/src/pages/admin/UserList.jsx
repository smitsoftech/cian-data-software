import React, { useState, useEffect } from "react";

import { RiDeleteBinLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import Loader from "../../components/admin/Loader";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPlusCircle } from "react-icons/fa";

const UserList = () => {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  /* 🔹 Add User Popup State */
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    verificationMethod: "email",
  });


  useEffect(() => {
    fetchUsers();
  }, []);

  /* 🔹 Fetch Users */
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/user/users`,
        { withCredentials: true }
      );
      setUsers(response.data.users);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to load users",
        text: "Unable to fetch user data.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Toggle User Role */
  const updateUserRole = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/user/updateRole/${id}`,
        {},
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Role Updated",
        timer: 1200,
        showConfirmButton: false,
      });

      fetchUsers();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });
    }
  };

  /* 🔹 Delete User */
  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "User will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER}/api/v1/user/deleteone/${id}`,
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "User Deleted",
        timer: 1200,
        showConfirmButton: false,
      });

      fetchUsers();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
      });
    }
  };

  /* 🔹 Add User */
  const handleAddUser = async () => {
    try {
      const payload = {
        ...newUser,
        phone: `+91${newUser.phone}`,
      };

      await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/register`,
        payload,
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "User Added",
        timer: 1200,
        showConfirmButton: false,
      });

      setShowAddUser(false);
      setNewUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        verificationMethod: "email",
      });

      fetchUsers();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add User",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="relative flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
 

  

      {/* Main */}
      <div className="flex-1 h-full overflow-y-auto p-6 md:p-10 relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-6 rounded-2xl shadow-lg mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            👥 Users
            <span className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full">
              {users.length}
            </span>
          </h1>

          <button
            onClick={() => setShowAddUser(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 justify-center"
          > <FaPlusCircle />
             Add User
          </button>
        </div>

        {/* Table */}
        <div className="bg-white/80 shadow-lg rounded-2xl border overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="py-3 px-6 text-center">Avatar</th>
                <th className="py-3 px-6 text-center">Name</th>
                <th className="py-3 px-6 text-center">Email</th>
                <th className="py-3 px-6 text-center">Role</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-indigo-50"
                >
                  <td className="py-3 px-6 text-center">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}`}
                      className="h-10 w-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-3 px-6 text-center">{user.name}</td>
                  <td className="py-3 px-6 text-center">{user.email}</td>
                  <td className="py-3 px-6 text-center">
                    <span className="px-3 py-1 text-xs rounded-full bg-gray-100">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center space-x-2">
                    <button
                      onClick={() => updateUserRole(user._id)}
                      className="bg-yellow-100 px-3 py-1 rounded"
                    >
                      Toggle Role
                    </button>
                   <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md transition"
                      >
                        <RiDeleteBinLine className="inline-block mt-[-1px] " /> Delete
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Add New User
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Name"
                className="w-full border px-4 py-2 rounded"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                placeholder="Email"
                className="w-full border px-4 py-2 rounded"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                placeholder="Phone"
                className="w-full border px-4 py-2 rounded"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border px-4 py-2 rounded"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <select
                className="w-full border px-4 py-2 rounded"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
