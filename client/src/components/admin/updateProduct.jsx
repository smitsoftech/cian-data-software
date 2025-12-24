import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import axios from 'axios';
import { ProductData } from '../../context/ProductContext';

const UpdateProduct = ({ onClose, productDetails }) => {
  const { fetchAdminProducts } = ProductData();

  const [data, setData] = useState({
    ...productDetails,
    stock: productDetails?.stock,
  });

  const [updatedStock, setUpdatedStock] = useState(0);

  const handleOnChange = (e) => {
    setUpdatedStock(e.target.value);
    console.log("updated stock", updatedStock);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = productDetails._id;

    const updatedData = { stock: updatedStock };

    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER}/api/product/updatestock/${id}`, updatedData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (response.data.message) {
        alert(response.data.message);
        fetchAdminProducts();
        onClose();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-lg h-full max-h-[80%] overflow-y-auto shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='font-bold text-xl'>Update Product</h2>
          <button
            className='text-2xl text-gray-600 hover:text-red-600 transition-colors'
            onClick={onClose}
          >
            <CgClose />
          </button>
        </div>

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='stock' className='block text-sm font-medium text-gray-700'>
              Current Stock
            </label>
            <input
              type='text'
              id='stock'
              value={data.stock}
              name='stock'
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 cursor-not-allowed'
              readOnly
            />
          </div>

          <div>
            <label htmlFor='updatedStock' className='block text-sm font-medium text-gray-700'>
              Updated Stock
            </label>
            <input
              type='number'
              id='updatedStock'
              placeholder='Enter updated stock quantity'
              value={updatedStock}
              name='updatedStock'
              onChange={handleOnChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              className='px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 transition-colors'
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
