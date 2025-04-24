import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory, ListBestsellingProducts, listProducts, listProductswithOffers, searchProduct } from "../services/UserService";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";

function ProductPage({ type }) {
  const [products, setProducts] = useState([]);
  const { categoryid } = useParams();
  const [queryParams] = useSearchParams();
  const searchQuery = queryParams.get('q');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (type === 'offers') {
          const res = await listProductswithOffers();
          setProducts(res.data);
        } else if (type === 'bestsellers') {
          const res = await ListBestsellingProducts();
          setProducts(res.data);
        } else if (categoryid) {
          const res = await getProductsByCategory(categoryid);
          setProducts(res.data);
        } else if (searchQuery) {
          const res = await searchProduct(searchQuery);
          setProducts(res.data);
        } else {
          const res = await listProducts();
          console.log(res.data);
          setProducts(res.data);
        }
        
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [type, categoryid , searchQuery]);

  return (
    <div className="flex p-4">
      <main className="w-full">
        <div className="text-gray-700 mb-4 text-center">Showing {products.length} item(s)</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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