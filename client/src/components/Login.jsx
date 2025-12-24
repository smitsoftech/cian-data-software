import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/login`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Login
      </h2>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Forgot Password */}
      <div className="text-right">
        <Link
          to="/password/forgot"
          className="text-sm text-gray-500 hover:text-black underline transition"
        >
          Forgot your password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-black hover:bg-green-600 text-white rounded-md text-base font-medium transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
