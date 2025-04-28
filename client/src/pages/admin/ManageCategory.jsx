import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { createCategory, DeleteCategory, GetAllCategory, UpdateCategory } from "../../services/UserService";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [editCategory, setEditCategory] = useState({ id: "", name: "", image: null });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await GetAllCategory();
      setCategories(res.data);
    } catch (err) {
      toast.error("Error Fetching Categories");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty!");
      return;
    }
    if (!newCategoryImage) {
      toast.error("Please upload a category image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newCategory);
      formData.append("image", newCategoryImage);

      await createCategory(formData);
      toast.success("Category added successfully!");
      setIsAddModalOpen(false);
      setNewCategory("");
      setNewCategoryImage(null);
      loadCategories();
    } catch (err) {
      toast.error("Failed to add category!");
    }
  };

  const handleUpdateCategory = async () => {
    if (!editCategory.id.trim() || !editCategory.name.trim()) {
      toast.error("Category name cannot be empty!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", editCategory.name);
      if (editCategory.image) {
        formData.append("image", editCategory.image);
      }

      await UpdateCategory(editCategory.id, formData);
      toast.success("Category updated successfully!");
      setIsEditModalOpen(false);
      loadCategories();
    } catch (err) {
      toast.error("Failed to update category!");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await DeleteCategory(categoryId);
      toast.success("Category deleted successfully!");
      loadCategories();
    } catch (err) {
      toast.error("Failed to delete category!");
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "new") setNewCategoryImage(file);
    else setEditCategory({ ...editCategory, image: file });
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <h2 className="text-2xl font-semibold mb-4">All Categories</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Categories..."
        className="border p-2 w-full mb-4 rounded bg-[var(--input-bg)] text-[var(--text-color)]"
      />

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-[var(--button-bg)] text-[var(--button-text)] px-4 py-2 rounded-md hover:brightness-90 transition mb-4"
      >
        Add Category
      </button>

      {/* Table Wrapper */}
      <div className="shadow-lg rounded-lg overflow-hidden border border-[var(--table-border)] bg-[var(--table-bg)]">
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full min-w-[800px] text-left border-separate border-spacing-y-4"
            style={{ backgroundColor: "var(--table-bg)", color: "var(--table-text-color)" }}>
            <thead style={{ backgroundColor: "var(--table-header-bg)", color: "var(--table-text-color)" }}>
              <tr>
                <th className="py-3 px-6">Category Name</th>
                <th className="py-3 px-6 text-center">Image</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category._id} className="border-b border-[var(--table-border)] hover:bg-opacity-90 transition">
                    <td className="py-3 px-6">{category.name}</td>
                    <td className="py-3 px-6 text-center">
                      {category.image ? (
                        <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded-md" />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditCategory({ id: category._id, name: category.name, image: null });
                            setIsEditModalOpen(true);
                          }}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-3 px-6 text-center text-[var(--table-text-color)]">No categories available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              className="border p-2 w-full mb-4 rounded bg-[var(--input-bg)] text-[var(--text-color)]"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "new")}
              className="border p-2 w-full mb-4 rounded bg-[var(--input-bg)] text-[var(--text-color)]"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded bg-gray-500 text-white">Cancel</button>
              <button onClick={handleAddCategory} className="px-4 py-2 rounded bg-green-500 text-white">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            <input
              type="text"
              value={editCategory.name}
              onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
              placeholder="Category Name"
              className="border p-2 w-full mb-4 rounded bg-[var(--input-bg)] text-[var(--text-color)]"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "edit")}
              className="border p-2 w-full mb-4 rounded bg-[var(--input-bg)] text-[var(--text-color)]"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded bg-gray-500 text-white">Cancel</button>
              <button onClick={handleUpdateCategory} className="px-4 py-2 rounded bg-blue-500 text-white">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;

