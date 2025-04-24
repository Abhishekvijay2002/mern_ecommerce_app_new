import { getRoleFromCookies } from "../utils/auth";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  const token = Cookies.get("user_token") || Cookies.get("seller_token") || Cookies.get("admin_token");
  const role = getRoleFromCookies(); // 🔑 This now uses decoded JWT

  useEffect(() => {
    if (!token) {
      toast.error("Please login to continue.");
    } else if (!allowedRoles.includes(role)) {
      toast.error("You do not have access to this page.");
    }
  }, [token, role, allowedRoles]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
