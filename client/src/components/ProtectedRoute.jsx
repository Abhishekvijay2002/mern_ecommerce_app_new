import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {toast } from "sonner"



const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const Navigate = useNavigate
  const [role, setRole] = useState(localStorage.getItem("user_role"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedRole = localStorage.getItem("user_role");
    setRole(storedRole);
  }, []);

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