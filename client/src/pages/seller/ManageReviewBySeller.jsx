import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAllReviews } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function ManageReviewByseller() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getAllReviews()
            .then((res) => {
                setReviews(res.data.reviews);
                toast.success("Reviews Fetched");
            })
            .catch(() => {
                toast.error("Error Fetching Reviews");
            });
    }, []);

    return (
        <div className="p-6 min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
            <h2 className="text-2xl font-semibold mb-4">All Reviews</h2>

            {/* Responsive Scrollable Table Container */}
            <div className="shadow-lg rounded-lg overflow-hidden border border-[var(--table-border)] bg-[var(--table-bg)]">
                <div className="overflow-y-auto max-h-[400px]">
                    <table className="w-full text-left border-separate border-spacing-y-4"
                        style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
                        <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
                            <tr>
                                <th className="py-3 px-4">User Name</th>
                                <th className="py-3 px-4">Review</th>
                                <th className="py-3 px-4">Rating</th>
                                <th className="py-3 px-4">Product</th>
                                <th className="py-3 px-4">Created At</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <tr key={review._id} className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition">
                                        <td className="py-3 px-4">{review.user?.name || "Unknown User"}</td>
                                        <td className="py-3 px-4">{review.review}</td>
                                        <td className="py-3 px-4 text-yellow-600 font-medium">{review.rating}</td>
                                        <td className="py-3 px-4">{review.product?.name || "Product deleted"}</td>
                                        <td className="py-3 px-4">{new Date(review.createdAt).toLocaleDateString()}</td>
                                        <td className="py-3 px-4 text-center">
                                            <button onClick={() => navigate(`/seller/addreply/${review._id}`)}
                                                className="bg-[var(--button-bg)] text-[var(--button-text)] px-4 py-2 rounded-md hover:brightness-90 transition">
                                                Reply
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-3 px-4 text-center text-[var(--table-text-color)]">No reviews available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageReviewByseller;



