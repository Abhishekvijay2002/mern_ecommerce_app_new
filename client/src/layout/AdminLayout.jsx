import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme-context';
import { toast } from "sonner";
import { userLogout } from '../services/UserService';

function AdminLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Header */}
      <header className="h-[10vh] w-full bg-white text-black shadow-lg border-b border-gray-300 flex items-center justify-between px-6">
        <div className="text-2xl font-bold">MyApp</div>
        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <label className="relative cursor-pointer w-14 h-7 bg-gray-400 rounded-full flex items-center">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              className="hidden peer"
            />
            <span className="absolute left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-7 peer-checked:bg-blue-500"></span>
          </label>


          {/* Desktop Navigation - Hidden on Small Screens */}
          <div className="hidden md:flex gap-6">
            <button onClick={() => navigate('/')} className="text-md px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Go home</button>
            <button onClick={handleLogout} className="text-md px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Logout</button>
          </div>

          {/* Hamburger Menu Button */}
          <button className="block md:hidden p-3 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </header>

      {/* Mobile Sidebar (Toggleable) */}
      <aside className={`absolute top-0 left-0 h-full w-[30vh] bg-gray-700 text-white p-6 border-r border-gray-500 shadow-lg transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden flex flex-col space-y-6`}>
        <button onClick={() => navigate('/admin/dashboard')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Dashboard</button>
        <button onClick={() => navigate('/admin/sellerrequestlist')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Seller Request</button>
        <button onClick={() => navigate('/admin/allorders')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Orders</button>
        <button onClick={() => navigate('/admin/allreviews')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Reviews</button>
        <button onClick={() => navigate('/admin/sellerlist')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Manage Sellers</button>
        <button onClick={() => navigate('/admin/userlist')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Manage Users</button>
        <button onClick={() => navigate('/admin/productlist')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Manage Products</button>
        <button onClick={() => navigate('/admin/addproduct')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Add Product</button>
        <button onClick={() => navigate('/admin/managecategory')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Manage Category</button>

        {/* "Go Home" & "Logout" Buttons */}
        <div className="w-full space-y-4">
          <button onClick={() => navigate('/')} className="text-md px-6 py-3 bg-gray-500 rounded hover:bg-gray-400 w-full">Go home</button>
          <button onClick={handleLogout} className="text-md px-6 py-3 bg-gray-500 rounded hover:bg-gray-400 w-full">Logout</button>
        </div>
      </aside>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar Navigation (Always Visible on Desktop) */}
        <nav className="hidden md:flex flex-col w-[30vh] h-full bg-gray-700 text-white p-6 space-y-6 border-r border-gray-500 shadow-lg">
          <button onClick={() => navigate('/admin/dashboard')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Dashboard</button>
          <button onClick={() => navigate('/admin/sellerrequestlist')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Seller Request</button>
          <button onClick={() => navigate('/admin/allorders')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Orders</button>
          <button onClick={() => navigate('/admin/allreviews')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Reviews</button>
          <button onClick={() => navigate('/admin/sellerlist')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Manage Sellers</button>
          <button onClick={() => navigate('/admin/userlist')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Manage Users</button>
          <button onClick={() => navigate('/admin/productlist')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Manage Products</button>
          <button onClick={() => navigate('/admin/addproduct')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Add Product</button>
          <button onClick={() => navigate('/admin/managecategory')} className="bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded">Manage Category</button>
        </nav>

        {/* Main Content */}
        <main className="flex flex-1 shadow-inner p-6 md:ml-[30vh]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

