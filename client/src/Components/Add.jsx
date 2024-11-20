import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import nature from '../assets/nature.jpg';
import { useNavigate } from 'react-router-dom';

function Add() {
  const notify1 = () => toast.success('Added successfully');
  const navigate = useNavigate();
  const initial = {
    title: "",
    desc: "",
    category: "Public",
    note: "",
    author: "",
    creator: localStorage.getItem('email'),
    image: "",
  };

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState(initial);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    let response;
    let product = productDetails;

    try {
      const formData = new FormData();
      formData.append('product', image);

      if (image) {
        const res1 = await axios.post('http://localhost:8080/upload', formData);
        response = res1.data.image_url;
        product.image = response;
      }

      const res2 = await axios.post('http://localhost:8080/addnotes', product);
      notify1();
      navigate('/');
    } catch (err) {
      console.log('error in uploading', err);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${nature})`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-[500px] mt-16 bg-white bg-opacity-10 p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-white">
              Note Title:
            </label>
            <input
              value={productDetails.title}
              onChange={changeHandler}
              type="text"
              name="title"
              id="title"
              placeholder="Enter the title"
              className="w-full rounded-md border border-gray-500 bg-transparent py-2 px-4 text-sm font-medium text-white outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="desc" className="mb-1 block text-sm font-medium text-white">
              Note Description:
            </label>
            <input
              value={productDetails.desc}
              onChange={changeHandler}
              type="text"
              name="desc"
              id="desc"
              placeholder="Enter the description"
              className="w-full rounded-md border border-gray-500 bg-transparent py-2 px-4 text-sm font-medium text-white outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="note" className="mb-1 block text-sm font-medium text-white">
              Note:
            </label>
            <textarea
              value={productDetails.note}
              onChange={changeHandler}
              name="note"
              id="note"
              placeholder="Enter your note"
              rows="4"
              className="w-full rounded-md border border-gray-500 bg-transparent py-2 px-4 text-sm font-medium text-white outline-none focus:border-purple-500"
            />
          </div>


          <div className="mb-3">
            <label htmlFor="category" className="mb-1 block text-sm font-medium text-white">
              Choose Category:
            </label>
            <select
              onChange={changeHandler}
              value={productDetails.category}
              name="category"
              id="category"
              className="w-full rounded-md border border-gray-500 bg-transparent py-2 px-4 text-sm font-medium text-gray-400 outline-none focus:border-purple-500"
            >
              <option value="">--Please choose an option--</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="author" className="mb-1 block text-sm font-medium text-white">
              Author:
            </label>
            <input
              value={productDetails.author}
              onChange={changeHandler}
              type="text"
              name="author"
              id="author"
              placeholder="Enter the author's name"
              className="w-full rounded-md border border-gray-500 bg-transparent py-2 px-4 text-sm font-medium text-white outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-white">
              Upload File:
            </label>

            <div className="flex flex-col items-center justify-center">
              <input onChange={imageHandler} type="file" name="file" id="file" className="sr-only" />
              <label
                htmlFor="file"
                className="relative flex items-center justify-center w-full h-[100px] rounded-md border border-dashed border-gray-500 bg-transparent p-6 text-center text-white cursor-pointer"
              >
                {image ? (
                  <div>
                    <img src={URL.createObjectURL(image)} alt="Preview" className="max-h-full max-w-full rounded-md" />
                  </div>
                ) : (
                  <div>
                    <span className="block text-sm font-medium">Drop files here</span>
                    <span className="block text-xs font-light">Or click to browse</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <button
              onClick={addProduct}
              className="hover:shadow-form w-full rounded-md bg-purple-600 py-2 px-6 text-sm font-semibold text-white outline-none"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Add;
