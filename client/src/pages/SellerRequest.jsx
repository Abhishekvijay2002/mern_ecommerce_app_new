

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { approveSellerRequest, getAllsellerRequests, rejectSellerRequest } from '../services/UserService';

function SellerRequest() {
    const [seller, setSeller] = useState([]);

    useEffect(() => {
        getAllsellerRequests()
            .then((res) => {
                console.log(res.data);
                setSeller(res.data.requests); // Extracting the 'requests' array
                toast.success("Seller Request Fetched");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error Fetching Seller Request");
            });
    }, []);

    const handlereject = (id) => {
        rejectSellerRequest(id)
            .then(() => {
                toast.success("Seller Request Rejected");
                setSeller((prev) => prev.filter((request) => request._id !== id)); // Update state after rejection
            })
            .catch((err) => {
                console.log(err);
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
                    )
                );
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error Approving Seller Request");
            });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Seller Requests</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
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
                                <tr key={request._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                    <td className="py-3 px-6">{request.name}</td>
                                    <td className="py-3 px-6">{request.email}</td>
                                    <td className="py-3 px-6 text-yellow-600 font-medium">{request.sellerApprovalStatus}</td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleApprove(request._id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handlereject(request._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                            >
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
    );
}

export default SellerRequest;
