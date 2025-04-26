import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GetAllUsers, userDelete } from '../services/UserService';

function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        GetAllUsers()
            .then((res) => {
                setUsers(res.data);
                toast.success("Users Fetched");
            })
            .catch(() => {
                toast.error("Error Fetching Users");
            });
    }, []);

    const handleDelete = (id) => {
        userDelete(id)
            .then(() => {
                setUsers(users.filter(user => user._id !== id));
                toast.success("User account deleted successfully!");
            })
            .catch(() => {
                toast.error("Failed to delete user account.");
            });
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">All Users</h2>

            {/* Scrollable Table Wrapper */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto max-h-[400px] no-scrollbar">
                    <table className="w-full min-w-[800px] text-left border-separate border-spacing-y-4">
                        <thead className="bg-gray-200 text-gray-700 uppercase">
                            <tr>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Role</th>
                                <th className="py-3 px-6 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                        <td className="py-3 px-6">{user.name}</td>
                                        <td className="py-3 px-6">{user.email}</td>
                                        <td className="py-3 px-6 text-yellow-600 font-medium">{user.role}</td>
                                        <td className="py-3 px-6">
                                            <div className="flex justify-center gap-2">
                                                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                                        No users available
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

export default AllUsers;
