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
        toast.error(error.error);
        console.log(error);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <div
        className="w-full max-w-lg shadow-md rounded-xl p-6"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h1
          className="text-2xl md:text-3xl font-bold mb-6 text-center"
          style={{ color: "var(--heading-color)" }}
        >
          Add Review
        </h1>

        {/* Review Input */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2"
            placeholder="Write a review..."
            style={{
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
              border: "1px solid var(--border-color)",
            }}
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
        </div>

        {/* Star Rating */}
        <div className="flex justify-center space-x-2 mb-4 text-3xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className="cursor-pointer"
              style={{ color: rating >= star ? "gold" : "var(--border-color)" }}
            >
              ★
            </span>
          ))}
        </div>

        <div className="flex justify-between gap-4">
  <button
    onClick={handleAddReview}
    className="w-full py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300"
    style={{
      backgroundColor: "var(--button-bg)",
      color: "var(--button-text)",
    }}
  >
    Submit Review
  </button>
  
  <button 
    className="border-t-cyan-900 px-4 py-3 rounded-lg border font-semibold hover:opacity-90 transition duration-300"
    onClick={() => navigate(`/productdetails/${productid}`)}
  >
    Cancel
  </button>
</div>

      </div>
    </div>
  );
};

export default ReviewPage;
