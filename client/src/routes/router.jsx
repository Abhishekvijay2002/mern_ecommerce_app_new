import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../pages/AboutPage.jsx";
import LoginPage from "../pages/shared/LoginPage";
import HomePage from "../pages/HomePage.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import CartPage from "../pages/CartPage.jsx";
import CheckoutPage from "../pages/CheckoutPge.jsx";
import OrderSuccess from "../pages/OrderSuccess.jsx";
import OrderHistory from "../pages/OrderHistory.jsx";
import ProfilePage from "../pages/Profile.jsx";
import UserLayout from "../layout/UserLayout.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import BecomeaSeller from "../pages/BecomeaSeller.jsx";
import SellerLayout from "../layout/SellerLayout.jsx";
import SellerRequest from "../pages/SellerRequest.jsx";;
import AllSellers from "../pages/admin/AllSellers.jsx";
import Allproducts from "../pages/admin/Allproducts.jsx";
import AddProduct from "../pages/admin/AddProduct.jsx";
import UpdateProduct from "../pages/admin/updateProduct.jsx";
import Allorders from "../pages/admin/Allorders.jsx";
import ReviewPage from "../pages/Addreview.jsx";
import Allreviews from "../pages/admin/Allreviews.jsx";
import Addreply from "../pages/Addreply.jsx";
import CategoryManagement from "../pages/admin/ManageCategory.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AllUsers from "../pages/AllUsers.jsx"
import AllProducts from "../pages/seller/Allproduct.jsx";
import UpdateProductbyseller from "../pages/seller/UpdateproductByseller.jsx";
import ManageReviewByseller from "../pages/seller/ManageReviewBySeller.jsx";
import AddReplyBySeller from "../pages/shared/AddReplyBySeller.jsx";
import CreateProductbyseller from "../pages/seller/AddproductByseller.jsx";
import SellerDashboard from "../pages/SellerDasboard.jsx";
import AdminDashboard from "../pages/AdminDasboard.jsx";
import ProductDetailForadmin from "../pages/admin/ProductDetailByadmin.jsx";
import ProductDetailForseller from "../pages/seller/ProductdetailForseller.jsx";
import PaymentFailed from "../pages/PaymentFailed.jsx";
import NotFound from "../pages/Notfounded.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "product/offers", element: <ProductPage />,
      },
      {
        path: "/product/bestsellers", element: <ProductPage />,
      },
      {
        path: "/product/category/:categoryid", element: <ProductPage />,
      },
      {
        path: "/search", element: <ProductPage />

      },
      {
        path: "/cart",
        element:(
          <ProtectedRoute allowedRoles={["user","seller"]}>
            <CartPage/>
          </ProtectedRoute>
        )
      },

      {
        path: "/productdetails/:productid",
        element: <ProductDetails />,
      },
      {
        path: "/success",
        element: <OrderSuccess />,
      },
      {
        path: "/orderHistory",
        element: (
          <ProtectedRoute allowedRoles={["user","seller"]}>
            <OrderHistory />
          </ProtectedRoute>
        )
      },

      {
        path: "/profile",
        element: <ProfilePage/>,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute allowedRoles={["user","seller"]}>
         <CheckoutPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/becomeSeller",
        element: (
          <ProtectedRoute allowedRoles={["user","seller"]}>
            <BecomeaSeller/>
          </ProtectedRoute>
        )
      },
      {
        path: "/addreview/:productid",
        element:(
          <ProtectedRoute allowedRoles={["user","seller"]}>
            <ReviewPage/>
          </ProtectedRoute>
        )
      },
      {
        path: "payment/failed",
        element:<PaymentFailed/>,
      },
    ]
  },
  {
    path: "/admin",
    element:(
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout/>
      </ProtectedRoute>
    ),
    children: [
       {
        path: "dashboard",
        element: <AdminDashboard/>,
      },
      {
        path: "sellerrequestlist",
        element: <SellerRequest/>,
      },
      {
        path: "userlist",
        element: <AllUsers/>,
      },
      {
        path: "sellerlist",
        element: <AllSellers/>,
      },
      {
        path: "productlist",
        element: <Allproducts/>,
      },
      {
        path: "productdetail/:productid",
        element: <ProductDetailForadmin/>,
      },
      {
        path: "addproduct",
        element: <AddProduct/>,
      },
      {
        path: "updateproduct/:productid",
        element: <UpdateProduct/>,
      },
      {
        path: "allorders",
        element: <Allorders/>,
      },
      {
        path: "allreviews",
        element: <Allreviews/>,
      },
      {
        path: "addreply/:reviewid",
        element:<Addreply/>,
      },
      {
        path: "managecategory",
        element: <CategoryManagement/>, 
      }
      

    ]
  },
  {
    path: "/seller",
     element:(
      <ProtectedRoute allowedRoles={["seller"]}>
        <SellerLayout/>
      </ProtectedRoute>
    ),
    children: [
       {
        path: "dashboard",
        element: <SellerDashboard/>,
      },
      {
        path: "productlist",
        element: <AllProducts/>,
      },
      {
        path: "productdetail/:productid",
        element: <ProductDetailForseller/>,
      },
      {
        path: "addproduct",
        element: <CreateProductbyseller/>,
      },
      {
        path: "updateproduct/:productid",
        element: <UpdateProductbyseller/>,
      },
      {
        path: "allreviews",
        element: <ManageReviewByseller/>,
      },
      {
        path: "addreply/:reviewid",
        element:<AddReplyBySeller/>,
      },

    ]
  },
  {
    path: "*",
    element:<NotFound/>,
  },

]);
