import React, { useEffect, useState ,useContext  } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';  
import Context from './Context';
import nature from '../assets/nature.jpg'
function FilterData({ item }) {
  
  const {login} = useContext(Context);

  
  return (
    <div >
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full max-w-screen-lg">
  {item.map((i, key) => {
    return (
      (i.category === "Public" || i.creator === localStorage.getItem('email')) && (
        <div key={key} className="shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 p-2 m-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${nature})`,
          backgroundSize: "cover",
         
        }}>
          <div className="w-full h-40 flex justify-center items-center p-2">
            <img
              src={i.image}
              className="max-h-full max-w-full object-contain "
              alt={i.title}
            />
          </div>
          <div className="p-4">
            <div className=" font-extrabold mb-2 text-[#f8f9fa] text-2xl">{i.title}</div>
            <div className="text-md text-[#adb5bd] mb-4 leading-relaxed ">{i.desc}</div>
            <div className="text-center flex justify-between items-center">
            <button className="bg-gradient-to-r from-gray-900 to-black text-white font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg transition-all">
              {login ? (
                            <Link to={"/show"} state={{ item: item}}>Show</Link>
                          ) : (
                            <Link to="/login">Show</Link>
                          )}
              </button>
              <div>
                <LikeButton id={i} />
              </div>
            </div>
          </div>
        </div>




        // <div key={key} className="border border-gray-300 rounded-md p-4 my-4 max-w-md flex items-center">
        //           <img src={i.image} className="rounded-md w-1/3 h-auto mr-4" alt={i.title} />
        //           <div className="flex-1">
        //            <div className="text-lg font-bold mb-2">{i.title}</div>
        //            <div className="text-gray-700 mb-4">{i.desc}</div>
        //            <div className="text-center">
        //                 <button onClick={() => handleShowFull(i)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        //                   {login ? (
        //                     <Link to={"/show"} state={{ item: i}}>Show</Link>
        //                   ) : (
        //                     <Link to="/login">Show</Link>
        //                   )}
        //                 </button>
        //               </div>
        //             </div>
        //           </div>
      )
    );
  })}
</div>

    </div>
  );
}

export default FilterData;
