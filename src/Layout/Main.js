import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <h1>This is footer</h1>
    </div>
  );
};

export default Main;
