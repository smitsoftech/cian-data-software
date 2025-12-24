import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditManufacturer = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/api/manufacturers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ Set only the actual form data
        setFormData(prev => ({
          ...prev,
          ...data.data
        }));
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_SERVER}/api/manufacturers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) alert("✅ Manufacturer updated!");
    else alert("❌ Update failed");
  };

  // Loader until data loads
  if (!formData) return <p className="p-6 text-lg font-medium">⏳ Loading manufacturer data...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-3">✏️ Edit Manufacturer</h1>

      {/* Now place same form here with value={formData[key]} */}
    </div>
  );
};

export default EditManufacturer;
