import React from "react";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import Services from "../../Pages/Services/Services";
import AdminRoute from "../AdminRoute/AdminRoute";
import Addservice from "../../Pages/Admin/Addservice";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Details from "../../Pages/Services/Details";
import Dashboard from "../../Pages/Admin/Dashboard";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/addservice",
        element: (
          <AdminRoute> <Addservice></Addservice> </AdminRoute>
        ),
      },
      {
        path: "/admindashboard",
        element: (
          <AdminRoute><Dashboard></Dashboard> </AdminRoute>
        ),
      },
      {
        path: "/service/:id",
        loader: ({ params }) =>
          fetch(`https://get-shield-server.vercel.app/servicedetails/${params.id}`),
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
