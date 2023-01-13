import React from "react";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import Services from "../../Pages/Services/Services";
import AdminRoute from "../AdminRoute/AdminRoute";
import Addservice from "../../Pages/Admin/Addservice";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
          <AdminRoute>
            <Addservice></Addservice>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
