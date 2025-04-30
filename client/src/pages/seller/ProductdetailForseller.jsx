import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GetCategoryByid, Getproductbyid } from "../../services/UserService";

const defaultImage = "https://via.placeholder.com/150"; // Fallback image URL

const ProductDetailForseller = () => {
  const navigate = useNavigate();
  const { productid } = useParams();
  
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    let isMounted = true;

    Getproductbyid(productid)
      .then((res) => {
        if (isMounted) {
          setProduct(res.data);
          setSelectedImage(res.data.image?.[0] || defaultImage);
        }
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.error || "Something went wrong";
        toast.error(errorMsg);
        console.error(errorMsg);
      } );

    return () => {
      isMounted = false;
    };
  }, [productid]);

    const [categories, setCategory] = useState(null);
  
    useEffect(() => {
      if (product.category) { 
        GetCategoryByid(product.category)
          .then((res) => {
            setCategory(res.data.name);
          })
          .catch((err) => console.log(err));
      }
    }, [product.category]); 
    



  return (
    <div className="p-6 max-w-7xl mx-auto bg-[var(--bg-color)] text-[var(--text-color)] transition">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Image Section */}
        <div>
          <img src={selectedImage} alt="Selected" className="w-[70%] h-[70%] object-cover rounded-lg shadow-lg" />
          <div className="flex space-x-4 mt-4 overflow-x-auto">
            {product.image?.length > 0 ? (
              product.image.map((imgUrl, index) => (
                <img 
                  key={index} 
                  src={imgUrl} 
                  alt={`Thumbnail ${index + 1}`} 
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                    selectedImage === imgUrl ? "border-4 border-blue-500" : ""
                  }`} 
                  onClick={() => setSelectedImage(imgUrl)} 
                />
              ))
            ) : (
              <img src={defaultImage} alt="Default Thumbnail" className="w-20 h-20 rounded-lg shadow-md" />
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--heading-color)]">{product.title}</h2>
            <p></p>
            <p className="text-sm text-[var(--text-color)] mt-1">{categories}</p>
            
            <p className="text-xl text-[var(--text-color)] mt-2">
              {product.offerPrice ? (
                <>
                  <span className="text-red-500 font-bold text-2xl pr-1">₹{product.offerPrice}</span>
                  <span className="text-gray-500 line-through">₹{product.price}</span>
                </>
              ) : (
                `₹${product.price}`
              )}
            </p>
            <p className="text-sm text-[var(--text-color)] mt-1">{product.description}</p>
            <button 
              onClick={() => navigate("/seller/productlist")} 
              className="px-6 py-2 bg-[var(--button-bg)] text-[var(--button-text)] rounded-lg shadow-md hover:opacity-80 transition-all duration-300 mt-4"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailForseller;
