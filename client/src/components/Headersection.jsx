import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userLogout } from '../services/UserService';
import { toast } from 'sonner';
import { MdShoppingCart } from 'react-icons/md';
import { HiMenu, HiX } from 'react-icons/hi'; // Hamburger menu icons
import { useTheme } from '../theme-context';

const Headersection = () => {
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        localStorage.removeItem("token"); 
        localStorage.removeItem("user"); 

        toast.success("Logged out successfully!");
        navigate("/");
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
    <header className="sticky top-0 z-[9999] bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
      {/* Top Header */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
        <Link to="/" className="text-white text-lg sm:text-xl font-extrabold hover:scale-105 transition">
          Quick Buy
        </Link>

        {/* Desktop Search Bar (Hidden on Mobile) */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative hidden sm:flex w-full max-w-xs md:max-w-sm mx-2"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-l-md border-none bg-white focus:ring-2 focus:ring-blue-300 text-sm"
          />
          <button type="submit" className="px-2 py-1 bg-white text-black rounded-r-md hover:bg-blue-800 text-xs sm:text-sm">
            🔍
          </button>
        </form>

        {/* Right Controls (Hidden on Mobile) */}
        <div className="hidden sm:flex items-center gap-3 sm:gap-5">
          {/* Theme Toggle */}
          <label className="relative cursor-pointer w-12 h-6 bg-gray-400 rounded-full flex items-center">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              className="hidden peer"
            />
            <span className="absolute left-1 w-3 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-7 peer-checked:bg-blue-500"></span>
          </label>


          {/* Cart Icon */}
          <Link to="/cart" className="text-white text-base sm:text-lg md:text-xl">
            <MdShoppingCart />
          </Link>

          {/* Profile Dropdown */}
          {userToken ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white text-sm sm:text-base font-medium hover:opacity-80 transition flex items-center gap-2"
              >
                👤 {userName}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white text-black rounded-lg shadow-md overflow-hidden z-50">
                  <Link to="/profile" className="block px-3 py-2 hover:bg-gray-100 text-sm">Profile</Link>
                  <Link to="/orderHistory" className="block px-3 py-2 hover:bg-gray-100 text-sm">My Orders</Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-white text-sm sm:text-base hover:text-gray-300 font-medium">Login</Link>
          )}
        </div>

        {/* Hamburger Button */}
        <button className="text-white text-xl sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-blue-600 px-3 py-2 text-white text-sm flex flex-col gap-3">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-l-md border-none bg-white text-black"
            />
            <button type="submit" className="px-3 py-2 bg-white text-black rounded-r-md hover:bg-blue-800">
              🔍
            </button>
          </form>

          {/* Mobile Cart */}
          <Link to="/cart" className="flex items-center justify-center gap-2 hover:underline">
            <MdShoppingCart className="text-white text-xl" />
            Cart
          </Link>

          {/* Navigation Links */}
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/best-selling" className="hover:underline">Best Selling</Link>
          <Link to="/new-releases" className="hover:underline">New Releases</Link>
          <Link to="/offers" className="hover:underline">Today's Offers</Link>
        </div>
      )}

      {/* Standard Navigation (Visible on Large Screens) */}
      <nav className="hidden sm:flex bg-blue-600 px-6 py-3 justify-center gap-6 text-white font-semibold text-sm">
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/best-selling" className="hover:underline">Best Selling</Link>
        <Link to="/new-releases" className="hover:underline">New Releases</Link>
        <Link to="/offers" className="hover:underline">Today's Offers</Link>
      </nav>
    </header>
  );
};

export default Headersection;
