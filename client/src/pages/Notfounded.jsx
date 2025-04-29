import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bg-color text-text-color transition-all">
      <h1 className="text-6xl font-bold text-heading-color">404</h1>
      <p className="text-lg mt-4 text-placeholder-text-color">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-button-bg text-button-text hover:bg-opacity-90 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
