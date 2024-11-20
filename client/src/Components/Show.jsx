import React, { useEffect,useContext,useState  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comment from './Comment';
import nature from '../assets/nature.jpg'

function Show() {

     const navigate = useNavigate();
     const removeNotes = async(item) => {
          console.log("id "+item );
         
             try{

               const res = await axios.post("http://localhost:8080/removeNote",item );
              
               console.log(res);
               navigate("/");

             }
             catch(e){
               console.log("error in removing "+e);
             }
           }

       
     

     const email = localStorage.getItem('email');


     const location = useLocation()
     const item = location.state.item;

     
     console.log(item);
   
     const user = localStorage.getItem('email');

     const data = {
        email :user
     }
     const a =  item.savedId;
     
     console.log(a); 
    const value =  a == null ? false : a.includes(localStorage.getItem('id')) ? true :false;
    console.log(value);
     const [showNote, setShowNote] = useState(value);
          
     const onClickSave = async(item) =>{
      console.log(user);
      try {
        const res2 = await axios.post('http://localhost:8080/save', {item, data});
        console.log(res2.data.msg);
        navigate('/');
        
       } catch (err) {
         console.log('error in uploading', err);
       }
     }
console.log(email);
console.log(item.creator)

     const [partition, setPartition] = useState(false)
 
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${nature})`,
        backgroundSize: 'cover',
      }}
    >
      <div
        className={`transition-transform duration-500 ease-in-out ${
          partition ? 'translate-x-[-10px]' : 'translate-x-0'
        } bg-white rounded-lg shadow-lg p-6 max-w-md  relative w-3/5`}
      
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${nature})`,
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-2xl text-white font-bold text-center">{item.title}</h2>
        <div className="w-full flex justify-center items-center p-2">
            <img
              src={item.image}
              className="max-h-full max-w-full object-contain "
              alt={item.title}
            />
          </div>
        <div className="overflow-y-auto  mb-4">
          <p className="text-gray-300"><span className="font-bold text-white">Description:</span> {item.desc}</p>
        </div>
        <p className="text-gray-300 mb-4"><span className="font-bold text-white">Note:</span> {item.note}</p>
        <p className="text-gray-300 mb-4"><span className="font-bold text-white">Author:</span> {item.author}</p>

        <div className="flex justify-between items-center mt-4">
  {item.category === "Public" && (
    <>
      <button
        onClick={() => { onClickSave(item); }}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-4 py-2 m-3 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        {showNote ? "Unsave" : "Save"}
      </button>
      <button
        onClick={() => setPartition(!partition)}
        className="bg-gradient-to-r from-gray-900 to-black text-white text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        {partition ? "Close" : "Comments"}
      </button>
    </>
  )}
  {email === item.creator && (
    <div className="flex space-x-3">
      <button
        onClick={() => { editNote(item._id); }}
        className="bg-gradient-to-r from-gray-900 to-black text-white text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <Link to="/edit" state={{ item }}>Edit</Link>
      </button>
      <button
        onClick={() => { removeNotes(item); }}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        Remove
      </button>
    </div>
  )}
</div>

      </div>

  {partition && (
    <div className="w-1/2 pl-4">
      <div>
        <Comment  id = {item._id} />
      </div>
    </div>
  )}
  </div>
  )
}

export default Show

// {(email === item.creator) && (
//   <div>
//     <button onClick={() => { editNote(item._id) }} className="bg-blue-500 text-white px-3 py-1 m-3 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"><Link to={"/edit"} state={{ item: item }}>Edit</Link> </button>
//     <button onClick={() => { removeNotes(item) }} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:bg-blue-600">Remove</button>
//   </div>
// )}