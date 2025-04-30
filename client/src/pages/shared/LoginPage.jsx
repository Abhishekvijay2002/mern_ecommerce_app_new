import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { userLogin } from "../../services/UserService";

const Login = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await userLogin({ email, password });

      if (!res?.data?.user || !res?.data?.token) {
        toast.error("Invalid response from server.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_role", res.data.user.role); // Ensure role is stored

      toast.success(res?.data?.message || "Login successful!");
      navigate(res.data.user.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(errorMsg);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"} flex items-center justify-center p-4`}>
      <div className="absolute top-4 right-4">
        <button onClick={toggleTheme} className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-300 text-gray-800 hover:bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className={`${isDarkMode ? "bg-gray-700" : "bg-white"} rounded-lg shadow-lg p-8 transition-all duration-300 transform hover:scale-105 w-full max-w-md`}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={`w-full p-2 border rounded-lg ${isDarkMode ? "bg-gray-600 text-white border-gray-500" : "text-gray-700 focus:ring-blue-500 focus:border-blue-500"}`} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={`w-full p-2 border rounded-lg ${isDarkMode ? "bg-gray-600 text-white border-gray-500" : "text-gray-700 focus:ring-blue-500 focus:border-blue-500"}`} />
          <button type="submit" className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Login</button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")} className="text-blue-500 hover:underline">Sign Up</button>
          </p>
          <button onClick={() => navigate("/")} className={`mt-3 w-full px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"}`}>Go Home</button>
        </div>
      </div>
    </div>
  );
};

export default Login;