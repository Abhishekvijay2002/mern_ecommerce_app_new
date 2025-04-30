import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTheme } from '../theme-context';
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useAuth } from '../AuthContext';

function SellerLayout() {
  const navigate = useNavigate();
     const {  logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Header */}
      <header className="h-[10vh] w-full bg-white text-black shadow-lg border-b border-gray-300 flex items-center justify-between px-6">
        <div className="text-2xl font-bold">MyApp</div>
        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <label className="relative cursor-pointer w-10 h-5 bg-gray-400 rounded-full flex items-center sm:w-12 sm:h-6">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              className="hidden peer"
              aria-label="Toggle Theme"
            />
            <span className="absolute left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5 sm:peer-checked:translate-x-6 peer-checked:bg-blue-500"></span>
          </label>

          {/* Desktop Profile */}
          <div className="hidden md:flex items-center gap-3">
            <FaUserCircle className="text-2xl" />
            <span className="font-medium">Seller</span>
          </div>

          {/* Hamburger for Mobile */}
          <button
            className="block md:hidden p-3 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Animated Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-gray-800 text-white p-6 flex flex-col items-center space-y-6 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Close button */}
        <button
          className="self-end text-3xl mb-6 text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(false)}
        >
          <IoMdClose />
        </button>

        {/* Navigation */}
        <button onClick={() => { navigate('/seller/dashboard'); setMenuOpen(false); }} className="text-md px-6 py-3 bg-gray-600 rounded hover:bg-gray-500 w-full">
          Dashboard
        </button>
        <button onClick={() => { navigate('/seller/allreviews'); setMenuOpen(false); }} className="text-md px-6 py-3 bg-gray-600 rounded hover:bg-gray-500 w-full">
          Reviews
        </button>
        <button onClick={() => { navigate('/seller/productlist'); setMenuOpen(false); }} className="text-md px-6 py-3 bg-gray-600 rounded hover:bg-gray-500 w-full">
          Manage Products
        </button>
        <button onClick={() => { navigate('/seller/addproduct'); setMenuOpen(false); }} className="text-md px-6 py-3 bg-gray-600 rounded hover:bg-gray-500 w-full">
          Add Product
        </button>

        {/* Go Home and Logout inside Hamburger too */}
        <button onClick={() => { navigate('/'); setMenuOpen(false); }} className="text-md px-6 py-3 bg-gray-500 rounded hover:bg-gray-400 w-full">
          Go home
        </button>
        <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-md px-6 py-3 bg-gray-500 rounded hover:bg-gray-400 w-full">
          Logout
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar for Larger Screens */}
        <nav className="hidden md:flex flex-col w-[20vw] max-w-xs h-full bg-gray-700 text-white p-6 space-y-6 border-r border-gray-500 shadow-lg">
          <button className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded" onClick={() => navigate('/seller/dashboard')}>
            Dashboard
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded" onClick={() => navigate('/seller/allreviews')}>
            Reviews
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded" onClick={() => navigate('/seller/productlist')}>
            Manage Products
          </button>
          <button className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded" onClick={() => navigate('/seller/addproduct')}>
            Add Product
          </button>

          {/* Extra Options */}
          <div className="pt-6 border-t border-gray-400 flex flex-col gap-4">
            <button onClick={() => navigate('/')} className="bg-gray-500 hover:bg-gray-400 px-6 py-3 rounded">
              Go home
            </button>
            <button onClick={handleLogout} className="bg-gray-500 hover:bg-gray-400 px-6 py-3 rounded">
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex flex-1 shadow-inner p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SellerLayout;


