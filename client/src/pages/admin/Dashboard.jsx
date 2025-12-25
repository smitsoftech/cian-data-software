
import React, { useState, useEffect } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import CountUp from "react-countup";
import { FaBoxOpen, FaUsers, FaGlobe, FaShoppingBag } from "react-icons/fa";
import { ImOffice } from "react-icons/im";
import ExportToImage from '../../components/ExportToImage';

const Dashboard = () => {

  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    globalClients: 0,
    manufacturers: 0,
  });

  const [recentProducts, setRecentProducts] = useState([]);
  const [recentManufacturers, setRecentManufacturers] = useState([]);
  const [recentGlobalClients, setRecentGlobalClients] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const baseURL = import.meta.env.VITE_SERVER;

        // Fetch all simultaneously
        const [
          productsRes,
          usersRes,
          globalClientRes,
          ordersRes,
          manufacturersRes,
        ] = await Promise.all([
          axios.get(`${baseURL}/api/v1/products`, { withCredentials: true }),
          axios.get(`${baseURL}/api/v1/user/users`, { withCredentials: true }),
          axios.get(`${baseURL}/api/globalproducts/allget`, {
            withCredentials: true,
          }),
          axios.get(`${baseURL}/api/v1/order`, { withCredentials: true }),
          axios.get(`${baseURL}/api/manufacturers/all`, {
            withCredentials: true,
          }),
        ]);

        // ✅ Safely extract arrays
        const products = productsRes.data?.products || [];
        const users = usersRes.data?.users || [];
        const globalClients = globalClientRes.data?.products || [];
        const manufacturers = manufacturersRes.data?.data || [];
        const orders = ordersRes.data?.orders || [];

        // ✅ Update stats
        setStats({
          products: products.length,
          users: users.length,
          orders: orders.length,
          globalClients: globalClients.length,
          manufacturers: manufacturers.length,
        });

        // ✅ Sort by date descending (latest first)
        const sortedProducts = [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const sortedManufacturers = [...manufacturers].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const sortedGlobalClients = [...globalClients].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const sortedUsers = [...users].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // ✅ Take latest 10 / 5 items
        setRecentProducts(sortedProducts.slice(0, 10));
        setRecentManufacturers(sortedManufacturers.slice(0, 5));
        setRecentGlobalClients(sortedGlobalClients.slice(0, 5));
        // setRecentUsers(sortedUsers.slice(0, 5));
        setRecentUsers(users.slice(-5).reverse());
        

      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex h-screen relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Sidebar */}
  

      

      {/* Main Dashboard */}
      <main className="flex-1 overflow-y-auto  md:p-10 relative z-10">
        <div id="dashboard-export" className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-200 to-purple-200 p-6 rounded-2xl shadow-lg mb-10 border border-white/60 backdrop-blur-md">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide">
            🌤️ Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">
            Manage platform analytics, performance, and insights
          </p>
        </div>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          <WidgetItem
            heading="Total Products"
            value={stats.products}
            gradient="from-violet-100 to-violet-200"
            border="border-violet-300"
            icon={<FaBoxOpen className="text-3xl text-violet-600" />}
          />

          <WidgetItem
            heading="Manufacturers"
            value={stats.manufacturers}
            gradient="from-green-100 to-green-200"
            border="border-green-300"
            icon={<ImOffice className="text-3xl text-green-600" />}
          />

          <WidgetItem
            heading="Global Clients"
            value={stats.globalClients}
            gradient="from-pink-100 to-pink-200"
            border="border-pink-300"
            icon={<FaGlobe className="text-3xl text-pink-600" />}
          />

          <WidgetItem
            heading="Total Users"
            value={stats.users}
            gradient="from-sky-100 to-sky-200"
            border="border-sky-300"
            icon={<FaUsers className="text-3xl text-sky-600" />}
          />
        </section>

        {/* Recently Added Section */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">
            🕒 Recently Added
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <RecentList
              title="Latest Products"
              items={recentProducts}
              keyField="name"
              color="text-violet-600"
            />
            <RecentList
              title="Latest Manufacturers"
              items={recentManufacturers}
              keyField="manufacturerName"
              color="text-green-600"
            />
            <RecentList
              title="Latest Global Clients"
              items={recentGlobalClients}
              keyField="productName"
              color="text-pink-600"
            />
            <RecentList
              title="Latest Users"
              items={recentUsers}
              keyField="name"
              color="text-sky-600"
            />
          </div>
        </section>
        </div>

        {/* <div className="mt-4 flex gap-2 justify-end">
          <ExportToImage elementId="dashboard-export" fileName="celesta-dashboard" />
        </div> */}
      </main>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dot-grid.png')] opacity-10"></div>
    </div>
  );
};

/* ✨ Widget with CountUp Animation */
const WidgetItem = ({ heading, value, icon, gradient, border }) => (
  <article
    className={`relative overflow-hidden bg-gradient-to-br ${gradient} p-5 rounded-2xl border ${border} shadow-md flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-md`}
  >
    <div>
      <h4 className="text-gray-600 text-sm font-medium uppercase tracking-wider">
        {heading}
      </h4>
      <p className="text-4xl font-bold mt-2 text-gray-800">
        <CountUp end={value} duration={1.5} separator="," />
      </p>
    </div>
    <div className="bg-white/70 p-3 rounded-full shadow-sm">{icon}</div>
  </article>
);

/* 🕒 Recently Added Component */
//
const RecentList = ({ title, items, keyField, color }) => (
  <div className="bg-white/70 backdrop-blur-md shadow-md rounded-2xl p-5 border border-gray-200">
    <h3 className={`font-semibold mb-3 text-lg ${color}`}>{title}</h3>
    {items?.length > 0 ? (
      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {items.map((item, index) => (
          <li
            key={index}
            className="bg-gray-50 hover:bg-gray-100 p-2 rounded-md shadow-sm text-sm text-gray-700 truncate"
            title={item[keyField]}
          >
            {index + 1}. {item[keyField] || "—"}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 italic text-sm">No recent records found</p>
    )}
  </div>
);

export default Dashboard;

