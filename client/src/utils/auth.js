
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


export const getRoleFromCookies = () => {
  const userToken = Cookies.get("user_token");
  const sellerToken = Cookies.get("seller_token");
  const adminToken = Cookies.get("admin_token");

  try {
    if (adminToken) {
      const decoded = jwtDecode(adminToken);
      return decoded.role || "admin";
    } else if (sellerToken) {
      const decoded = jwtDecode(sellerToken);
      return decoded.role || "seller";
    } else if (userToken) {
      const decoded = jwtDecode(userToken);
      return decoded.role || "user";
    }
  } catch (err) {
    return null;
  }

  return null;
};
