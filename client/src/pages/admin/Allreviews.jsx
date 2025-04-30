import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAllReviews, Getproductbyid } from "../../services/UserService"; // Make sure Getproductbyid is correct
import { useNavigate } from "react-router-dom";

function AllReviews() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState({}); // To store product names

    useEffect(() => {
        // Fetch reviews first
        getAllReviews()
            .then((res) => {
                setReviews(res.data.reviews || []);
                toast.success("Reviews Fetched");
            })
            .catch((error) => {
                const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
            });
    }, []);

    // Fetch product details by ID
    useEffect(() => {
        reviews.forEach((review) => {
            if (review.product && review.product._id) {
                Getproductbyid(review.product._id).then((productRes) => {
                    const product = productRes.data; // Make sure this structure is correct
                    setProducts((prevState) => ({
                        ...prevState,
                        [review.product._id]: product.title || "Unknown Product" // Safely access 'title'
                    }));
                }).catch((error) => {
                    const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
                });
            }
        });
    }, [reviews]);

    const handleReply = (reviewId) => {
        navigate(`/admin/addreply/${reviewId}`);
    };

    return (
        <div className="p-6 min-h-screen overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)]">
            <h2 className="text-2xl font-semibold mb-4">All Reviews</h2>

            {/* Table Wrapper */}
            <div className="shadow-lg rounded-lg overflow-hidden border border-[var(--table-border)]">
                <div className="overflow-x-auto max-h-[400px]">
                    <table className="w-full text-left border-separate border-spacing-y-4"
                        style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
                        <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
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
                                        {/* Safely accessing product name */}
                                        <td className="py-3 px-6">{products[review.product?._id] || "Loading..."}</td>
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
                                    <td className="py-3 px-6" colSpan="6">No reviews available</td>
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
