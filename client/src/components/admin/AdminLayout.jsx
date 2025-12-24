import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoute";

const AdminLayout = () => {
  const [showsidebar, setShowsidebar] = useState(false);

  const handleSideBar = () => setShowsidebar(prev => !prev);

  return (
    <AdminProtectedRoute>
      <div className="flex h-screen relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">

        {/* ✅ PASS sidebar prop (VERY IMPORTANT) */}
        <AdminSidebar sidebar={{ showsidebar, handleSideBar }} />

        {/* Mobile Hamburger */}
        <div
          className="lg:hidden absolute top-4 left-4 z-50 cursor-pointer"
          onClick={handleSideBar}
        >
          ☰
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto md:p-10 relative z-10">
          <Outlet />
        </main>

        <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png')] opacity-10"></div>
      </div>
    </AdminProtectedRoute>
  );
};

export default AdminLayout;
