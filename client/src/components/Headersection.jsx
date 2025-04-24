
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userLogout } from '../services/UserService';
import { toast } from 'sonner';
import { MdShoppingCart } from "react-icons/md";

const Headersection = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const userToken = Cookies.get('user_token') || null;
  const sellerToken = Cookies.get('seller_token') || null;
  const userName = Cookies.get('user_name') || 'User';

  const handleLogout = () => {
    try {
      userLogout().then(() => {
        toast.success("Logout successful!");
        navigate('/');
      });
    } catch (error) {
      console.log(error);
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
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Section */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-blue-500 text-white">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" aria-label="Home">Quick Buy</Link>
        </div>

        {/* Search */}
        <form 
          onSubmit={handleSearchSubmit}
          className="flex flex-1 justify-center max-w-xl w-full mx-4"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-full rounded-l-md text-blue-700 outline-none bg-white "
          />
          <button 
            type="submit"
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-r-md hover:bg-gray-100"
          >
            Search
          </button>
        </form>

        {/* Cart & User */}
        <div className="flex items-center gap-4 text-lg">
          
          <Link to="/cart" className="hover:text-gray-300" aria-label="Cart">
            <MdShoppingCart className="text-2xl" />
          </Link>

          {userToken ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:text-gray-300"
              >
                👤 {userName}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg z-50">
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
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="bg-blue-600 px-6 py-2 flex flex-wrap justify-center gap-6 text-sm font-medium text-white">
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/best-selling" className="hover:underline">Best Selling</Link>
        <Link to="/new-releases" className="hover:underline">New Releases</Link>
        <Link to="/offers" className="hover:underline">Today's Offers</Link>

        {userToken && !sellerToken && location.pathname !== "/becomeSeller" && (
          <Link to="/becomeSeller" className="hover:underline">Become a Seller</Link>
        )}
        {userToken && !sellerToken && location.pathname === "/becomeSeller" && (
          <Link to="/" className="hover:underline">Go Home</Link>
        )}
        {sellerToken && location.pathname !== "/seller/dashboard" && (
          <Link to="/seller/dashboard" className="hover:underline">Seller Dashboard</Link>
        )}
      </nav>
    </header>
  );
};

export default Headersection;
