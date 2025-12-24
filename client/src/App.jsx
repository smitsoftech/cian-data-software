import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Context } from "./main";

/* Common */
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ScrollToTop from "./pages/ScrollToTop";
import WhatsAppWidget from "./components/WhatsAppWidget";

/* Auth & Public Pages */
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";
import Comingsoon from "./pages/Comingsoon";
import NotFound from "./pages/NotFound";

// product 
import NewProductForm from "./components/admin/NewProductForm";
import NewEditProduct from "./components/admin/NewEditProduct";

/* Vendor / User Pages */
import Medicines from "./pages/Medicines";
import Wellness from "./pages/Wellness";
import Beauty from "./pages/Beauty";
import Veterinary from "./pages/Veterinary";


/* Admin */
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Customers from "./pages/admin/UserList";
import EditProduct from "./pages/admin/EditProduct";


/* Manufacturer */
import ManufacturerList from "./pages/admin/ManufacturerList";
import ManufacturerForm from "./pages/admin/ManufacturerForm";
import ViewManufacturer from "./pages/admin/ViewManufacturer";

/* Customer */
import CustomerList from "./pages/admin/CustomerList";
import CustomerForm from "./pages/admin/CustomerForm";
import ViewCustomer from "./pages/admin/ViewCustomer";

/* Global Client */
import GlobalProduct from "./components/Globalclient/GlobalProduct";
import GlobalProductDetail from "./components/Globalclient/GlobalProductDetail";
import GlobalProductForm from "./components/Globalclient/GlobalProductForm";
import EditGlobalProduct from "./components/Globalclient/EditGlobalProduct";
import ReadyDossierList from "./components/Globalclient/ReadyDossierList";
import GlobalClientProduct from "./pages/admin/GlobalClientProduct";

import AdminLayout from "./components/admin/AdminLayout";

const App = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/me`,
          { withCredentials: true }
        );
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    getUser();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <MainContent />
      <ToastContainer theme="colored" />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <WhatsAppWidget />} */}

      <Routes>

        <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="products" element={<Products />} />
    <Route path="globalclient" element={<GlobalClientProduct />} />
    <Route path="manufacturers" element={<ManufacturerList />} />
    <Route path="customers" element={<CustomerList />} />
    <Route path="users" element={<Customers />} />
  </Route>




        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/comingsoon" element={<Comingsoon />} />

        <Route
          path="/otp-verification/:email/:phone"
          element={<OtpVerification />}
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* User */}
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/veterinary" element={<Veterinary />} />
        

        {/* Global Client */}
        <Route path="/globalclient" element={<GlobalProduct />} />
        <Route
          path="/globalclient/Productadd"
          element={<GlobalProductForm />}
        />
        <Route path="/globalproduct/:id" element={<GlobalProductDetail />} />
        <Route path="/readydossierlist" element={<ReadyDossierList />} />

        {/* Admin */}
        {/* <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <Products />
            </AdminProtectedRoute>
          }
        />
    
        
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <Customers />
            </AdminProtectedRoute>
          }
        /> */}

        {/* Manufacturer */}
        {/* <Route
          path="/admin/manufacturers"
          element={
            <AdminProtectedRoute>
              <ManufacturerList />
            </AdminProtectedRoute>
          }
        /> */}
        <Route
          path="/admin/manufacturers/add"
          element={<ManufacturerForm mode="add" />}
        />
        <Route
          path="/admin/manufacturers/edit/:id"
          element={<ManufacturerForm mode="edit" />}
        />
        <Route
          path="/admin/manufacturers/view/:id"
          element={<ViewManufacturer />}
        />

        {/* Customers */}
        {/* <Route
          path="/admin/customers"
          element={
            <AdminProtectedRoute>
              <CustomerList />
            </AdminProtectedRoute>
          }
        /> */}
        <Route
          path="/admin/customers/add"
          element={<CustomerForm mode="add" />}
        />
        <Route
          path="/admin/customers/edit/:id"
          element={<CustomerForm mode="edit" />}
        />
        <Route
          path="/admin/customers/view/:id"
          element={<ViewCustomer />}
        />

        {/* product */}
        
        <Route path="/newaddproduct" element={<NewProductForm />} />
        <Route path="/newaddproduct/edit/:id" element={<NewEditProduct />} />
        {/* Global Admin */}
        <Route
          path="/admin/globalclient"
          element={
            <AdminProtectedRoute>
              <GlobalClientProduct />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/globalproducts/edit/:id"
          element={<EditGlobalProduct />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* {!isAdminRoute && <Footer />} */}
    </>
  );
};

export default App;
