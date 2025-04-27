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

function ProductPage() {
  const [products, setProducts] = useState([]);
  const { categoryid } = useParams();
  console.log(categoryid ,"useparmas")
  const location = useLocation();
  const [queryParams] = useSearchParams();
  const searchQuery = queryParams.get('q');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
          console.log(categoryid , "getcategory")
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
      }
    };

    fetchProducts();
  }, [location.pathname, categoryid, searchQuery]); 

  return (
    <div className="p-4">
      <main className="w-full">
        <div className="text-gray-700 mb-4 text-center">
          Showing {products.length} item(s)
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
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
