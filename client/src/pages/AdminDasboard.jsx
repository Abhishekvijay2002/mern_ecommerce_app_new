import { useEffect, useState } from "react";
import { GetAllUsers, listProducts } from "../services/UserService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData } = await GetAllUsers();
        setUsers(userData);
        setSellers(userData.filter((user) => user.role === "seller"));

        const { data: productData } = await listProducts();
        setProducts(productData);
        setSellerProducts(
          productData.filter((product) => product.roleOfAdder === "seller")
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Users" count={users.length} />
        <DashboardCard title="Total Sellers" count={sellers.length} />
        <DashboardCard title="Total Products" count={products.length} />
        <DashboardCard
          title="Seller-added Products"
          count={sellerProducts.length}
        />
      </div>

      <ProductList products={products} />
    </div>
  );
};

const DashboardCard = ({ title, count }) => (
  <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
    <h2 className="text-lg font-medium mb-1">{title}</h2>
    <p className="text-2xl font-bold text-blue-600">{count}</p>
  </div>
);

const ProductList = ({ products }) => (
  <div className="mt-10">
    <h2 className="text-xl md:text-2xl font-semibold mb-4">All Products</h2>
    <ul className="bg-white rounded-lg shadow divide-y">
      {products.map((product) => (
        <li key={product.id} className="p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <span className="font-semibold">{product.title}</span>
            <span className="text-gray-600">₹{product.price}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default AdminDashboard;

