import React from "react";
import { Link } from "react-router-dom";

const Service = ({ service }) => {
  const { _id, name, description, requiredTime, price } = service;

  return (
    <div>
      <div
        className="card w-96 bg-white shadow-xl ml-2 md:ml-0
      transition ease-in-out delay-00 hover:-translate-y-1 hover:scale-105 hover:bg-zinc-100 hover:shadow-white duration-900"
      >
        <div className="card-body">
          <h2 className="card-title text-green-800">{name}</h2>
          <div className="h-24 text-gray-500">
            <p title={description}>
              {description?.length > 130 ? (
                <span className="hover:cursor-pointer">
                  {" "}
                  {description.slice(0, 130)}....
                </span>
              ) : (
                description
              )}
            </p>
          </div>
          <div className="card-actions justify-end">
            <Link to={`/service/${_id}`}>
              <button className="btn btn-info">View Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
