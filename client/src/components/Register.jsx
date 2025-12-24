import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      const payload = {
        ...data,
        phone: `+91${data.phone}`,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/register`,
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message);
      navigate(`/otp-verification/${payload.email}/${payload.phone}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Register
      </h2>

      {/* Name */}
      <div>
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <div className="flex">
          <span className="px-4 py-3 border border-r-0 rounded-l-md bg-gray-100 text-gray-600">
            +91
          </span>
          <input
            type="number"
            placeholder="Phone"
            {...register("phone", { required: "Phone is required" })}
            className="w-full px-4 py-3 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Verification Method */}
      <div>
        <p className="text-gray-600 font-medium mb-2">
          Select Verification Method
        </p>

        <div className="flex gap-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="email"
              {...register("verificationMethod", {
                required: "Select verification method",
              })}
            />
            Email
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="phone"
              {...register("verificationMethod", {
                required: "Select verification method",
              })}
            />
            Phone
          </label>
        </div>

        {errors.verificationMethod && (
          <p className="text-sm text-red-500 mt-1">
            {errors.verificationMethod.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 bg-black hover:bg-green-600 text-white rounded-md text-base font-medium transition"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
