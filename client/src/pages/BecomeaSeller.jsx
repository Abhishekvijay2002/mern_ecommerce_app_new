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

  useEffect(() => {
    GetSellerStatus()
      .then((res) => {
        console.log("Seller status response:", res.data);
        setStatus(res?.data?.sellerApprovalStatus || 'not_requested');
        setRole(res?.data?.role || '');
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error while fetching seller status:", err);
        toast.error("Failed to fetch seller status");
        setLoading(false);
      });
  }, []);

  const handleRequest = () => {
    RequestToBecomeaSeller()
      .then(() => {
        toast.success("Request sent successfully!");
        setStatus('pending');
      })
      .catch(() => {
        toast.error("Failed to send request");
      });
  };

  const handleCancel = () => {
    CancelSellerRequest()
      .then(() => {
        toast.success("Request cancelled");
        setStatus('not_requested');
      })
      .catch(() => {
        toast.error("Failed to cancel request");
      });
  };

  const handleReapply = () => {
    RequestToBecomeaSeller()
      .then(() => {
        toast.success("Reapplication sent successfully!");
        setStatus('pending');
      })
      .catch(() => {
        toast.error("Failed to reapply");
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

  return (
    <div className="max-w-xl mx-auto m-20 p-8 bg-white border rounded-xl shadow-md text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Seller Request</h2>

      {loading ? (
        <p className="text-gray-500">Loading status...</p>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
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

