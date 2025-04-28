import React from "react";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 bg-[var(--bg-color)] text-[var(--text-color)] transition">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--heading-color)]">
        Your Order was Successful!
      </h1>
      <p className="text-base sm:text-lg font-medium mt-1 text-[var(--text-color)]">
        Thank you for your order!
      </p>
      <p className="mt-3 sm:text-base text-[var(--text-color)]">
        You can track your order status in the “Order History” section.
      </p>
      <div className="w-20 h-20 sm:w-24 sm:h-24 mt-6 mb-6  rounded-lg flex items-center justify-center">
  <img
    src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
    alt="Order Success"
    className="w-full h-full "
  />
</div>

      <a
        href="/"
        className="px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition duration-300 mt-4 text-[var(--button-text)] bg-[var(--button-bg)]"
      >
        Go Home
      </a>
    </div>
  );
};

export default OrderSuccess;

