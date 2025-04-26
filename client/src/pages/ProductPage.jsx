import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory, ListBestsellingProducts, listProducts, listProductswithOffers, searchProduct } from "../services/UserService";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";

function ProductPage({ type }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const productsPerPage = 12; // Number of products per page
  const { categoryid } = useParams();
  const [queryParams] = useSearchParams();
  const searchQuery = queryParams.get('q');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;
        if (type === 'offers') {
          res = await listProductswithOffers();
        } else if (type === 'bestsellers') {
          res = await ListBestsellingProducts();
        } else if (categoryid) {
          res = await getProductsByCategory(categoryid);
        } else if (searchQuery) {
          res = await searchProduct(searchQuery);
        } else {
          res = await listProducts();
        }

        setProducts(res.data);

        // Calculate total pages based on the number of products and products per page
        setTotalPages(Math.ceil(res.data.length / productsPerPage));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [type, categoryid, searchQuery]);

  // Pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get products for the current page
  const displayedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="p-4">
      <main className="w-full">
        <div className="text-gray-700 mb-4 text-center">
          Showing {displayedProducts.length} item(s) of {products.length}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, i) => (
              <Card key={i} product={product} />
            ))
          ) : (
            <p className="text-center w-full">No products available</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-5 py-2 text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300`}
          >
            Previous
          </button>
          <span className="flex items-center text-lg text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
