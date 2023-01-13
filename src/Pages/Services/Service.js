import React from "react";

const Service = ({ service }) => {
  const { name, description, requiredTime, price } = service;
  console.log("Name is:", name);

  return (
    <div>
      <div
        className="card w-96 bg-white shadow-xl ml-2 md:ml-0
      transition ease-in-out delay-00 hover:-translate-y-1 hover:scale-105 hover:bg-zinc-100 hover:shadow-white duration-900"
      >
        <div className="card-body">
          <h2 className="card-title text-green-800">{name}</h2>
          <div className="h-44 text-gray-700">
            <p title={description}>
              {description?.length > 200 ? (
                <span className="hover:cursor-pointer">
                  {" "}
                  {description.slice(0, 200)}....
                </span>
              ) : (
                description
              )}
            </p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-info">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
