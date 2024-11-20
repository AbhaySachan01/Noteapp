import React, { useState } from 'react';
import nature from '../assets/nature.jpg'
import Login from './Login';
import Signup from './Signup';
import { NavLink} from 'react-router-dom'

const Registration = () => {
  const [formState, setFormState] = useState('login');
  const [data, setData] = useState({ name: '', username: '', email: '', password: '' });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [load, setLoad] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const showPasswordHandler = (event) => {
    let checked = event.target.checked;
    setIsPasswordShown(checked);
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

  return (
    <>
      <div className='h-screen flex relative bg-cover bg-no-repeat'  style={{ backgroundImage: `url(${nature})` }}>
        <div className='flex flex-col justify-center items-center w-1/2 text-white text-4xl p-8 z-10'>
          <h1 className='text-8xl -webkit-text-stroke-1 p-2'>Dil Ki Baat </h1>
          <h3 className='italic p-2'>Jaha hr baat hai khaas</h3>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0'></div>
        <div className='flex flex-col justify-center items-center w-1/2 h-screen bg-white bg-opacity-5 backdrop-blur-md p-12 text-center border-l border-white border-opacity-50 z-10'>
          {formState === 'login' ? (
            <div > 
                <>
                <Login/>
                <p className="text-sm font-light mt-3  text-gray-400">
                      Don’t have an account yet? <span onClick={() => onClickHandler('signup')} className="font-medium hover:cursor-pointer p-1 text-primary-600 hover:underline text-white">Sign up</span>
                  </p>
                </>
              
            </div>
          ) : (
            <div >
            <Signup/>
            <p className="text-sm font-light mt-3  text-gray-400">
                Allready have an account ?<span onClick={() => onClickHandler('login')} className="font-medium hover:cursor-pointer p-1 text-primary-600 hover:underline text-white">Login</span>
            </p>
            </div>
           
          )}
           

          {load && <div className='loader'>Loading...</div>}
        </div>
      </div>
    </>
  );
};

export default Registration;
