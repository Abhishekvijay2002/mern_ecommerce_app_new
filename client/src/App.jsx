import { RouterProvider } from 'react-router-dom';
import { router } from '../src/routes/router.jsx';
import React from 'react';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
    <Toaster position="top-right"/>
    <RouterProvider router={router} />
    </>
  );
}

export default App;

