import React from "react";


const OrderSuccess = () => {
  return (
    <div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <img src="/logo.png" alt="Logo" className="w-20 mb-6" />
      <h1 className="text-2xl font-semibold text-gray-800">Your Order Successful...</h1>
      <p className="text-base text-gray-700 font-medium mt-1">Thank you for your order!</p>
      <p className="text-gray-600 mt-3">You can track your order status in “Order history” section</p>

      {/* Image/Icon */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
        alt="Order Success"
        className="w-20 h-20 mt-6 mb-6"
      />
      <a
        href="/"
        className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition duration-300"
      >
        Go home
      </a>
    </div>
    </div>
  );
};

export default OrderSuccess;

