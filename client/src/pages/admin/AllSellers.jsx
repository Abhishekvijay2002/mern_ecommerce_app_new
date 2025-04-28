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
                setSellers(res.data);
                setFilteredSellers(res.data);
                toast.success("Users Fetched");
            })
            .catch(() => {
                toast.error("Error Fetching Users");
            });
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setFilteredSellers(
            term === ''
                ? sellers
                : sellers.filter(
                    (seller) =>
                        seller.name.toLowerCase().includes(term.toLowerCase()) ||
                        seller.email.toLowerCase().includes(term.toLowerCase())
                )
        );
    };

    const handleRemoveUser = (id) => {
        removeSeller(id)
            .then(() => {
                toast.success("User Removed");
                setSellers((prev) => prev.filter((seller) => seller._id !== id));
                setFilteredSellers((prev) => prev.filter((seller) => seller._id !== id));
            })
            .catch(() => {
                toast.error("Error Removing User");
            });
    };

    return (
        <div className="p-6 min-h-screen overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)]">
            <h2 className="text-2xl font-semibold mb-4">All Sellers</h2>

            {/* Search Filter */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border p-2 w-full rounded bg-[var(--input-bg)] text-[var(--text-color)]"
                />
            </div>

            {/* Scrollable Table Wrapper */}
            <div className="shadow-lg rounded-lg overflow-hidden border border-[var(--table-border)] bg-[var(--table-bg)]">
                <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full min-w-[800px] text-left border-separate border-spacing-y-4"
                        style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
                        <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
                            <tr>
                                <th className="py-3 px-6">Name</th>
                                <th className="py-3 px-6">Email</th>
                                <th className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSellers.length > 0 ? (
                                filteredSellers.map((seller) => (
                                    <tr key={seller._id} className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition">
                                        <td className="py-3 px-6">{seller.name}</td>
                                        <td className="py-3 px-6">{seller.email}</td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => handleRemoveUser(seller._id)}
                                                className="bg-[var(--button-bg)] text-[var(--button-text)] px-4 py-2 rounded-md hover:brightness-90 transition">
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="py-3 px-6 text-center text-[var(--table-text-color)]">
                                        No Sellers available
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

export default AllSellers;
