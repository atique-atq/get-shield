import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvier/AuthProvider";
import Loading from "../Shared/Loading/Loading";

const Login = () => {
  const { signIn, googleSignIn, loading } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn(googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.displayName, user.email);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((er) => {
        console.log("error:", er);
        toast.error("wrong credential");
        form.reset();
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email, role: "user" };
    fetch("https://get-shield-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("user saved!");
      });
  };

  return (
    <div className="my-8" style={{ minHeight: "100vh" }}>
      <>{loading && <Loading></Loading>}</>
      <div className="hero w-full my-5  rounded-lg">
        <div className="flex-col lg:flex-row items-center justify-center justify-items-center">
          <div className="card  w-96  shadow-2xl bg-base-100 py-6">
            <h3 className="text-4xl text-center font-bold py-0 my-0">Login</h3>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                {/* <input className="btn bg-[#fd6288] border-none hover:bg-orange-700 text-lg" type="submit" value="Log in" /> */}
                <input
                  className="btn btn-info border-none hover:bg-success text-lg"
                  type="submit"
                  value="Log in"
                />
              </div>
            </form>
            <p className="text-center mb-4">
              Don't Have an Account?{" "}
              <Link className="text-orange-600 font-bold" to="/signup">
                Sign Up
              </Link>{" "}
            </p>

            <div className="divider my-0">OR</div>
            <button
              className="btn btn-outline btn-success border-0 rounded-none w-full my-0 py-0"
              onClick={handleGoogleSignIn}
            >
              <span className="px-3 text-orange-600">
                {" "}
                <FaGoogle></FaGoogle>
              </span>
              <span className="text-black"> Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
