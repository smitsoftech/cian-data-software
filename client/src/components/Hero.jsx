import React, { useContext } from "react";
import heroImage from "../assets/img1.png";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Hero = () => {
  const { user, setUser, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/user/logout`,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Logged out successfully");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/auth");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const isAdmin =
    user && (user.role === "admin" || user.role === "superadmin");

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-4 py-16 bg-white">
      <img
        src={heroImage}
        alt="hero"
        className="w-40 h-auto mb-6 object-contain"
      />

      {user ? (
        <>
          <h4 className="text-lg font-semibold text-gray-700">
            Hello, {user.name}
          </h4>

          {isAdmin && (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
            >
              Go to Dashboard
            </button>
          )}

          <button
            onClick={logout}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h4 className="text-lg font-semibold text-gray-700">
            Hello, Guest
          </h4>

          <Link
            to="/auth"
            className="mt-2 text-blue-600 hover:underline font-semibold"
          >
            Please login to continue
          </Link>

          <button
            onClick={() => navigate("/auth")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Login
          </button>
        </>
      )}

      <h1 className="mt-8 text-3xl md:text-4xl font-bold text-gray-800">
        Welcome to Cian Health Care
      </h1>
    </div>
  );
};

export default Hero;
