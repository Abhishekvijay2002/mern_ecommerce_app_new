import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userLogout } from '../services/UserService';
import { toast } from 'sonner';
import { MdShoppingCart } from "react-icons/md";
import { useTheme } from '../theme-context';

const Headersection = () => {
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Retrieve user details from cookies
  const userToken = Cookies.get('user_token') || null;
  const sellerToken = Cookies.get('seller_token') || null;
  const userName = Cookies.get('user_name') || 'User';

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleLogout = async () => {
    try {
      await userLogout();
      toast.success("Logout successful!");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Logout failed!");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="sticky top-0 z-[9999] bg-gradient-to-r from-blue-500 to-blue-700 shadow-md ">
      {/* Top Section - Logo & Search */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo with Animation */}
        <div className="text-3xl font-extrabold tracking-wide text-white hover:scale-105 transition">
          <Link to="/">Quick Buy</Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center text-black max-w-md w-full">
          <input 
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-full rounded-l-lg border-2 border-blue-300 outline-none bg-white focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-r-lg transition">
            Search
          </button>
        </form>

        {/* Controls (Theme, Cart & User) */}
        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <label className="relative cursor-pointer w-12 h-6 bg-gray-400 rounded-full transition-all peer">
            <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} className="hidden peer" />
            <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 peer-checked:bg-blue-500"></span>
          </label>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center text-white hover:scale-110 transition">
            <MdShoppingCart className="text-4xl" />
          </Link>

          {/* Login/User Dropdown */}
          {userToken ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white text-lg font-medium hover:opacity-80 flex items-center gap-2 transition">
                👤 {userName}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-xl shadow-lg transition-all">
                  <Link to="/profile" className="block px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</Link>
                  <Link to="/orderHistory" className="block px-5 py-3 hover:bg-gray-100">My Orders</Link>
                  <button onClick={handleLogout} className="w-full text-left px-5 py-3 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-lg font-medium text-white hover:text-gray-300 transition">Login</Link>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="bg-blue-600 px-8 py-3 flex flex-wrap justify-center gap-6 text-sm font-semibold text-white transition-all">
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/best-selling" className="hover:underline">Best Selling</Link>
        <Link to="/new-releases" className="hover:underline">New Releases</Link>
        <Link to="/offers" className="hover:underline">Today's Offers</Link>
      </nav>
    </header>
  );
};

export default Headersection;


