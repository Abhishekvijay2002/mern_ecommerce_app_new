import { RouterProvider } from 'react-router-dom';
import { router } from '../src/routes/router.jsx';
import React from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from './theme-context.jsx';
import { AuthProvider } from './AuthContext.jsx';

function App() {
  return (
    <>
    <AuthProvider>
    <ThemeProvider>
    <Toaster position="top-right"/>
    <RouterProvider router={router} />
    </ThemeProvider>
    </AuthProvider>
    </>
  );
}

export default App;

