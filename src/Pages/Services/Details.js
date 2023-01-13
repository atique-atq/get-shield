import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvier/AuthProvider";

const Details = () => {
  let details = useLoaderData();
  const { user } = useContext(AuthContext);

  const handleBuyService = (serviceId, serviceName) => {
    let answer = window.confirm("Want to Booked this Service?");
    if (answer) {
      const bookedService = {
        serviceId: serviceId,
        serviceName: serviceName,
        clientEmail: user?.email,
        creationTime: new Date(),
      };
      console.log('to be booked:', bookedService);

      fetch("http://localhost:5000/bookservice", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookedService),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Booked service!!");
        });
    }
  };
  return (
    <div
      className="flex flex-row justify-center mt-20 mb-10"
      style={{ minHeight: "100vh" }}
    >
      <div className="card w-11/12 md:w-6/12 h-96 bg-[#c9f2f5] text-primary-content shadow-xl">
        <div className="card-body">
          <h2 className="text-lg md:text-2xl">
            Service Name: <span className="font-semibold">{details?.name}</span>{" "}
          </h2>
          <p className="mt-8 text-sm md:text-lg">
            Description : {details?.description}
          </p>
          <p className="mt-8 font-bold text-lg text-green-700">
            Price : {details?.price}
          </p>
          <div className="card-actions justify-end">
            <button
              onClick={() => handleBuyService(details?._id, details?.name)}
              className="btn btn-lg btn-info"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
