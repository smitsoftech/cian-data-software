import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/api/v1/user/me`,
          { withCredentials: true }
        );

        const user = res.data?.user;

        if (user?.role === "admin") {
          setIsAdmin(true);
        } else {
          toast.error("Access denied: Admins only");
          navigate("/");
        }
      } catch (error) {
        toast.error("Please login to access admin panel");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-lg font-semibold">Checking admin access...</span>
      </div>
    );
  }

  return isAdmin ? children : null;
};

export default AdminProtectedRoute;
