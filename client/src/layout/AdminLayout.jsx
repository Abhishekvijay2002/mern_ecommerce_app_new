import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../theme-context';
import {toast} from "sonner"
import { userLogout } from '../services/UserService';

function AdminLayout() {

    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme();
    
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
         useEffect(() => {
                const closeDropdown = (e) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                    setDropdownOpen(false);
                  }
                };
                document.addEventListener("click", closeDropdown);
                return () => document.removeEventListener("click", closeDropdown);
              }, []);
            
        
    return (
        <div className="h-screen w-screen flex flex-col">
        <header className="h-[6vh] w-full bg-white text-black shadow-lg border-b border-gray-300 relative z-10 flex items-center justify-between px-4">
          <div className="text-lg font-bold">MyApp</div>
          <div className="flex items-center gap-4">
          <label className="relative cursor-pointer w-12 h-6 bg-gray-400 rounded-full transition-all peer">
            <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} className="hidden peer" />
            <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6 peer-checked:bg-blue-500"></span>
          </label>
            <div className="flex items-center gap-4">
              <button className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </header>        
      
        <div className="flex flex-1">
          <nav className="w-[30vh] h-full bg-gray-700 text-white shadow-lg border-r border-gray-500 absolute top-0 z-20 pt-[6vh] flex flex-col gap-4 p-4">
            <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
            <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => navigate('/admin/sellerrequestlist')}>Seller Request</button>
            <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={ () => navigate('/admin/allorders')}>Orders</button>
            <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={ () => navigate('/admin/allreviews')}>Reviews</button>
            <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={ () => navigate('/admin/sellerlist')}>Manage Sellers</button>
            <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => navigate('/admin/userlist')}>Manage User</button>
            <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => navigate('/admin/productlist')}>Manage Products</button>
            <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => navigate('/admin/addproduct')}>Add Product</button>
            <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => navigate('/admin/managecategory')}>Manage category</button>
          </nav>
      
          <main className="flex flex-1  shadow-inner p-6 ml-[30vh]">
            <Outlet />
          </main>
        </div>
      </div>
      










    )
}

export default AdminLayout

