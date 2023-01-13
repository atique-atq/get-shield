import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const menuItems = (
    <>
      <li className="font-bold text-gray-600 ml-3">
        <Link to="/">Home</Link>
      </li>
      <li className="font-bold text-gray-600 ml-3">
        <Link to="/allServices">Dashboard</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-gray-100 px-5 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <a className="text-xl font-semibold font-mono text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-600">
            GetSheild
          </a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
