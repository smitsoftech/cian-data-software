import React from "react";
import { Link } from "react-router-dom";
import fb from "../assets/fb.png";
import yt from "../assets/yt.png";
import git from "../assets/git.png";
import linkedin from "../assets/linkedin.png";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white px-5 py-10">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo / Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-2">
            Cian Health Care
          </h2>
          <p className="text-base opacity-90">
            {/* Optional description */}
          </p>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">
            {/* Optional heading */}
          </h3>

          <div className="flex justify-center gap-4">
            <Link
              to="https://facebook.com/"
              target="_blank"
              className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center hover:scale-110 transition"
            >
              <img src={fb} alt="Facebook" className="w-8 h-8" />
            </Link>

            <Link
              to="https://www.youtube.com"
              target="_blank"
              className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center hover:scale-110 transition"
            >
              <img src={yt} alt="YouTube" className="w-8 h-8" />
            </Link>

            <Link
              to="https://www.linkedin.com/"
              target="_blank"
              className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center hover:scale-110 transition"
            >
              <img src={linkedin} alt="LinkedIn" className="w-8 h-8" />
            </Link>

            <Link
              to="https://github.com"
              target="_blank"
              className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center hover:scale-110 transition"
            >
              <img src={git} alt="GitHub" className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 pt-4 border-t border-white/30 text-center text-sm opacity-90 leading-7">
        <p>© 2025 Cian Health Care. All Rights Reserved.</p>
        <p>Designed by SMIT Softech Pvt Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;
