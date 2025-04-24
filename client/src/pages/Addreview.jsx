import { useState } from "react";
import { useParams } from "react-router-dom";
import { addReview } from "../services/UserService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
      <div className="container mx-auto p-6 max-w-lg">
         <h1 className="text-2xl font-bold mb-4 text-gray-800">Add Review</h1>

         {/* Review Input */}
         <div className="bg-white shadow-md rounded p-4 mb-4">
            <input
               type="text"
               className="border p-2 w-full mb-2 rounded"
               placeholder="Write a review..."
               value={newReview}
               onChange={(e) => setNewReview(e.target.value)}
            />

            <div className="flex space-x-2 mb-2">
               {[1, 2, 3, 4, 5].map((star) => (
                  <span
                     key={star}
                     onClick={() => setRating(star)}
                     className={`cursor-pointer text-2xl ${
                        rating >= star ? "text-yellow-400" : "text-gray-400"
                     }`}
                  >
                     ★
                  </span>
               ))}
            </div>

            <button
               onClick={handleAddReview}
               className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
               Submit Review
            </button>
         </div>
      </div>
   );
};

export default ReviewPage;
