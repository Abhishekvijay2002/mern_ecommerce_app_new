import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { AddProduct, GetAllCategory } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [], // supports multiple images
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GetAllCategory();
        console.log(res.data.categories);  // Check if the data is under `categories`
        if (res.data.categories && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        } else {
          toast.error("Invalid data format for categories");
        }
      } catch (err) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) }); // multiple files
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      // Append all fields
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);

      // Append all images
      formData.images.forEach((image) => {
        data.append("images", image); // backend should use upload.array("images")
      });

      const response = await AddProduct(data);
      toast.success("Product created successfully");
      navigate("/admin/dashboard");

      console.log(response.data);
    } catch (error) {
      toast.error(error.error || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-10 p-8 border border-[var(--table-border)] bg-[var(--card-bg)] text-[var(--text-color)] rounded-2xl shadow-md sm:p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-xl md:text-2xl">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 sm:p-2 md:p-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 sm:p-2 md:p-3"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 sm:p-2 md:p-3"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 sm:p-2 md:p-3"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 sm:p-2 md:p-3"
        >
          <option value="">Select Category</option>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option value="">No categories available</option>
          )}
        </select>

        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none sm:p-2 md:p-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 sm:p-2 md:p-3"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
