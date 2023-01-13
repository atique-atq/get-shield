import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./Router/Routes/Routes";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
