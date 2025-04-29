import { useEffect, useState } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import { 
  getProductsByCategory,
  ListBestsellingProducts, 
  listProducts, 
  listProductswithOffers, 
  searchProduct 
} from "../services/UserService";
import Card from "../components/Card";
import { FaSpinner } from "react-icons/fa"; // Importing the spinner icon

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { categoryid } = useParams();
  console.log(categoryid, "useparmas");
  const location = useLocation();
  const [queryParams] = useSearchParams();
  const searchQuery = queryParams.get('q');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        let res;
        const path = location.pathname;

        if (path.includes('/offers')) {
          res = await listProductswithOffers();
          setProducts(res.data); 
        } 
        else if (path.includes('/bestsellers')) {
          res = await ListBestsellingProducts();
          setProducts(res.data); 
        } 
        else if (categoryid) {
          console.log(categoryid, "getcategory");
          res = await getProductsByCategory(categoryid);
          setProducts(res.data.products); 
        } 
        else if (searchQuery) {
          res = await searchProduct(searchQuery);
          setProducts(res.data); 
        } 
        else {
          res = await listProducts();
          setProducts(res.data); 
        }
      } catch (err) {
        console.log("Error while fetching products:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProducts();
  }, [location.pathname, categoryid, searchQuery]); 

  return (
    <div className="p-4">
      <main className="w-full">
        <div className="mb-4 text-center">
          {loading ? (
            <FaSpinner className="animate-spin text-center text-6xl mx-auto" />
          ) : (
            <>Showing {products.length} item(s)</>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <p className="text-center   w-full ">Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product, i) => (
              <Card key={i} product={product} />
            ))
          ) : (
            <p className="text-center w-full">No products available</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
