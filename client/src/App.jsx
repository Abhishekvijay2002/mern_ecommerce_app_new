import { RouterProvider } from 'react-router-dom';
import { router } from '../src/routes/router.jsx';
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { AuthProvider } from './AuthContext.jsx';
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
    
    <AuthProvider>
       <Toaster position="top-right"/>
    <RouterProvider router={router} />
</AuthProvider>
    </>
  );
}

export default App;

