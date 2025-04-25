import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userLogout } from '../services/UserService';
import { toast } from 'sonner';
import { MdShoppingCart } from 'react-icons/md';
import { useTheme } from '../theme-context';

const Headersection = () => {
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const userToken = Cookies.get('user_token') || null;
  const sellerToken = Cookies.get('seller_token') || null;
  const userName = Cookies.get('user_name') || 'User';

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  const handleLogout = async () => {
    try {
      await userLogout();
      Cookies.remove('user_token');
      Cookies.remove('seller_token');
      Cookies.remove('user_name');
      toast.success('Logout successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed!');
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
    <header className="sticky top-0 z-[9999] bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-white text-2xl font-extrabold hover:scale-105 transition">Quick Buy</Link>

        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md mx-4 flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-l-md border-none bg-white focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-white text-black rounded-r-md hover:bg-blue-800"
          >
            Search
          </button>
        </form>


        {/* Right Controls */}
        <div className="flex items-center gap-5">
          {/* Theme Toggle */}
          <label className="relative cursor-pointer w-12 h-6 bg-gray-400 rounded-full peer">
            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} className="hidden peer" />
            <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 peer-checked:bg-blue-500"></span>
          </label>

          {/* Cart */}
          <Link to="/cart" className="text-white text-2xl"><MdShoppingCart /></Link>

          {/* Profile Dropdown */}
          {userToken ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white font-medium hover:opacity-80 transition flex items-center gap-2"
              >
                👤 {userName}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-md overflow-hidden z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/orderHistory" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300 font-medium">Login</Link>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-blue-600 px-6 py-3 flex flex-wrap justify-center gap-6 text-white font-semibold text-sm">
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/best-selling" className="hover:underline">Best Selling</Link>
        <Link to="/new-releases" className="hover:underline">New Releases</Link>
        <Link to="/offers" className="hover:underline">Today's Offers</Link>

        {/* Conditional Links */}
        {userToken && !sellerToken && location.pathname !== '/becomeSeller' && (
          <Link to="/becomeSeller" className="hover:underline">Become a Seller</Link>
        )}
        {userToken && !sellerToken && location.pathname === '/becomeSeller' && (
          <Link to="/" className="hover:underline">Go Home</Link>
        )}
        {sellerToken && location.pathname !== '/seller/dashboard' && (
          <Link to="/seller/dashboard" className="hover:underline">Seller Dashboard</Link>
        )}
      </nav>
    </header>
  );
};

export default Headersection;



