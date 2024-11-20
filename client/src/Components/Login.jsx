import React, { useContext, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import Context from './Context';
import nature from '../assets/nature.jpg';

export default function Login() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const showPasswordHandler = (event) => {
    let checked = event.target.checked;
    setIsPasswordShown(checked);
  };

  const [load, setLoad] = useState(false);

  const { setLogin } = useContext(Context);
  const notify1 = () => toast.success('Sign in successful');
  const notify3 = (msg) => toast.error(msg);
  const initialValue = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState(initialValue);
  const { email, password } = userData;

  const onChangeValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      notify3('Please fill in all the details');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/login', userData);
      console.log(response.data);
      const { email, _id } = jwtDecode(response.data.data);
      localStorage.setItem('token', response.data.data);
      localStorage.setItem('email', email);
      localStorage.setItem('id', _id);
      localStorage.setItem('loggedin', true);

      setLogin(localStorage.getItem('token'));
      notify1();
      navigate('/');
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data) {
        if (error.response.data.includes('Password does not match')) {
          notify3('Password does not match');
        } else if (error.response.data.includes('User does not exist')) {
          notify3('User does not exist');
        } else {
          notify3('An error occurred while login');
        }
      } else if (error.request) {
        notify3('No response received from the server');
      } else {
        notify3('An error occurred while login');
      }
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='h-screen flex flex-col md:flex-row relative bg-cover bg-no-repeat' style={{ backgroundImage: `url(${nature})` }}>
        <div className='flex md:mt-1 mt-16 flex-col justify-center items-center md:w-1/2 w-full text-white text-4xl p-8 z-10'>
        <h1 className='text-5xl md:text-8xl font-bold p-2'>Dil Ki Baat</h1>
        <h3 className='italic p-2 text-lg md:text-2xl'>Jaha har baat hai khaas</h3>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0'></div>
        <div className='flex flex-col justify-center items-center md:w-1/2 w-full h-screen bg-white bg-opacity-5 backdrop-blur-md p-12 text-center border-l border-white border-opacity-50 z-10'>
          <div>
            <h2 className='text-4xl font-semibold mt-20p-2'>Welcome Back</h2>
            <p className='text-xl text-gray-400 p-2 my-2'>Please login to continue</p>
          </div>

          <div className='my-5 w-full px-4'>
            <div className='flex flex-col items-center mb-4'>
              <input
                className='w-full max-w-md p-2 mb-4 text-white bg-transparent border-b border-white border-opacity-60 outline-none placeholder-gray-400'
                placeholder='Email'
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={(e) => onChangeValue(e)}
                autoComplete='off'
                required
              />
            </div>
            <div className='flex flex-col items-center mb-4'>
              <input
                className='w-full max-w-md p-2 mb-4 text-white bg-transparent border-b border-white border-opacity-60 outline-none placeholder-gray-400'
                type={isPasswordShown ? 'text' : 'password'}
                name='password'
                id='password'
                value={password}
                placeholder='Password'
                onChange={(e) => onChangeValue(e)}
                autoComplete='off'
                required
              />
            </div>
            <div className='flex items-center justify-start w-full max-w-md mx-auto mb-4'>
              <input
                className='w-4 h-4'
                type='checkbox'
                checked={isPasswordShown}
                onChange={showPasswordHandler}
              />
              <p className='ml-2'>{isPasswordShown ? 'Hide Password' : 'Show Password'}</p>
            </div>
            <button
              className='w-full max-w-md py-2 mb-4 text-xl font-light bg-black text-white rounded-lg hover:bg-gray-900 transition-all'
              type='button'
              onClick={(e) => onHandleSubmit(e)}
            >
              Login
            </button>
            <p className='text-sm font-light mt-3 text-gray-400'>
              Don’t have an account yet? <NavLink to='/signup' className='font-medium p-1 text-primary-600 hover:underline text-white'>Sign up</NavLink>
            </p>
          </div>
          {load && <div className='loader'>Loading...</div>}
        </div>
      </div>
    </>
  );
}
