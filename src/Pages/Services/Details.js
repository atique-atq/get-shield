import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvier/AuthProvider";

const Details = () => {
  let details = useLoaderData();
    const { user } = useContext(AuthContext);

    const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/bookservice?email=${user?.email}`);
      const data = await res.json();
      return data;
    },
  });

  //checking if item booked?
  let bookedServices = bookings?.map(booking => booking.serviceName)
  let isThisBooked = bookedServices.includes(details?.name);

  console.log('Items are booked:', isThisBooked)

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
          toast.success(`${serviceName} is booked successfully`);
          refetch();
          console.log("Booked service!!");
        });
    }
  };
  return (
    <div className="grid grid-cols-3 gap-4" style={{ minHeight: "100vh" }}>
      <div
        className="flex flex-row justify-center mt-20 mb-10 col-span-2">
        <div className="card w-11/12 md:w-10/12 h-96 bg-[#c9f2f5] text-primary-content shadow-2xl">
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

          {
            isThisBooked ? (
              <>
                <button
                      onClick={() => handleBuyService(details?._id, details?.name)}
                      className="btn btn-info" disabled>
                    Booked Successfully
                </button>
              </>
            ) : (
              <button
                      onClick={() => handleBuyService(details?._id, details?.name)}
                      className="btn btn-lg btn-info">
                    Book Now
                </button>
            )}
            </div>
          </div>
        </div>
      </div>

      <div  className="mt-20 mb-10 h-96 p-4">
        {
          bookedServices?.length > 0 ? (
            <div className="font-bold">
              <h1>You have booked {bookedServices?.length} services</h1>
              <ul className="text-green list-disc">
                {
                  bookedServices.map(service => <li className="font-semibold text-green-800 ml-4 mt-2">
                      {service}
                    </li>
                  )
                }
              </ul>
              <p className="text-sm font-normal text-gray-500 mt-12">Our expert team will contact with you soon. Please keep an eye on your mailbox.</p>
            </div>
          ):
          <>
          <h1>You Don't have book any services yet</h1>
          </>
            
        }

      </div>
    </div>
  );
};

export default Details;
