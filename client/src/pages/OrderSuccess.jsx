import React from "react";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 sm:px-6 md:px-8">
      <img src="/logo.png" alt="Logo" className="w-24 sm:w-28 md:w-32 mb-6" />
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Your Order was Successful!</h1>
      <p className="text-base sm:text-lg text-gray-700 font-medium mt-1">
        Thank you for your order!
      </p>
      <p className="text-gray-600 mt-3 sm:text-base">
        You can track your order status in the “Order History” section.
      </p>

      {/* Image/Icon */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
        alt="Order Success"
        className="w-20 h-20 sm:w-24 sm:h-24 mt-6 mb-6"
      />
      <a
        href="/"
        className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition duration-300 mt-4"
      >
        Go Home
      </a>
    </div>
  );
};

export default OrderSuccess;


