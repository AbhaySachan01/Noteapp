// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import FilterData from './FilterData';
// import Home from './Home';

// export default function Main() {

//      const [publicNotes, setpublicNotes] = useState([]);


//      const [privateNotes , setprivateNotes] = useState([]);


//      const fetchPrivate = async () => {
//        try {
//          const response = await axios.get('http://localhost:8080/allprivate');
//          // Assuming the products array is stored in the response.data property
//          setprivateNotes(response.data);
//        } catch (error) {
//          console.log("error in getting " + error);
//        }
//      };
//      useEffect(()=>{
//        fetchPrivate();
//      },[])
   

  

//      const fetchInfo = async () => {
//        try {
//          const response = await axios.get('http://localhost:8080/allpublic');
//          // Assuming the products array is stored in the response.data property
//          setpublicNotes(response.data);
//        } catch (error) {
//          console.log("error in getting " + error);
//        }
//      };
//      useEffect(()=>{
//        fetchInfo();
//      },[]);



   
//      const [login, setlogin] = useState(localStorage.getItem('token'));
    
   
//      useEffect(() => {
   
//      setlogin(localStorage.getItem('token'));
//      }, [localStorage.getItem('token')]);
   
     
//      const [sort, setSort] = useState('Recent');
//      const [sortArray, setSortArray] = useState([]);
   
//      useEffect(() => {
//        if (sort === 'Old') {
//          setSortArray([...publicNotes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
//        } else if (sort === 'Recent') {
//          setSortArray([...publicNotes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
//        }
//      }, [publicNotes, sort]);
   
//      const changeHandler = (e) => {
//        setSort(e.target.value);
//      };
   
   
   
//      const [searchQuery, setSearchQuery] = useState("");
   
   
//      const filteredItems = sortArray.filter((item) =>
//      item.title.toLowerCase().includes(searchQuery.toLowerCase())
//    );
   
//    const [search , setSearch] = useState(false);
   
//    const onValueChange = (e) =>{
//      setSearchQuery(e.target.value);
//      setSearch(false);
//    }
   
//    const onHandleClick = () =>{
//      setSearch(true);
//      const filteredItems = sortArray.filter((item) =>
//      item.title.toLowerCase().includes(searchQuery.toLowerCase())
//    );
   
//    }

//   return (
// <div>
// <div>
//      <div class="mb-5 max-w-sm"> {/* Set max width for the parent div */}
//   <label for="category" class="mb-3 block text-base font-medium text-[#07074D]">
//     Sort the card
//   </label>
//   <select
//     onChange={changeHandler}
//     value={sort}
//     name="category"
//     id="category"
//     class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//   >
//     <option value="">--Sorted by--</option>
//     <option value="Recent">Recent</option>
//     <option value="Old">Old</option>
//   </select>
// </div>

// <div class="mb-5 max-w-sm">
// <input
//   type="text"
//   value={searchQuery}
//   onChange={(e) => {onValueChange(e)}}
//   placeholder="Search by title..."
//   className="w-full px-3 py-2 mb-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
// />
// <button  onClick={onHandleClick} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Search</button>
// </div></div>

// {
//   !search || searchQuery === "" || filteredItems.length ===0 ? (
//     <>
//      <Home sortArray = {sortArray} filteredItems = {filteredItems}/>
//     </>

      
    
  
//   ):(
//     <>
//       <FilterData item ={filteredItems} />
//     </>
//   )
// }

// </div>)
// }
