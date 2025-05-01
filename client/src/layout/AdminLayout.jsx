import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '../AuthContext';
import ThemeToggle from '../redux/ThemeToggle';

function AdminLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
   const {  logout } = useAuth();

   const handleLogout = () => {
    logout();
    navigate("/"); // Navigate after logout
  };
  return (
    <div className="h-screen w-ful flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-[10vh] w-full bg-white text-black shadow-lg border-b border-gray-300 flex items-center justify-between px-6">
        <div className="text-2xl font-bold">MyApp</div>
        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
        <ThemeToggle/>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <button onClick={handleLogout} className="text-md px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Logout</button>
          </div>

          {/* Hamburger Menu Button */}
          <button className="block md:hidden p-3 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </header>

      {/* Animated Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="absolute inset-0 bg-gray-800 flex flex-col p-6">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-bold text-white p-2"
            >
              x
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex flex-col mt-6 space-y-6 overflow-y-auto">
            <button onClick={() => { navigate("/admin/dashboard"); setMenuOpen(false); }} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white text-left">Dashboard</button>
            <button onClick={() => { navigate("/admin/sellerrequestlist"); setMenuOpen(false); }} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white text-left">Seller Request</button>
            <button onClick={() => { navigate("/admin/allorders"); setMenuOpen(false); }} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white text-left">Orders</button>
            <button onClick={() => { navigate("/admin/allreviews"); setMenuOpen(false); }} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white text-left">Reviews</button>
            <button onClick={() => { navigate("/admin/sellerlist"); setMenuOpen(false); }} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white text-left">Manage Sellers</button>
            <button onClick={() => { navigate("/admin/userlist"); setMenuOpen(false); }} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white text-left">Manage Users</button>
            <button onClick={() => { navigate("/admin/productlist"); setMenuOpen(false); }} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white text-left">Manage Products</button>
            <button onClick={() => { navigate("/admin/addproduct"); setMenuOpen(false); }} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white text-left">Add Product</button>
            <button onClick={() => { navigate("/admin/managecategory"); setMenuOpen(false); }} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white text-left">Manage Category</button>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="bg-gray-500 hover:bg-gray-400 px-6 py-3 rounded text-white text-left">Logout</button>
          </div>
        </div>
      </div>

      {/* Layout Container */}
      <div className="flex  overflow-hidden">
        {/* Sidebar for Desktop */}
        <nav className="hidden md:flex flex-col max-w-xs h-full bg-gray-700 text-white p-6 space-y-6 border-r border-gray-500 shadow-lg">
          <button onClick={() => navigate("/admin/dashboard")} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white">Dashboard</button>
          <button onClick={() => navigate("/admin/sellerrequestlist")} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white">Seller Request</button>
          <button onClick={() => navigate("/admin/allorders")} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white">Orders</button>
          <button onClick={() => navigate("/admin/allreviews")} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white">Reviews</button>
          <button onClick={() => navigate("/admin/sellerlist")} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white">Manage Sellers</button>
          <button onClick={() => navigate("/admin/userlist")} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white">Manage Users</button>
          <button onClick={() => navigate("/admin/productlist")} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white">Manage Products</button>
          <button onClick={() => navigate("/admin/addproduct")} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white">Add Product</button>
          <button onClick={() => navigate("/admin/managecategory")} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded text-white">Manage Category</button>
        </nav>

        {/* Main Content */}
        <main className="flex flex-1 shadow-inner p-6  overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

