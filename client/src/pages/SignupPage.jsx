import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { userRegister } from "../services/UserService";
import { toast } from 'sonner';

const SignupPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [values, setvalues] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const onSubmit = (e) => {
   userRegister(values).then((res) => {
      console.log(res);
      toast.success("signup successful!");

      navigate("/");
      
    }).catch((err) => {
      toast.error(err.response?.data?.error ||"signup failed!");
      console.log(err);

  })
    e.preventDefault(); 
    console.log(values, 'values');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section: Signup Form */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name" name="name"  onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                  className={`w-full p-2 border rounded-lg ${
                    isDarkMode
                      ? "bg-gray-600 text-white border-gray-500 focus:ring-blue-400 focus:border-blue-400"
                      : "text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"  name="email" onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                  className={`w-full p-2 border rounded-lg ${
                    isDarkMode
                      ? "bg-gray-600 text-white border-gray-500 focus:ring-blue-400 focus:border-blue-400"
                      : "text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password" name="password"   onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                  className={`w-full p-2 border rounded-lg ${
                    isDarkMode
                      ? "bg-gray-600 text-white border-gray-500 focus:ring-blue-400 focus:border-blue-400"
                      : "text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="password" 
                  id="confirmPassword" name="confirmpassword"  onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })}
                  className={`w-full p-2 border rounded-lg ${
                    isDarkMode
                      ? "bg-gray-600 text-white border-gray-500 focus:ring-blue-400 focus:border-blue-400"
                      : "text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
              <button 
                type="submit"
                className={`w-full px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
            <p className="mb-4">
              Already have an account? Click the button below to log in and stay connected with us.
            </p>
            <button onClick={navigateToLogin}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;