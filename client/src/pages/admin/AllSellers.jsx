import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getAllSellers, removeSeller } from '../../services/UserService';

function AllSellers() {
    const [sellers, setSellers] = useState([]);
    const [filteredSellers, setFilteredSellers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllSellers()
            .then((res) => {
                setSellers(res.data); // Ensure data structure is correct
                setFilteredSellers(res.data); // Initialize the filtered sellers
                toast.success("Users Fetched");
            })
            .catch(() => {
                toast.error("Error Fetching Users");
            });
    }, []);

    // Filter sellers based on the search term
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term === '') {
            setFilteredSellers(sellers); // If no search term, show all sellers
        } else {
            const filtered = sellers.filter(
                (seller) =>
                    seller.name.toLowerCase().includes(term.toLowerCase()) ||
                    seller.email.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredSellers(filtered); // Set the filtered list of sellers
        }
    };

    const handleRemoveUser = (id) => {
        removeSeller(id)
            .then(() => {
                toast.success("User Removed");

                // Update both the sellers list and the filtered sellers list after removal
                setSellers((prevSellers) => prevSellers.filter((seller) => seller._id !== id));
                setFilteredSellers((prevSellers) => prevSellers.filter((seller) => seller._id !== id));
            })
            .catch(() => {
                toast.error("Error Removing User");
            });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen overflow-hidden">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Sellers</h2>

            {/* Search Filter */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border p-2 w-full rounded"
                />
            </div>

            {/* Scrollable Table Wrapper */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full min-w-[800px] text-left border-separate border-spacing-y-4">
                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <tr>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSellers.length > 0 ? (
                                filteredSellers.map((seller) => (
                                    <tr key={seller._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                        <td className="py-3 px-6">{seller.name}</td>
                                        <td className="py-3 px-6">{seller.email}</td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => handleRemoveUser(seller._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="py-3 px-6 text-center text-gray-500">No Sellers available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllSellers;
