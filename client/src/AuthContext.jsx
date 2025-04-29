import { createContext, useContext, useEffect, useState } from "react";

import { userDetail } from "./services/UserService";
import {toast} from "sonner"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else if (token) {
      userDetail()
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(() => {
          console.error("Error fetching user details:", err);
          toast.error("Failed to fetch user details. Please try again.");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
