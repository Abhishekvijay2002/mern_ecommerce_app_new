import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTheme } from '../theme-context';
import { useAuth } from '../AuthContext';
import { BsFillPersonFill, BsSearch } from "react-icons/bs";

const Headersection = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="sticky top-0 z-[9999] bg-gradient-to-r from-blue-500 to-blue-700 shadow-md">
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">

        <div className="flex items-center gap-2">
          <button
            className="text-white text-xl sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen
              ? <HiX className="text-white scale-125 transition-transform rotate-90" />
              : <HiMenu className="text-white transition-transform" />}
          </button>

          <Link to="/" className="text-white text-lg sm:text-xl font-extrabold hover:scale-105 transition">
            Quick Buy
          </Link>
        </div>

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
            <BsSearch />
          </button>
        </form>

        <div className="flex items-center gap-4">
          <label className="relative cursor-pointer w-10 h-5 bg-gray-400 rounded-full flex items-center sm:w-12 sm:h-6">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              className="hidden peer"
            />
            <span className="absolute left-1 w-3 h-3.5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5 sm:peer-checked:translate-x-7 peer-checked:bg-blue-500"></span>
          </label>

          <Link to="/cart" className="text-white text-lg">
            <MdShoppingCart size={22} />
          </Link>


          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white text-sm sm:text-base font-medium hover:opacity-80 transition flex items-center gap-2"
              >
                <BsFillPersonFill size={22} />

                <span className="hidden sm:inline">{user.name}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white text-black rounded-lg shadow-md overflow-hidden z-50">
                  <Link to="/profile" className="block px-3 py-2 hover:bg-gray-100 text-sm">Profile</Link>
                  <Link to="/orderHistory" className="block px-3 py-2 hover:bg-gray-100 text-sm">My Orders</Link>
                  <button onClick={logout} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-white text-sm hover:text-gray-300 font-medium">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu with Transition */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="bg-blue-600 px-3 py-2 text-white text-sm flex flex-col gap-3">

          <form onSubmit={handleSearchSubmit} className="w-full flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-l-md border-none bg-white text-black"
            />
            <button type="submit" className="px-3 py-2 bg-white text-black rounded-r-md hover:bg-blue-800">
              <BsSearch />
            </button>
          </form>

          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/product/bestsellers" className="hover:underline">Best Selling</Link>
          <Link to="/product/offers" className="hover:underline">Today's Offers</Link>

          {user?.role === 'seller' ? (
            <Link to="/seller/dashboard" className="hover:underline">Seller Dashboard</Link>
          ) : (
            <Link to="/becomeSeller" className="hover:underline">Become a Seller</Link>
          )}

        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden sm:flex bg-blue-600 px-6 py-3 justify-center gap-6 text-white font-semibold text-sm">
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/product/bestsellers" className="hover:underline">Best Selling</Link>
        <Link to="/product/offers" className="hover:underline">Today's Offers</Link>

        {user?.role === 'seller' ? (
          <Link to="/seller/dashboard" className="hover:underline">Seller Dashboard</Link>
        ) : (
          <Link to="/becomeSeller" className="hover:underline">Become a Seller</Link>
        )}
      </nav>
    </header>
  );
};

export default Headersection;
