import React, { useContext, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";

const OtpVerification = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const { email, phone } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    try {
      const enteredOtp = otp.join("");
      const payload = { email, phone, otp: enteredOtp };

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/user/otp-verification`,
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          OTP Verification
        </h1>

        <p className="text-gray-600 mb-6 text-sm">
          Enter the 5-digit OTP sent to your registered email or phone.
        </p>

        <form onSubmit={handleOtpVerification} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-xl text-center border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-green-500 focus:bg-white transition"
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
