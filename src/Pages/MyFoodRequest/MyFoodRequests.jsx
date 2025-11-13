import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../components/context/AuthContext";
import { toast } from "react-toastify";

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `https://plateshare-api-server.vercel.app/my-food-requests?email=${user.email}`
        );
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your food requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-green-600 text-4xl"></span>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div>
         <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 mt-10 text-center text-green-900">
        My Food Requests
      </h2>
      <p className="text-center text-green-800 font-semibold text-lg sm:text-xl mt-10">
        No food requests found.
      </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-20 mx-auto py-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
        My Food Requests
      </h2>

      <div className="hidden md:block w-full">
        <table className="min-w-full border border-green-200 rounded-xl table-fixed">
          <thead className="bg-green-50">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 w-24">
                Image
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">
                Food Name
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 w-24">
                Quantity
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 w-32">
                Status
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 w-40">
                Requested At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-200">
            {requests.map((r) => (
              <tr key={r._id} className="hover:bg-green-50 transition">
                <td className="px-3 py-3">
                  {r.foodDetails.food_image && (
                    <img
                      src={r.foodDetails.food_image}
                      alt={r.foodDetails.food_name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  )}
                </td>
                <td className="px-3 py-3 truncate">{r.foodDetails.food_name}</td>
                <td className="px-3 py-3 text-green-700 font-bold">
                  {r.quantityRequested}
                </td>
                <td className="px-3 py-3">{r.status}</td>
                <td className="px-3 py-3">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {requests.map((r) => (
          <div
            key={r._id}
            className="border border-green-200 rounded-xl p-4 shadow-sm flex gap-4"
          >
            {r.foodDetails.food_image && (
              <img
                src={r.foodDetails.food_image}
                alt={r.foodDetails.food_name}
                className="w-16 h-16 rounded-xl object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 truncate">
                {r.foodDetails.food_name}
              </h3>
              <p className="text-green-700 font-bold">Quantity: {r.quantityRequested}</p>
              <p className="text-green-800">Status: {r.status}</p>
              <p className="text-gray-600 text-sm">
                Requested At: {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFoodRequests;
