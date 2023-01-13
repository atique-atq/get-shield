import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvier/AuthProvider";
import notFoundImage from "../../../assets/404.webp";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="mx-4 md:mx-12 mt-20 flex justify-center items-center mb-72 md:mb-20">
        <div>
          <p className="text-red-600 text-center text-3xl font-mono font-bold">
            Page Not Found{" "}
            <small className="italic text-sm text-gray-500">
              {error.statusText || error.message}
            </small>
          </p>
          <img
            className="w-9/12 md:w-8/12 mx-auto"
            src={notFoundImage}
            alt=""
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DisplayError;
