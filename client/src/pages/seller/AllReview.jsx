import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAllReviews } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function AllReviews() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getAllReviews()
            .then((res) => {
                setReviews(res.data.reviews || []);
                toast.success("Reviews Fetched");
            })
            .catch(() => {
                toast.error("Error Fetching Reviews");
            });
    }, []);

    const handleReply = (reviewId) => {
        navigate(`/admin/addreply/${reviewId}`);
    };

    return (
        <div className="p-6 min-h-screen overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)]">
            <h2 className="text-2xl font-semibold mb-4">All Reviews</h2>

            <div className="bg-[var(--table-bg)] shadow-lg rounded-lg overflow-hidden border border-[var(--table-border)]">
                <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full min-w-[1000px] text-left border-separate border-spacing-y-4">
                        <thead className="bg-[var(--table-header-bg)] text-[var(--table-text-color)] uppercase text-sm">
                            <tr>
                                <th className="py-3 px-6">User Name</th>
                                <th className="py-3 px-6">Review</th>
                                <th className="py-3 px-6">Rating</th>
                                <th className="py-3 px-6">Product Name</th>
                                <th className="py-3 px-6">Created At</th>
                                <th className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <tr key={review._id} className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition">
                                        <td className="py-3 px-6">{review.user?.name || "Unknown User"}</td>
                                        <td className="py-3 px-6 truncate max-w-[200px]">{review.review}</td>
                                        <td className="py-3 px-6 text-yellow-600 font-medium">{review.rating}</td>
                                        <td className="py-3 px-6">{review.product?.name || "Product deleted"}</td>
                                        <td className="py-3 px-6">{new Date(review.createdAt).toLocaleDateString()}</td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => handleReply(review._id)}
                                                className="bg-[var(--button-bg)] text-[var(--button-text)] px-4 py-2 rounded-md hover:brightness-90 transition">
                                                Give Reply
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="text-gray-500 text-center">
                                    <td className="py-3 px-6">No reviews available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllReviews;
