import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GetAllUsers, userDelete } from '../services/UserService';

function Allusers() {
    const [users, setUser] = useState([]);

    useEffect(() => {
        GetAllUsers()
            .then((res) => {
                setUser(res.data);
                toast.success("Users Fetched");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error Fetching Users");
            });
    }, []);

    const handleDelete = (id) => {
        userDelete(id)
            .then(() => {
                setUser(users.filter(user => user._id !== id));
                toast.success("User account deleted successfully!");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to delete user account.");
            });
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">All Users</h2>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full text-sm sm:text-base">
                    <thead className="bg-gray-200 text-gray-700 uppercase">
                        <tr>
                            <th className="py-3 px-4 sm:px-6 text-left">Name</th>
                            <th className="py-3 px-4 sm:px-6 text-left">Email</th>
                            <th className="py-3 px-4 sm:px-6 text-left">Role</th>
                            <th className="py-3 px-4 sm:px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                                >
                                    <td className="py-3 px-4 sm:px-6">{user.name}</td>
                                    <td className="py-3 px-4 sm:px-6">{user.email}</td>
                                    <td className="py-3 px-4 sm:px-6 text-yellow-600 font-medium">
                                        {user.role}
                                    </td>
                                    <td className="py-3 px-4 sm:px-6">
                                        <div className="flex flex-col sm:flex-row sm:gap-2 gap-1">
                                            <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition text-sm">
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-sm"
                                            >
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
    );
}

export default Allusers;
