import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt} from "react-icons/fa";
import {ProductData} from '../../context/ProductContext';
import axios from 'axios'


const UploadProduct = ({onClose}) => {

  const {fetchAdminProducts} = ProductData();
 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [file, setFile] = useState(null);
  const [colors, setSelectedColors] = useState([]);
  const [size, setSelectedSize] = useState([]);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };


  
  // List of colors
  const colorsarr = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
  const sizearr = [ 'S' , 'M',  'L', 'XL', 'XXL'];


  // Handle checkbox change
  const handleCheckboxChange = (color) => {
    setSelectedColors((prev) =>
        prev.includes(color)? prev.filter((item) => item !== color) : [...prev, color] // Add color
    );

  };

  const handleSizeCheckboxChange = (size) => {
    setSelectedSize((prev) =>
        prev.includes(size)? prev.filter((item) => item !== size) : [...prev, size] // Add color
    );

  };





  {/**upload product */}
  const handleSubmit = async (e) =>{
    e.preventDefault()

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('colors', colors);
    formData.append('size', size);
    formData.append
    if (file) {
      formData.append('image', file);
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER}/api/product/new`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.message) {
        alert(data.message);
        // fetchAdminProducts();
           setTitle("");
           setDescription("");
           setStock("");
           setPrice("");
           setCategory("");
           setFile(null);
           fetchAdminProducts();
           console.log("Slected colors", colors);
      console.log("Selected size", size);
           onClose();
      }
    } catch (error) {
      console.log("Slected colors", colors);
      console.log("Selected size", size);
      alert(error.response.data.message);

    }
  }


  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
       <div className='bg-white p-4 rounded w-full max-w-2xl h-full mt-10 max-h-[80%] overflow-hidden logincontainer'>

            <div className='flex justify-between items-center pb-3 '>
                <h2 className='font-bold text-lg'>Upload Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer ' onClick={onClose}>
                    <CgClose/>
                </div>
            </div>

          <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
            <label htmlFor='productName'>Product Name :</label>
            <input 
              type='text' 
              id='productName' 
              placeholder='enter product name' 
              name='title'
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className='p-2 bg-slate-100 border rounded inputbox'
              required
            />


            <label htmlFor='productName'>Product Category :</label>
            <input 
              type='text' 
              id='productcategory' 
              placeholder='enter product category' 
              name='category'
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className='p-2 bg-slate-100 border rounded inputbox'
              required
            />


          <label htmlFor='stock' className='mt-3'>Product stock :</label>
              <input 
                type='text' 
                id='stock' 
                placeholder='enter available stock' 
                value={stock} 
                name='stock'
                onChange={(e) => setStock(e.target.value)} 
                className='p-2 bg-slate-100 border rounded inputbox'
                required
              />


              <label htmlFor='productImage' className='mt-3'>Product Image :</label>
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer inputbox'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                          <span className='text-4xl'><FaCloudUploadAlt/></span>
                          <p className='text-sm'>Upload Product Image</p>
                          <input type='file' id='uploadImageInput'  className='hidden'  onChange={handleFileChange}/>
                        </div>
              </div>
              </label> 
              

              <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='text' 
                id='price' 
                placeholder='enter price' 
                value={price} 
                name='price'
                onChange={(e) => setPrice(e.target.value)}
                className='p-2 bg-slate-100 border rounded inputbox'
                required
              />

            <label htmlFor='category' className='mt-3 '>Colors :</label>
              <div required  name='category' className='p-2 bg-slate-100 border rounded inputbox'>
                  {
                    colorsarr.map((color,index)=>{
                      return(
                        <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={color}
                  checked={colors.includes(color)}
                  onChange={() => handleCheckboxChange(color)}
                  className="mr-2"
                />
                <label htmlFor={color} className="text-gray-700">
                  {color}
                </label>
              </div>
                      
                      )
                    })
                  }
              
              </div>



            <label htmlFor='category' className='mt-3 '>Size :</label>
              <div required  name='category' className='p-2 bg-slate-100 border rounded inputbox'>
                  {
                    sizearr.map((sizeitem,index)=>{
                      return(
                        <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={sizeitem}
                  checked={size.includes(sizeitem)}
                  onChange={() => handleSizeCheckboxChange(sizeitem)}
                  className="mr-2"
                />
                <label htmlFor={size} className="text-gray-700">
                  {sizeitem}
                </label>
              </div>
                      
                      )
                    })
                  }
              
              </div>


      


              <label htmlFor='sellingPrice' className='mt-3'>Product Sold :</label>
              <input 
                type='text' 
                id='sellingPrice' 
                placeholder='enter sold products' 
                name='sold'
                className='p-2 bg-slate-100 border rounded inputbox'
                required
              />

              <label htmlFor='description' className='mt-3'>Description :</label>
              <textarea 
                className='h-28 bg-slate-100 border rounded resize-none p-1 inputbox' 
                placeholder='enter product description' 
                rows={3} 
                onChange={(e) => setDescription(e.target.value)} 
                name='description'
                value={description}
              >
              </textarea>





              <button className='px-3 py-2  mb-10 addtocartbtn border-slate-300 bg-slate-100 text-black rounded border hover:border hover:border-black'>Upload Product</button>
          </form> 



      
       </div>

    </div>
  )
}

export default UploadProduct