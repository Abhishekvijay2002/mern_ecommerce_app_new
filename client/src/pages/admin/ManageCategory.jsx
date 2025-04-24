import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createCategory, DeleteCategory, GetAllCategory, UpdateCategory } from '../../services/UserService';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [editCategory, setEditCategory] = useState({ id: '', name: '', image: null });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search

  // Load categories when the component mounts
  useEffect(() => {
    loadCategories();
  }, []);

  // Fetch all categories from the backend
  const loadCategories = () => {
    GetAllCategory()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newCategory);
      formData.append('image', newCategoryImage);

      await createCategory(formData);  // Ensure createCategory sends the FormData to the correct endpoint
      toast.success('Category added successfully!');
      setIsAddModalOpen(false);
      setNewCategory('');
      setNewCategoryImage(null);
      loadCategories();
    } catch (err) {
      toast.error('Failed to add category!');
    }
  };

  // Handle updating a category
  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editCategory.name);
      if (editCategory.image) {
        formData.append('image', editCategory.image);
      }

      await UpdateCategory(formData, editCategory.id);
      toast.success('Category updated successfully!');
      setIsEditModalOpen(false);
      setEditCategory({ id: '', name: '', image: null });
      loadCategories();
    } catch (err) {
      toast.error('Failed to update category!');
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await DeleteCategory(categoryId);
      toast.success('Category deleted successfully!');
      loadCategories();
    } catch (err) {
      toast.error('Failed to delete category!');
    }
  };

  // Filter categories based on the search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Categories</h2>
      
      {/* Search input for filtering categories */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Categories..."
        className="border p-2 w-full mb-4 rounded"
      />

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mb-4"
      >
        Add Category
      </button>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Category Name</th>
              <th className="py-3 px-6 text-center">Image</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                  <td className="py-3 px-6">{category.name}</td>
                  <td className="py-3 px-6 text-center">
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="w-16 h-16 object-cover" />
                    ) : (
                      'No Image'
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
                <td colSpan="3" className="py-3 px-6 text-center text-gray-500">
                  No categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">Add Category</h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="border p-2 w-full mb-4 rounded"
            />
            <input
              type="file"
              onChange={(e) => setNewCategoryImage(e.target.files[0])}
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsAddModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
              <button onClick={handleAddCategory} className="bg-green-500 text-white px-4 py-2 rounded-md">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Category</h3>
            <input
              type="text"
              value={editCategory.name}
              onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
              placeholder="Enter category name"
              className="border p-2 w-full mb-4 rounded"
            />
            <input
              type="file"
              onChange={(e) => setEditCategory({ ...editCategory, image: e.target.files[0] })}
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
              <button onClick={handleUpdateCategory} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
