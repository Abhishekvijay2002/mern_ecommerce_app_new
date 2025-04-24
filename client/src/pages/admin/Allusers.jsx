import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GetAllUsers, userDelete } from '../../services/UserService';

function Allusers() {
    const [users, setUser] = useState([]);

    useEffect(() => {
        GetAllUsers()
            .then((res) => {
                console.log(res.data);
                setUser(res.data); // Ensure data structure is correct
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
              toast.success("User account deleted successfully!");
            })
            .catch((error) => {
                console.log(error);
              toast.error("Failed to delete user account.");

            });
      };

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Users</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
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
                                <tr key={user._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                    <td className="py-3 px-6">{user.name}</td>
                                    <td className="py-3 px-6">{user.email}</td>
                                    <td className="py-3 px-6 text-yellow-600 font-medium">
                                        {user.role}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                                    >
                                                        view Details
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                                    >
                                                        delete
                                                    </button>

                                                </div>
                                            </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-3 px-6 text-center text-gray-500">
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
