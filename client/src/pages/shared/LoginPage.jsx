
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/UserService";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    userLogin({ email, password })
      .then((res) => {
        toast.success("Login successful!");
        console.log(res.data);
        res.data.admin?.role === "admin"
          ? navigate("/admin/dashboard")
          : navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Login failed!");
      });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      } flex items-center justify-center`}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg ${
            isDarkMode
              ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div
        className={`${
          isDarkMode ? "bg-gray-700" : "bg-white"
        } rounded-lg shadow-lg p-8 transition-all duration-300 transform hover:scale-105 ${
          isDarkMode ? "hover:ring-4 hover:ring-blue-500" : ""
        }`}
        style={{
          width: "50vw",
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full p-2 border rounded-lg ${
              isDarkMode
                ? "bg-gray-600 text-white border-gray-500 focus:ring-blue-400 focus:border-blue-400"
                : "text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full p-2 border rounded-lg ${
              isDarkMode
                ? "bg-gray-600 text-white border-gray-500 focus:ring-blue-400 focus:border-blue-400"
                : "text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button onClick={navigateToSignup} className="text-blue-500 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
