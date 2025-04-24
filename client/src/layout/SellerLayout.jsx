import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function SellerLayout() {
  const navigate = useNavigate()
    
  return (
      <div className="h-screen w-screen flex flex-col">
      <header className="h-[6vh] w-full bg-white text-black shadow-lg border-b border-gray-300 relative z-10 flex items-center justify-between px-4">
        <div className="text-lg font-bold">MyApp</div>
        <div className="flex items-center gap-4">
          <button className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Dark Mode</button>
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
            P
          </div>
        </div>
      </header>        

    
      <div className="flex flex-1">
        <nav className="w-[30vh] h-full bg-gray-700 text-white shadow-lg border-r border-gray-500 absolute top-0 z-20 pt-[6vh] flex flex-col gap-4 p-4">
          <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => navigate('/seller/dashboard')}>Dashboard</button>
          <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={ () => navigate('/seller/allreviews')}>Reviews</button>
          <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => navigate('/seller/productlist')}>Manage Products</button>
          <button className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded" onClick={() => navigate('/seller/addproduct')}>Add Product</button>
        </nav>
    
        <main className="flex flex-1 bg-gray-50 shadow-inner p-6 ml-[30vh]">
          <Outlet />
        </main>
      </div>
    </div>
    
  )
}

export default SellerLayout
