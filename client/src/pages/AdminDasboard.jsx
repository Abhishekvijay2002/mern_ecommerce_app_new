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
            // Fetch users once and derive sellers from it
            const { data: userData } = await GetAllUsers();
            setUsers(userData);
            setSellers(userData.filter(user => user.role === "seller"));

            // Fetch products and filter seller-added products
            const { data: productData } = await listProducts();
            setProducts(productData);
            setSellerProducts(productData.filter(product => product.roleOfAdder === "seller"));
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      fetchData();
   }, []);

   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
         <div className="grid grid-cols-4 gap-6 mt-4">
            <DashboardCard className="text-black" title="Total Users" count={users.length} />
            <DashboardCard className="text-black" title="Total Sellers" count={sellers.length} />
            <DashboardCard className="text-black" title="Total Products" count={products.length} />
            <DashboardCard  className="text-black" title="Seller-added Products" count={sellerProducts.length} />
         </div>
         <ProductList products={products} />
      </div>
   );
};

const DashboardCard = ({ title, count }) => (
   <div className="p-4 bg-gray-100 rounded-md shadow">
      <h2 className="text-lg  text-black font-semibold">{title}</h2>
      <p className="text-xl text-black font-bold">{count}</p>
   </div>
);

const ProductList = ({ products }) => (
   <div className="mt-6">
      <h2 className="text-xl font-bold">All Products</h2>
      <ul>
         {products.map(product => (
            <li key={product.id} className="border-b py-2">
               <strong>{product.title}</strong> - ₹{product.price}
            </li>
         ))}
      </ul>
   </div>
);

export default AdminDashboard;
