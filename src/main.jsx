import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Rootlayout from './components/layout/rootlayout.jsx';
import AuthProvider from './components/context/AuthProvider.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Home from './components/Home/Home.jsx';
import AddFood from './Pages/AddFood/AddFood.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from './Routes/PrivateRoute.jsx';
import AvailableFoods from './Pages/AvailableFoods/AvailableFoods.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/available-foods", element: <AvailableFoods></AvailableFoods> },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
