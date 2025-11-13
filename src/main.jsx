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
import FoodDetails from './Pages/FoodDetails/FoodDetails.jsx';
import ManageMyFoods from './Pages/ManageMyFoods/ManageMyFoods.jsx';
import MyFoodRequests from './Pages/MyFoodRequest/MyFoodRequests.jsx';
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx';
import "react-toastify/dist/ReactToastify.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/available-foods", element: <AvailableFoods></AvailableFoods> },
      { path: "*", element: <ErrorPage/> },
      
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-req",
        element: (
          <PrivateRoute>
            <MyFoodRequests></MyFoodRequests>
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
