import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../services/UserService";
import { toast } from "sonner";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    userRegister(values)
      .then((res) => {
        toast.success("Signup successful!");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.error|| "Signup failed!");
        console.log(err);
      });
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const navigateToLogin = () => navigate("/login");
  const navigateHome = () => navigate("/");

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} p-4`}>
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-300 text-gray-800 hover:bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Card Container */}
      <div className={`w-full max-w-md ${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6 md:p-8 transition-all duration-300`}>
        <div className="grid grid-cols-1 gap-6">
          
          {/* Signup Form */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={onSubmit}>
              {["name", "email", "password", "confirmpassword"].map((field, idx) => (
                <div key={idx}>
                  <label htmlFor={field} className="block text-sm font-medium capitalize">{field === "confirmpassword" ? "Confirm Password" : field}</label>
                  <input
                    type={field.includes("password") ? "password" : "text"}
                    id={field}
                    name={field}
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                    className={`w-full p-2 border rounded-lg ${isDarkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400 focus:border-blue-400" : "bg-white text-gray-700 border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Sign Up
              </button>
            </form>
          </div>

        </div>

        {/* Login Prompt Below Form */}
        <div className="mt-4 text-center space-y-2">
          <p>
            Already have an account?{" "}
            <button onClick={navigateToLogin} className="text-blue-500 hover:underline">
              Log in
            </button>
          </p>
          <button
            onClick={navigateHome}
            className={`text-sm px-3 py-1 rounded-md mt-2 ${isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;


