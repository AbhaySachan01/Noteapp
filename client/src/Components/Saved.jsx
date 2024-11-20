import React, { useEffect, useState,useContext  } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import nature from '../assets/nature.jpg'
import Context from './Context';

function Saved() {

  const {login} = useContext(Context);
     const [saved, setSaved] = useState([]);

     const id = localStorage.getItem('id');
     const detail = {
      Id : id
     }

     const fetchSaved = async () => {
       try {
         const response = await axios.post('http://localhost:8080/allsaved' , {detail});
         // Assuming the products array is stored in the response.data property
         setSaved(response.data);
       } catch (error) {
         console.log("error in getting " + error);
       }
     };
     useEffect(()=>{
       fetchSaved();
     },[])

     const [sort, setSort] = useState('Recent');
     const changeHandler = (e) => {
       setSort(e.target.value);
     };
   
     const [sortArray, setSortArray] = useState([]);
     useEffect(() => {
       if (sort === 'Old') {
         setSortArray([...saved].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
       } else if (sort === 'Recent') {
         setSortArray([...saved].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
       }
     }, [saved, sort]);
   
     // ------------------Searching---------------------------------------------------------------
     const [searchQuery, setSearchQuery] = useState("");
     const [filteredItems, setFilteredItems] = useState([]);
   
     const onValueChange = (e) => {
       const query = e.target.value;
       setSearchQuery(query);
       setFilteredItems(() =>
         sortArray.filter((item) =>
           item.title.toLowerCase().includes(query.toLowerCase())
         )
       );
     };
   
     return (
       <section
         className="min-h-screen "
         style={{
           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${nature})`,
           backgroundSize: "cover",
          
         }}
       >
        <div className="flex flex-col items-center pt-24 px-4 md:px-6 lg:px-8">
     <div className="flex flex-wrap justify-center">
       <div className="m-3 max-w-sm">
         <label htmlFor="category" className="mb-3 block text-base font-medium text-white">
           Sort the card
         </label>
         <select
           onChange={changeHandler}
           value={sort}
           name="category"
           id="category"
           className="w-full px-3 py-2 mb-3 text-normal rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
         >
           <option value="">--Sorted by--</option>
           <option value="Recent">Recent</option>
           <option value="Old">Old</option>
         </select>
       </div>
   
       <div className="m-3 max-w-sm">
         <label htmlFor="search" className="mb-3 block text-base font-medium text-white">
           Search by title
         </label>
         <input
           type="text"
           value={searchQuery}
           id="search"
           onChange={onValueChange}
           placeholder="Search by title..."
           className="w-full px-3 py-2 mb-3 text-normal rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
         />
       </div>
     </div>
   
     {filteredItems.length === 0 && searchQuery !== "" ? (
       <div className="border border-gray-300 rounded-md text-2xl font-bold p-4 my-4 max-w-md flex items-center">
         <div>No item</div>
       </div>
     ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full max-w-screen-lg">
       {searchQuery === "" ? (
         sortArray.map((item, key) => (
           <div key={key} className="shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 p-2 m-4"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${nature})`,
             backgroundSize: "cover",
            
           }}>
             <div className="w-full h-40 flex justify-center items-center p-2">
               <img
                 src={item.image}
                 className="max-h-full max-w-full object-contain "
                 alt={item.title}
               />
             </div>
             <div className="p-4">
               <div className=" font-extrabold mb-2 text-[#f8f9fa] text-2xl">{item.title}</div>
               <div className="text-md text-[#adb5bd] mb-4 leading-relaxed ">{item.desc}</div>
               <div className="text-center flex justify-between items-center">
               <button className="bg-gradient-to-r from-gray-900 to-black text-white font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg transition-all">
                 {login ? (
                               <Link to={"/show"} state={{ item: item}}>Show</Link>
                             ) : (
                               <Link to="/login">Show</Link>
                             )}
                 </button>
                 <div>
                   {/* <LikeButton id={item._id} /> */}
                 </div>
               </div>
             </div>
           </div>
         ))
       ) : (
         <FilterData item={filteredItems} />
       )}
       </div>
     )}
   </div>
   
   
       </section>
     );
   }
export default Saved
