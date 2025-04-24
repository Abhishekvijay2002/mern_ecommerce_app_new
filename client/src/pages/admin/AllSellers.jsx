import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getAllSellers, removeSeller } from '../../services/UserService';

function AllSellers() {
    const [sellers, setseller] = useState([]);

    useEffect(() => {
        getAllSellers()
            .then((res) => {
                console.log(res.data);
                setseller(res.data); // Ensure data structure is correct
                toast.success("Users Fetched");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error Fetching Users");
            });
    }, []);
 
    const Handleremoveruser = (id) => {
        removeSeller(id)
            .then((res) => {
                console.log(res.data);
                toast.success("User Removed");

                // Update the sellers list after removal
                setseller(prevSellers => prevSellers.filter(seller => seller._id !== id));
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error Removing User");
            });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Sellers</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.length > 0 ? (
                            sellers.map((seller) => (
                                <tr key={seller._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                    <td className="py-3 px-6">{seller.name}</td>
                                    <td className="py-3 px-6">{seller.email}</td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => Handleremoveruser(seller._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-3 px-6 text-center text-gray-500">
                                    No Sellers available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllSellers;

