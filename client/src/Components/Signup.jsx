import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import nature from '../assets/nature.jpg';

export default function Signup() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const showPasswordHandler = (event) => {
    let checked = event.target.checked;
    setIsPasswordShown(checked);
  };

  const [formState, setFormState] = useState('login');
  const [data, setData] = useState({ name: '', username: '', email: '', password: '' });

  const [load, setLoad] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onClickHandler = (state) => {
    setFormState(state);
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    setLoad(true);
    // Simulate a signup process
    setTimeout(() => {
      setLoad(false);
      alert('Account has been created successfully.');
      onClickHandler('login');
    }, 1000);
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    setLoad(true);
    // Simulate a login process
    setTimeout(() => {
      setLoad(false);
      alert('Login successfully.');
      // Navigate to home or any other action
    }, 1000);
  };

  const notify1 = () => toast.success("SignUp successfully");
  const notify2 = (msg) => toast.info(msg);
  const initialValue = {
    name: '',
    username: '',
    email: '',
    password: ''
  }

  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialValue);
  const { name, username, email, password } = userData;

  const onChangeValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.name || !userData.username || !userData.email || !userData.password) {
      notify2("Please fill in all the details");
      return;
    }
    try {
      const res = await axios.post('http://localhost:8080/signup', userData);
      notify1();
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.msg === "User already exists") {
          notify2("User with this email or username already exists");
        } else {
          notify2("An error occurred while registering");
        }
      } else if (error.request) {
        notify2("No response received from the server");
      } else {
        notify2("Error occurred during request setup");
      }
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className='h-screen flex  flex-col md:flex-row relative bg-cover bg-no-repeat' style={{ backgroundImage: `url(${nature})` }}>
        <div className='flex flex-col mt-16 md:mt-1 justify-center items-center w-full md:w-1/2 text-white text-4xl p-8 z-10'>
          <h1 className='text-5xl md:text-8xl font-bold p-2'>Dil Ki Baat</h1>
          <h3 className='italic p-2 text-lg md:text-2xl'>Jaha har baat hai khaas</h3>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0'></div>
        <div className='flex flex-col justify-center items-center w-full md:w-1/2 h-screen bg-white bg-opacity-5 backdrop-blur-md p-4 md:p-12 text-center border-t md:border-t-0 md:border-l border-white border-opacity-50 z-10'>
          <div>
            <h2 className='text-3xl md:text-4xl font-semibold p-2'>Welcome</h2>
            <p className='text-sm md:text-xl text-gray-400 p-2 my-2'>Please enter your details</p>
          </div>
          <div className="w-full flex flex-col items-center my-5">
            <input
              className='w-3/4 p-2 mb-4 text-white bg-transparent border-b border-white border-opacity-60 outline-none placeholder-gray-400'
              type="name" name="name" id="name" value={name} onChange={(e) => onChangeValue(e)} placeholder='Name'
              autoComplete='off'
              required
            />
            <input
              className='w-3/4 p-2 mb-4 text-white bg-transparent border-b border-white border-opacity-60 outline-none placeholder-gray-400'
              type="name" name="username" id="username" value={username} onChange={(e) => onChangeValue(e)} placeholder='Username'
              autoComplete='off'
              required
            />
            <input
              className='w-3/4 p-2 mb-4 text-white bg-transparent border-b border-white border-opacity-60 outline-none placeholder-gray-400'
              type="email" name="email" id="email" value={email} onChange={(e) => onChangeValue(e)} placeholder='Email'
              autoComplete='off'
              required
            />
            <input
              className='w-3/4 p-2 mb-4 text-white bg-transparent border-b border-white border-opacity-60 outline-none placeholder-gray-400'
              placeholder='Password'
              type={isPasswordShown ? 'text' : 'password'}
              name="password" id="password" value={password} onChange={(e) => onChangeValue(e)}
              autoComplete='off'
              required
            />
            <div className='flex items-center justify-start w-3/4 mx-auto mb-4'>
              <input
                className='w-4 h-4'
                type='checkbox'
                autoComplete='off'
                checked={isPasswordShown}
                onChange={showPasswordHandler}
              />
              <p className='ml-2 text-sm'>{isPasswordShown ? 'Hide Password' : 'Show Password'}</p>
            </div>
            <button
              className='w-3/4 py-1 mb-4 text-xl font-light bg-black text-white rounded-lg hover:bg-gray-900 transition-all'
              type='submit'
              onClick={(e) => onHandleSubmit(e)}
            >
              Register
            </button>
            <p className="text-sm font-light mt-3 text-gray-400">
              Don’t have an account yet? <NavLink to="/login" className="font-medium p-1 text-primary-600 hover:underline text-white">Login</NavLink>
            </p>
          </div>
          {load && <div className='loader'>Loading...</div>}
        </div>
      </div>
    </>
  )
}
