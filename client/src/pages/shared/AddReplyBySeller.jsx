import React, { useState } from "react";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"; 
import { addReply } from "../../services/UserService";

const AddReplyBySeller = () => {
  const { reviewid } = useParams(); // Ensure it matches backend param name
  const [values, setValues] = useState({
    comment: '',
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Debugging check
    if (!reviewid) {
      toast.error("Review ID is missing!");
      console.error("Review ID is undefined");
      return;
    }

    try {
      const res = await addReply(reviewid, { Comment: values.comment }); // Ensure field matches backend
      console.log("Response:", res);
      toast.success("Review reply submitted successfully!");
      navigate("/seller/allreviews");

    } catch (err) {
      toast.error(err.response?.data?.error || "Failed!");
      console.error("Error:", err);
    }

    console.log("Submitted Values:", values);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Submit Your Reply</h2>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium">
                Review Reply
              </label>
              <input
                type="text"
                id="comment"
                name="comment"
                value={values.comment}
                onChange={(e) => setValues({ ...values, comment: e.target.value })}
                className="w-full p-2 border rounded-lg bg-gray-600 text-white border-gray-500 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <button 
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReplyBySeller;
