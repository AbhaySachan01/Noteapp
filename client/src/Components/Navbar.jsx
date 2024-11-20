import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "./Context";
import nature from '../assets/nature.jpg'
import home from '../assets/home.jpg'

export default function Navbar() {
  const { login, setLogin } = useContext(Context);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex justify-between items-center h-16 mx-auto px-4 md:px-0">
        <div className="flex items-center">
          <Link to="/" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f8f9fa">
              <path d="M253-212h75v-256h304v256h75v-341L480-723 253-553.33V-212ZM117-76v-545l363-273 363 272.67V-76H511v-271h-62v271H117Zm363-391Z" />
            </svg>
          </Link>
        </div>

        <div className="hidden md:flex space-x-3">
          {login && (
            <>
              <Link to="/add" className="text-[#f8f9fa] px-4 -mb-1 border-b-2 dark:border-transparent">Add</Link>
              <Link to="/personal" className="text-[#f8f9fa] px-4 -mb-1 border-b-2 dark:border-transparent">Personal</Link>
            </>
          )}

          {login ? (
            <>
              <Link to="/saved" className="text-[#f8f9fa] px-4 -mb-1 border-b-2 dark:border-transparent">Saved_Card</Link>
              <button
                className="text-[#f8f9fa] px-4 -mb-1 border-b-2 dark:border-transparent"
                onClick={() => {
                  localStorage.clear();
                  setLogin(false);
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-[#f8f9fa] px-4 -mb-1 border-b-2 dark:border-transparent">Login</Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden  text-right">
          <ul className="space-y-1 p-4 bg-gray-800 text-white text-right">
            {login && (
              <>
                <li>
                  <Link to="/add" className="block py-2 px-4 -mb-1 border-b-2 dark:border-transparent" onClick={() => setIsMenuOpen(false)}>Add</Link>
                </li>
                <li>
                  <Link to="/personal" className="block py-2 px-4 -mb-1 border-b-2 dark:border-transparent" onClick={() => setIsMenuOpen(false)}>Personal</Link>
                </li>
                <li>
                  <Link to="/saved" className="block py-2 px-4 -mb-1 border-b-2 dark:border-transparent" onClick={() => setIsMenuOpen(false)}>Saved_Card</Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left py-2 px-4 -mb-1 border-b-2 dark:border-transparent"
                    onClick={() => {
                      localStorage.clear();
                      setLogin(false);
                      setIsMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!login && (
              <li>
                <Link to="/login" className="block py-2 px-4 -mb-1 border-b-2 dark:border-transparent" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
