
import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosPeople } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUsersCog, FaUserFriends } from "react-icons/fa";
import { FaIndustry, FaGlobe } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa"; // ✅ Correct import for FaUserCircle
import axios from "axios";
import { toast } from "react-hot-toast";
import { TbArrowBigRightFilled, TbArrowBigLeftFilled } from "react-icons/tb";
import { FcApproval } from "react-icons/fc";
import { FcEngineering } from "react-icons/fc";

const AdminSidebar = ({ sidebar: { showsidebar, handleSideBar } }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [collapsed, setCollapsed] = useState(false); // ✅ collapse state

  // ✅ Check if route is active
  const isActive = (path) => location.pathname === path;

  // ✅ Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/me`, {
          withCredentials: true,
        });
        const userData = res.data?.user;
        setUser(userData);

        if (userData?.role !== "admin") {
          toast.error("Access denied: Admins only");
          navigate("/");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        toast.error("Please login to access this page");
        navigate("/");
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [navigate]);

  // ✅ Sidebar Nav Item
  const NavItem = ({ to, icon, label }) => (
    <Link to={to} onClick={handleSideBar} title={collapsed ? label : ""}>
      <li
        className={`flex items-center ${collapsed ? "justify-center" : "gap-3"
          } px-4 py-3 rounded-lg cursor-pointer transition-all duration-300
        ${isActive(to)
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-[1.02]"
            : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
      >
        <span
          className={`text-xl ${isActive(to) ? "text-white" : "text-indigo-500"
            }`}
        >
          {icon}
        </span>
        {!collapsed && (
          <span
            className={`font-medium ${isActive(to) ? "text-white" : "text-gray-700"
              }`}
          >
            {label}
          </span>
        )}
      </li>
    </Link>
  );

  return (
    <div
      className={`fixed lg:relative top-0 left-0 h-screen ${collapsed ? "w-20" : "w-64"
        } bg-gradient-to-b from-indigo-50 via-white to-purple-50 backdrop-blur-xl border-r border-white/40 shadow-lg transform
      ${showsidebar ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 transition-all duration-300 ease-in-out z-50 `}
    >
      <aside className="h-full flex flex-col justify-between">
        {/* Close Button (Mobile) */}
        <div className="w-full flex justify-end p-4 lg:hidden">
          <button
            onClick={handleSideBar}
            className="text-2xl text-gray-700 hover:text-indigo-600 transition"
          >
            <CgClose />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 pt-2 overflow-y-auto">
          <h1
            onClick={() => setCollapsed((prev) => !prev)} // ✅ collapse toggle
            className={`text-gray-600 font-semibold text-base uppercase mb-4 tracking-wide cursor-pointer flex items-center justify-between ${collapsed ? "justify-center" : ""
              }`}
          >
            {!collapsed ? (
              <>
                CELESTA HEALTHCARE{" "}
                {/* <span className="text-xs text-gray-400 ml-2">
                  (click to collapse)
                </span> */}
                <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-xl shadow-md">
                  <TbArrowBigLeftFilled className="text-white text-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
                </div>

              </>
            ) : (
              <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-xl shadow-md">
                <TbArrowBigRightFilled className="text-white text-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" />
              </div>
            )}
          </h1>

          <ul className="space-y-2">
            <NavItem to="/" icon={<FaHome />} label="Home" />
            <NavItem
              to="/admin/dashboard"
              icon={<MdDashboard />}
              label="Dashboard"
            />
            <NavItem
              to="/admin/products"
              icon={<HiShoppingBag />}
              label="Products"
            />
            <NavItem
              to="/admin/globalclient"
              icon={<FaGlobe />}
              label="Global Client"
            />
            <NavItem
              to="/admin/manufacturers"
              icon={<FaIndustry />}
              label="Manufacturers"
            />
            <NavItem
              to="/admin/customers"
              icon={<IoIosPeople />}
              label="Customers"
            />
            <NavItem
              to="/admin/users"
              icon={<FaUsersCog />}
              label="Users"
            />
          </ul>
        </nav>

        {/* Footer / User Info */}
        {!collapsed && (
          <div className="p-4 text-center text-sm text-gray-500 transition-all duration-300">
            {!loadingUser && user ? (
              <div className="flex flex-col items-center bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-3 shadow-inner">
                <FaUserCircle className="text-4xl text-indigo-500 mb-1" />
                <h2 className="text-gray-800 font-medium text-sm flex items-center justify-center gap-1">
                  {user?.name || "User"} <FcApproval />
                </h2>
                <span className="text-gray-500 text-xs capitalize">
                  {user?.role || "Admin"}
                </span>
              </div>
            ) : (
              !loadingUser && (
                <p className="mt-4 text-xs text-gray-400 italic">
                  No user data available
                </p>
              )
            )}
            <div className="border-t border-gray-200 mt-4 pt-2">
              <p>© {new Date().getFullYear()} Smit Softtech</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default AdminSidebar;
