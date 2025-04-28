import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { userDelete, userDetail, userUpdate } from "../services/UserService";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [updateData, setUpdateData] = useState({ name: "", email: "" });
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    userDetail()
      .then((res) => {
        setUserDetails(res.data);
        setUpdateData({ name: res.data.name, email: res.data.email }); // Pre-fill update form
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        toast.error("Failed to fetch user data.");
        setLoading(false);
      });
  }, []);

  const handleUpdate = () => {
    userUpdate(updateData)
      .then(() => {
        toast.success("User details updated successfully!");
        setUserDetails((prev) => ({ ...prev, ...updateData }));
        setIsUpdateOpen(false);
      })
      .catch(() => {
        toast.error("Failed to update user details.");
      });
  };

  const handleDelete = () => {
    if (confirmDelete) {
      userDelete()
        .then(() => {
          toast.success("User account deleted successfully!");
          setIsDeleteOpen(false);
        })
        .catch(() => {
          toast.error("Failed to delete user account.");
        });
    } else {
      toast.error("Please confirm by ticking the checkbox.");
    }
  };

  return (
    <div className="max-w-lg m-6 mx-auto rounded-xl shadow-md overflow-hidden p-6 sm:max-w-md md:max-w-lg lg:max-w-xl bg-[var(--bg-color)] text-[var(--text-color)] transition">
      <div className="text-center">
        <div
          className="w-24 h-24 mx-auto m-4 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] bg-cover bg-center"
          style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/043/116/836/non_2x/illustration-of-boy-profile-anime-style-black-silhouette-isolated-on-white-background-free-vector.jpg)' }}
        ></div>

        <h2 className="text-xl font-semibold text-[var(--heading-color)]">
          {userDetails?.name || "N/A"}
        </h2>
        <p className="text-[var(--text-color)]">{userDetails?.email || "N/A"}</p>

        <button
          className="px-4 py-2 rounded-md mt-4 w-full sm:w-auto bg-[var(--button-bg)] text-[var(--button-text)] hover:opacity-80 m-4"
          onClick={() => setIsUpdateOpen(true)}
        >
          Update
        </button>
        <button
          className="px-4 py-2 rounded-md mt-4 w-full sm:w-auto bg-red-500 text-white hover:opacity-80"
          onClick={() => setIsDeleteOpen(true)}
        >
          Delete
        </button>
      </div>

      {/* Update Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg shadow-lg p-6 w-11/12 sm:w-96 md:w-1/2 lg:w-1/3 bg-[var(--modal-bg)] text-[var(--modal-text)]">
            <h2 className="text-lg font-semibold mb-4">Update User Details</h2>
            <input
              type="text"
              placeholder="Enter new name"
              value={updateData.name}
              onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
              className="w-full border border-[var(--border-color)] p-2 rounded-md mb-2 bg-[var(--card-bg)] text-[var(--text-color)]"
            />
            <input
              type="email"
              placeholder="Enter new email"
              value={updateData.email}
              onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
              className="w-full border border-[var(--border-color)] p-2 rounded-md mb-4 bg-[var(--card-bg)] text-[var(--text-color)]"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setIsUpdateOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-[var(--button-bg)] text-[var(--button-text)]"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg shadow-lg p-6 w-11/12 sm:w-96 md:w-1/2 lg:w-1/3 bg-[var(--modal-bg)] text-[var(--modal-text)]">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Warning: Account Deletion</h2>
            <p className="mb-4">
              Deleting your account is a permanent action and cannot be undone.
            </p>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.checked)}
                className="h-4 w-4"
              />
              <span>I understand that my account will be permanently deleted.</span>
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md ${confirmDelete ? "bg-red-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                onClick={handleDelete}
                disabled={!confirmDelete}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;




