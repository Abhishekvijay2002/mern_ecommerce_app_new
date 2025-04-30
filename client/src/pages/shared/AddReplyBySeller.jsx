import React, { useState } from "react";
import { toast } from 'sonner';
import { useNavigate, useParams } from "react-router-dom"; 
import { addReply } from "../../services/UserService";

const AddReplyBySeller = () => {
  const { reviewid } = useParams();
  const [values, setValues] = useState({ comment: '' });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!reviewid) {
      toast.error( "Review ID is missing!");
      console.error("Review ID is undefined");
      return;
    }

    try {
      const res = await addReply(reviewid, { Comment: values.comment });
      console.log("Response:", res);
      toast.success("Review reply submitted successfully!");
      navigate("/seller/allreviews");
    } catch (err) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
    }

    console.log("Submitted Values:", values);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 ">
      <div className="w-full max-w-xl  rounded-xl shadow-md p-8 md:p-10 bg-[var(--card-bg)] text-[var(--text-color)]">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Submit Your Reply
        </h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium  mb-1">
              Review Reply
            </label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={values.comment}
              onChange={(e) => setValues({ ...values, comment: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Type your reply here..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReplyBySeller;
