import React, { useState ,useContext  } from 'react';
import axios from 'axios';
import {useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit() {

     const location = useLocation()
     const item = location.state.item;

     const initial = {
          title :item.title,
          desc : item.desc,                                                  
          category :item.category,
          note : item.note,
          author:item.author,
          creator : item.creator,
          image : item.image,
         }

         const [image, setImage] = useState(false);
   
         
       
         const imageHandler = (e) =>{
          console.log(e.target.files)
                   setImage(e.target.files[0]);
         }
    
         const [NoteDetails, setNoteDetails] = useState(initial);
    
         const changeHandler = (e) => {
          setNoteDetails({
            ...NoteDetails,
            [e.target.name]: e.target.value 
          });
        };
        
     const navigate = useNavigate();
     
     const updateNote = async (id, e) => {
      // e.preventDefault();
      let response;
      let note = NoteDetails;
      note.image  = "";
      console.log(note);
    
      try {
        const formData = new FormData();
        formData.append('note', image);
          console.log(formData);
        if (image) {
          const res1 = await axios.post('http://localhost:8080/upload', formData);
          response = res1.data.image_url;
          note.image = response;
        }
        console.log(image);
    
        console.log(note);
        // const res2 = await axios.put(`http://localhost:8080/update/${id}`, note);
        // console.log(res2);
        navigate('/');
      } catch (err) {
        console.log('error in updating', err);

      }
    };
    
    
    
    

  return (
    <div>
<div>
      <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px] bg-white">
            <div class="mb-5">
              <label
                for="title"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Note Title:
              </label>
              <input
              value ={NoteDetails.title}
              onChange={changeHandler}
                type="text"
                name="title"
                id="title"
                placeholder="ABC"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div class="mb-5">
            <label
                for="desc"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Note Desc:
              </label>
              <input
              value ={NoteDetails.desc}
              onChange={changeHandler}
                type="text"
                name="desc"
                id="desc"
                placeholder="ABC"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="mb-5">
            <label
                for="note"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Note:
              </label>
              <input
              value ={NoteDetails.note}
              onChange={changeHandler}
                type="text"
                name="note"
                id="note"
                placeholder="ABC"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div class="mb-5">
              <label
                for="category"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Choose Category
              </label>
              <select
              onChange={changeHandler}
              value ={NoteDetails.category}
                name="category"
                id="category"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">--Please choose an option--</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div class="mb-5">
            <label
                for="author"
                class="mb-3 block text-base font-medium text-[#07074D]"
              >
                Author:
              </label>
              <input
              value ={NoteDetails.author}
              onChange={changeHandler}
                type="text"
                name="author"
                id="auhtor"
                placeholder="ABC"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
               </div>


               <div class="mb-6 pt-4">
              <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload File
              </label>

              <div className="mb-8">
    <input onChange={imageHandler} type="file" name="file" id="file" className="sr-only" />
    <label
      htmlFor="file"
      className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
    >
      {image ? (
        <div>
          <img src={URL.createObjectURL(image)} alt="Preview" className="max-h-full max-w-full" />
        </div>
      ) : (
        <div>
          <span className="mb-2 block text-xl font-semibold text-[#07074D]">Drop files here</span>
          <span className="mb-2 block text-base font-medium text-[#6B7280]">Or</span>
          <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">Browse</span>
        </div>
      )}
    </label>
  </div>
            </div>


          

            <div>
              <button  onClick={()=>{updateNote(item._id)}} class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Update Note😄
              </button>
            </div>
        </div>
      </div>
    </div>
      
    
      
    </div>
  )
}

export default Edit