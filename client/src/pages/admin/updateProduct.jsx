import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Getproductbyid, UpdateProductbyid, GetAllCategory } from "../../services/UserService";
import { toast } from "sonner";

const UpdateProduct = () => {
  const { productid } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GetAllCategory();
        console.log(res.data.categories);
        if (res.data.categories && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        } else {
          toast.error("Invalid data format for categories");
        }
      } catch (error) {
        const errorMsg = error.response?.data?.error || "Something went wrong";
        toast.error(errorMsg);
        console.error(errorMsg);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    Getproductbyid(productid)
      .then((res) => {
        const { title, description, price, stock, category } = res.data;
        setFormData((prev) => ({
          ...prev,
          title,
          description,
          price,
          stock,
          category
        }));
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
        toast.error(errorMsg);
        console.error(errorMsg);
      });
  }, [productid]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData({
        ...formData,
        images: Array.from(e.target.files),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);

      if (formData.images.length > 0) {
        formData.images.forEach((file) => {
          data.append("images", file);
        });
      } else {
        formData.images.forEach((image) => {
          data.append("existingImages", image);
        });
      }

      const response = await UpdateProductbyid(productid, data);
      console.log(response.data);
      toast.success("Product updated successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
      console.error(errorMsg);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 border rounded-2xl shadow-md bg-[var(--card-bg)] text-[var(--text-color)]">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
            className="w-full sm:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            required
            className="w-full sm:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            required
            className="w-full sm:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="stock"
            value={formData.stock || ""}
            onChange={handleChange}
            required
            className="w-full sm:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
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
          className="w-full p-3 border rounded-lg focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
