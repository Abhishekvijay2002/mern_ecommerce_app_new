import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  CancelSellerRequest,
  GetSellerStatus,
  RequestToBecomeaSeller,
} from '../services/UserService';

function BecomeSeller() {
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // default theme is light

  useEffect(() => {
    GetSellerStatus()
      .then((res) => {
        console.log("Seller status response:", res.data);
        setStatus(res?.data?.sellerApprovalStatus || 'not_requested');
        setRole(res?.data?.role || '');
        setLoading(false);
      })
      .catch((err) => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
      });

    // Apply the current theme
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleRequest = () => {
    RequestToBecomeaSeller()
      .then(() => {
        toast.success("Request sent successfully!");
        setStatus('pending');
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
      });
  };

  const handleCancel = () => {
    CancelSellerRequest()
      .then(() => {
        toast.success("Request cancelled");
        setStatus('not_requested');
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
        toast.error(errorMsg);
        console.error(errorMsg);
      });
  };

  const handleReapply = () => {
    RequestToBecomeaSeller()
      .then(() => {
        toast.success("Reapplication sent successfully!");
        setStatus('pending');
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
      });
  };

  const renderAction = () => {
    if (role === 'admin') {
      return <p className="text-blue-600 font-semibold">You're an admin — seller access granted by default.</p>;
    }

    if (role === 'seller') {
      return <p className="text-green-600 font-semibold">You're already a seller ✅</p>;
    }

    if (status === 'not_requested') {
      return (
        <button
          onClick={handleRequest}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200"
        >
          Request to Become a Seller
        </button>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <p className="text-yellow-600 font-medium">Your request is pending approval.</p>
          <button
            onClick={handleCancel}
            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition duration-200"
          >
            Cancel Request
          </button>
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <p className="text-red-600 font-medium">Your request was rejected.</p>
          <button
            onClick={handleReapply}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200"
          >
            Reapply to Become a Seller
          </button>
        </>
      );
    }

    if (status === 'approved') {
      return <p className="text-green-600 font-semibold">You are already a seller ✅</p>;
    }

    return null;
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme preference
  };

  return (
    <div className="max-w-xl mx-auto m-20 p-8 bg-[var(--card-bg)] text-[var(--text-color)] border rounded-xl shadow-md text-center">
      <h2 className="text-3xl font-bold mb-6 ">Seller Request</h2>

      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 bg-gray-800 text-white p-2 rounded-full"
      >
        {theme === 'light' ? '🌙' : '🌞'} {/* Switch icon based on theme */}
      </button>

      {loading ? (
        <p className="">Loading status...</p>
      ) : (
        <>
          <p className=" mb-6">
            <span className="font-medium">Current Status:</span>{' '}
            {status === 'not_requested' ? 'Not Requested' : status.charAt(0).toUpperCase() + status.slice(1)}
          </p>

          {renderAction()}
        </>
      )}
    </div>
  );
}

export default BecomeSeller;


