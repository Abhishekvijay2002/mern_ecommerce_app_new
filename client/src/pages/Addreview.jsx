import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addReview } from "../services/UserService";
import { toast } from "sonner";

const ReviewPage = () => {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const { productid } = useParams();
  const navigate = useNavigate();

  const handleAddReview = () => {
    const data = {
      newreview: newReview,
      rating: rating,
    };

    addReview(productid, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Review added successfully!");
        setNewReview("");
        setRating(0);
        navigate(`/productdetails/${productid}`);
      })
      .catch((error) => {
        toast.error("Failed to add review!");
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
          Add Review
        </h1>

        {/* Review Input */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
        </div>

        {/* Star Rating */}
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-3xl ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAddReview}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
