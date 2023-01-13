import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvier/AuthProvider';
import { format } from 'date-fns';

const Dashboard = () => {
        const { user } = useContext(AuthContext);

    const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(`https://get-shield-server.vercel.app/admindashboard?email=${user?.email}`);
      const data = await res.json();
      return data;
    },
  });

    return (
        <div className='flex flex-row justify-center mt-12' style={{ minHeight: "100vh" }}>
            <div className='text-center'>
                <h1 className='mb-8 font-semibold text-xl'>All booked items are:</h1>

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-800">
                        <thead className="text-xs uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="py-3 px-6"></th>
                            <th scope="col" className="py-3 px-6">
                            Service Name
                            </th>
                            <th scope="col" className="py-3 px-2">
                            Client Email
                            </th>
                            <th scope="col" className="py-3 px-3">Booking Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings?.map((booking, i) => (
                            <tr key={booking._id} className=" px-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-50">

                            <td className="py-4 px-8">{i + 1}</td>
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {booking?.serviceName}
                            </th>

                            <td className="py-4 px-6">{booking?.clientEmail}</td>

                            <td className="py-4 px-4">{format(Date.parse(booking?.creationTime), 'Pp')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;