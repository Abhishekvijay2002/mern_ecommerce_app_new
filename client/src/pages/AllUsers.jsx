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
        <div className="p-4 sm:p-6 min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">All Users</h2>

            {/* Table Wrapper */}
            <div className="shadow-lg rounded-lg overflow-hidden border border-[var(--table-border)] bg-[var(--table-bg)]">
                <table className="w-full text-left border-separate border-spacing-y-4"
                    style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
                    <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
                        <tr>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Role</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition">
                                    <td className="py-3 px-6">{user.name}</td>
                                    <td className="py-3 px-6">{user.email}</td>
                                    <td className="py-3 px-6 text-yellow-600 font-medium">{user.role}</td>
                                    <td className="py-3 px-6">
                                        <div className="flex justify-center gap-2">
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
                                <td colSpan="4" className="py-4 px-6 text-center text-[var(--table-text-color)]">
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

export default AllUsers;

