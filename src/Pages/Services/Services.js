import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../../Pages/Shared/Loading/Loading";
import Service from "./Service";

const Services = () => {
  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/services`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  refetch();

  return (
    <section className="mt-12">
      {services?.length > 0 && (
        <div>
          {
            <div>
              <p className="font-mono text-4xl text-center font-semibold">
                Our Services
              </p>
              <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-8 my-8">
                {services?.map((service) => (
                  <Service key={service._id} service={service}></Service>
                ))}
              </div>
            </div>
          }
        </div>
      )}
    </section>
  );
};

export default Services;
