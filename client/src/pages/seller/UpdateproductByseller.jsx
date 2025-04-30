import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Getproductbyid, UpdateProductbyid } from "../../services/UserService";
import {toast} from "sonner"

const UpdateProductbyseller = () => {
  const { productid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [], 
  });

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
          category,
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

      
      formData.images.forEach((file) => {
        data.append("images", file); 
      });

      const response = await UpdateProductbyid(productid, data);
      console.log(response.data);
      toast.success("Product updated successfully!");
      navigate("/seller/dashboard");

    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
      console.error(errorMsg);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 border  rounded-2xl shadow-md bg-[var(--card-bg)] text-[var(--text-color)]">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
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

export default UpdateProductbyseller;
