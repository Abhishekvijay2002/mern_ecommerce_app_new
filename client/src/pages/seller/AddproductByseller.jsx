import { toast } from "sonner";
import { AddProduct, GetAllCategory } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateProductbyseller = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [], // supports multiple images
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GetAllCategory();
        setCategories(res.data);
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

      formData.images.forEach((image) => {
        data.append("images", image);
      });

      const response = await AddProduct(data);
      toast.success("Product created successfully");
      console.log(response.data);
      navigate("/seller/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-10 p-8 border border-[var(--table-border)] rounded-2xl shadow-md bg-[var(--card-bg)] text-[var(--text-color)] sm:p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <label className="block text-[var(--text-color)]">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter product title"
          onChange={handleChange}
          required
          className="w-full p-3 border border-[var(--table-border)] rounded-lg  text-[var(--text-color)] placeholder-[var(--placeholder-text-color)] focus:outline-none focus:ring sm:p-2 md:p-3"
        />

        <label className="block text-[var(--text-color)]">Description</label>
        <textarea
          name="description"
          placeholder="Enter product description"
          onChange={handleChange}
          required
          className="w-full p-3 border border-[var(--table-border)] rounded-lg  text-[var(--text-color)] placeholder-[var(--placeholder-text-color)] focus:outline-none focus:ring sm:p-2 md:p-3"
        />

        <label className="block text-[var(--text-color)]">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          onChange={handleChange}
          required
          className="w-full p-3 border border-[var(--table-border)] rounded-lg  text-[var(--text-color)] placeholder-[var(--placeholder-text-color)] focus:outline-none focus:ring sm:p-2 md:p-3"
        />

        <label className="block text-[var(--text-color)]">Stock</label>
        <input
          type="number"
          name="stock"
          placeholder="Enter stock quantity"
          onChange={handleChange}
          required
          className="w-full p-3 border border-[var(--table-border)] rounded-lg  text-[var(--text-color)] placeholder-[var(--placeholder-text-color)] focus:outline-none focus:ring sm:p-2 md:p-3"
        />

        <label className="block text-[var(--text-color)]">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border border-[var(--table-border)] rounded-lg  text-[var(--text-color)] focus:outline-none focus:ring sm:p-2 md:p-3"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label className="block text-[var(--text-color)]">Upload Images</label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
          required
          className="w-full p-3 border border-[var(--table-border)] rounded-lg  text-[var(--text-color)] placeholder-[var(--placeholder-text-color)] focus:outline-none sm:p-2 md:p-3"
        />

        <button
          type="submit"
          className="w-full bg-[var(--button-bg)] text-[var(--button-text)] p-3 rounded-lg hover:brightness-90 transition sm:p-2 md:p-3"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductbyseller;
