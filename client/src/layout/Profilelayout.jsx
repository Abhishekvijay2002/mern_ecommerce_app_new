import React from 'react'

function Profilelayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex p-10 gap-10">
      <div className="w-64 bg-white rounded-xl shadow-md p-4m flex flex-col"> 
        <button >Profile</button>
        <button>My Orders</button>
      </div>
      <div>
        {/* Additional content can go here */}
      </div> 
    </div>
  )
}

export default Profilelayout

