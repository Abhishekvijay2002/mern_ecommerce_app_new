
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { approveSellerRequest, getAllsellerRequests, rejectSellerRequest } from '../services/UserService';

function SellerRequest() {
    const [seller, setSeller] = useState([]);

    useEffect(() => {
        getAllsellerRequests()
            .then((res) => {
                setSeller(res.data.requests); // Extracting the 'requests' array
                toast.success("Seller Request Fetched");
            })
            .catch(() => {
                toast.error("Error Fetching Seller Request");
            });
    }, []);

    const handlereject = (id) => {
        rejectSellerRequest(id)
            .then(() => {
                toast.success("Seller Request Rejected");
                setSeller((prev) => prev.filter((request) => request._id !== id)); 
            })
            .catch(() => {
                toast.error("Error Rejecting Seller Request");
            });
    };

    const handleApprove = (id) => {
        approveSellerRequest(id)
            .then(() => {
                toast.success("Seller Request Approved");
                setSeller((prev) =>
                    prev.map((request) =>
                        request._id === id ? { ...request, sellerApprovalStatus: "approved" } : request
                    ).filter((request) => request.sellerApprovalStatus !== "approved")
                );
            })
            .catch(() => {
                toast.error("Error Approving Seller Request");
            });
    };

    return (
        <div className="p-6 min-h-screen overflow-hidden">
            <h2 className="text-2xl font-semibold  mb-4">Seller Requests</h2>

            {/* Scrollable Table Wrapper */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-y-auto max-h-[400px]">
                <table className="w-full text-left border-separate border-spacing-y-4" style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
    <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
        <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-center">Action</th>
        </tr>
    </thead>
    <tbody>
        {seller.length > 0 ? (
            seller.map((request) => (
                <tr key={request._id} className="border-b border-gray-300 hover:bg-gray-100 transition" style={{ color: "var(--table-text-color)" }}>
                    <td className="py-3 px-6">{request.name}</td>
                    <td className="py-3 px-6">{request.email}</td>
                    <td className="py-3 px-6 text-yellow-600 font-medium">{request.sellerApprovalStatus}</td>
                    <td className="py-3 px-6 text-center">
                        <div className="flex justify-center gap-2">
                            <button onClick={() => handleApprove(request._id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                                Approve
                            </button>
                            <button onClick={() => handlereject(request._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                                Reject
                            </button>
                        </div>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="4" className="py-3 px-6 text-center text-gray-500">
                    No seller requests available
                </td>
            </tr>
        )}
    </tbody>
</table>

                </div>
            </div>
        </div>
    );
}

export default SellerRequest;

