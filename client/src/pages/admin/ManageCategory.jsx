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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    GetAllCategory()
      .then((res) => setCategories(res.data))
      .catch(() => toast.error("Error Fetching Categories"));
  };

  const handleAddCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newCategory);
      formData.append('image', newCategoryImage);

      await createCategory(formData);
      toast.success('Category added successfully!');
      setIsAddModalOpen(false);
      setNewCategory('');
      setNewCategoryImage(null);
      loadCategories();
    } catch (err) {
      toast.error('Failed to add category!');
    }
  };

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

  const handleDeleteCategory = async (categoryId) => {
    try {
      await DeleteCategory(categoryId);
      toast.success('Category deleted successfully!');
      loadCategories();
    } catch (err) {
      toast.error('Failed to delete category!');
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-hidden">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Categories</h2>

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

      {/* Scrollable Table Wrapper */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full min-w-[800px] text-left border-separate border-spacing-y-4">
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
                  <td colSpan="3" className="py-3 px-6 text-center text-gray-500">No categories available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
