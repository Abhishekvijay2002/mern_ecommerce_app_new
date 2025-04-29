import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-bg-color text-text-color transition-all">
      <div className="bg-card-bg p-6 rounded-lg shadow-lg text-center border border-border-color">
        <h1 className="text-2xl font-bold text-heading-color">Payment Failed</h1>
        <p className="mt-2">Oops! Something went wrong. Please try again.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-emerald-400 text-button-text hover:opacity-80 font-semibold py-2 px-4 rounded transition-all "
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;

