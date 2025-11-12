import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootlayout from './components/layout/rootlayout.jsx';
import AuthProvider from './components/context/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
