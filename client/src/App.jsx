import React, { useEffect, useState,useContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import Add from './Components/Add';
import Show from './Components/Show';
import Personal from './Components/Personal';
import Errorpage from './Components/Errorpage';
import Edit from './Components/Edit';
import Saved from './Components/Saved';
import Context from './Components/Context';
import Registration from './Components/Registration';



function App() {
  const { login } = useContext(Context);

  return (
    <div>
      <Navbar />
       {/* Add padding to top */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/regis" element={<Registration />} />

          {login ? (
            <>
              <Route path="/add" element={<Add />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/show" element={<Show />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/edit" element={<Edit />} />
            </>
          ) : (
            <Route path="*" element={<Errorpage />} />
          )}
        </Routes>
     
      <ToastContainer />
    </div>
  );
}

export default App;
