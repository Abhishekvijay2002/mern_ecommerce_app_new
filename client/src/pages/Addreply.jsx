import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { addReply } from "../services/UserService";

const AddReply = () => {
  const navigate = useNavigate();
  const { reviewid } = useParams();
  const [values, setValues] = useState({ comment: "" });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!reviewid) {
      toast.error("Review ID is missing!");
      return;
    }

    try {
      await addReply(reviewid, { Comment: values.comment });
      toast.success("Review reply submitted successfully!");
      navigate("/admin/allreviews");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Submit Your Reply
        </h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Review Reply
            </label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={values.comment}
              onChange={(e) => setValues({ ...values, comment: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

export default AddReply;

