import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GlobalProductForm from "./GlobalProductForm";

const EditGlobalProduct = ({ fetchProducts }) => {
  const { id } = useParams(); // get :id from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/globalproducts/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        alert("Product not found");
        navigate("/admin/globalproducts");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <GlobalProductForm
      editProduct={product}
      fetchProducts={fetchProducts}
      onCancelEdit={() => navigate("/admin/globalproducts")}
    />
  );
};

export default EditGlobalProduct;
