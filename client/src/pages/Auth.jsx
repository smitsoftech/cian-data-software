import React from "react";
import Login from "../components/Login";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl text-center">
        <Login />
      </div>
    </div>
  );
};

export default Auth;
