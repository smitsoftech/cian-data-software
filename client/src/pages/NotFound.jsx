import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-700 relative overflow-hidden">
      {/* Soft background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png')] opacity-10"></div>

      {/* Floating icon */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      {/* Main content */}
      <div className="z-10 text-center p-6">
        <FaExclamationTriangle className="text-6xl text-indigo-500 mx-auto mb-4" />
        <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you’re looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          <FaArrowLeft />
          Back to Home
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Smit Softtech Pvt. Ltd.
      </div>
    </div>
  );
};

export default NotFound;
