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
                console.log(res.data); // Log to check the structure
                setReviews(res.data.reviews || []); // Ensure reviews is an array
                toast.success("Reviews Fetched");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Error Fetching Reviews");
            });
    }, []);

    const handleReply = (reviewId) => {
        console.log(`Navigating to: /admin/addreply/${reviewId}`);
        window.location.href = `/admin/addreply/${reviewId}`;
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Reviews</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border rounded-lg">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-6 text-left">User Name</th>
                            <th className="py-3 px-6 text-left">Review</th>
                            <th className="py-3 px-6 text-left">Rating</th>
                            <th className="py-3 px-6 text-left">Product Name</th>
                            <th className="py-3 px-6 text-left">Created At</th>
                            <th className="py-3 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.length > 0 ? (
                            reviews.map((review) => {
                                // Ensure the review object and its properties are not null
                                if (review && review.user && review.product) {
                                    return (
                                        <tr key={review._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                            <td className="py-3 px-6">{review.user.name}</td>
                                            <td className="py-3 px-6">{review.review}</td>
                                            <td className="py-3 px-6 text-yellow-600 font-medium">{review.rating}</td>
                                            <td className="py-3 px-6">{review.product._id}</td>
                                            <td className="py-3 px-6">{new Date(review.createdAt).toLocaleDateString()}</td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button 
                                                        onClick={() => handleReply(review._id)}
                                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                                                        Give Reply
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                                return null; // If the review or its properties are null, return nothing for this row
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-3 px-6 text-center text-gray-500">
                                    No reviews available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllReviews;
