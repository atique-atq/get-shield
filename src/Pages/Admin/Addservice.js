import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvier/AuthProvider";

const Addservice = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const navigate = useNavigate();

  const handleAddService = (data) => {
    const service = {
      name: data.name,
      description: data.description,
      requiredTime: data.requiredTime,
      price: data.price,
      creationTime: new Date(),
    };

    // save service to the database
    fetch("http://localhost:5000/service", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(service),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success(`${data.name} is added successfully`);
        reset();
      });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="w-full md:w-10/12 p-7 mx-auto">
        <h2 className="text-2xl text-[#0DA5E9] md:text-center text-left font-bold mb-8">
          Add a Service
        </h2>
        <form
          onSubmit={handleSubmit(handleAddService)}
          className="border shadow-xl py-12 px-3 md:px-6 mt-3 mx-auto"
        >
          <div>
            <div className="form-control w-full p-2 mb-3">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  <span className="label-text font-semibold mr-1 md:mr-5">
                    Service Name:
                  </span>
                </label>

                <input
                  type="text"
                  {...register("name", {
                    required: "Service Name is Required",
                  })}
                  className="input input-bordered w-full rounded-none"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="form-control w-full p-2 mb-3">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text font-semibold mr-1 md:mr-5">
                    Description:
                  </span>
                </label>
                <textarea
                  rows={4}
                  type="text"
                  {...register("description", {
                    required: "Description is Required",
                  })}
                  className="input input-bordered w-full rounded-none p-3"
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="form-control w-full p-2 mb-3 flex flex-row justify-between items-center">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text font-semibold mr-1 md:mr-10">
                    Required Time:
                  </span>
                </label>

                <input
                  type="text"
                  {...register("requiredTime", {
                    required: "Required Time is Required",
                  })}
                  className="input input-bordered w-full rounded-none"
                />
              </div>
              {errors.requiredTime && (
                <p className="text-red-500 text-xs">
                  {errors.requiredTime.message}
                </p>
              )}

              <div className="flex justify-center items-center max-w-lg ml-4">
                <label className="label">
                  {" "}
                  <span className="label-text font-semibold mr-1 md:mr-5">
                    Price in USD:
                  </span>
                </label>
                <input
                  type="text"
                  {...register("price", {
                    required: "Price is required",
                  })}
                  className="input input-bordered w-full rounded-none"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs">{errors.price.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <input
                className="bg-[#0DA5E9] p-3 md:w-80 w-64 rounded-md mt-1 hover:cursor-pointer hover:bg-green-700"
                value="Add Service"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addservice;
