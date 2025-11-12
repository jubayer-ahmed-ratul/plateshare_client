import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { MapPin } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([
    // Dummy data for design purposes
    {
      _id: "f001",
      food_name: "Vegetable Fried Rice",
      food_image: "https://i.ibb.co/5L8Hq6F/fried-rice.jpg",
      food_quantity: 3,
      pickup_location: "Dhanmondi, Dhaka",
      expire_date: "2025-11-15T00:00:00.000Z",
    },
    {
      _id: "f002",
      food_name: "Chicken Biryani",
      food_image: "https://i.ibb.co/8PfZqCS/biryani.jpg",
      food_quantity: 5,
      pickup_location: "Uttara Sector 7, Dhaka",
      expire_date: "2025-11-14T00:00:00.000Z",
    },
  ]);

  return (
    <div className="px-4 sm:px-6 lg:px-20 mx-auto py-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-green-900">
        Manage My Foods
      </h2>

      {myFoods.length === 0 ? (
        <p className="text-center text-green-800 font-semibold text-xl">
          You haven't added any foods yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-green-200 rounded-xl">
            <thead className="bg-green-50">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Food Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Pickup Location</th>
                <th className="px-4 py-2">Expire Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.map((food) => (
                <tr key={food._id} className="hover:bg-green-50 transition">
                  <td className="px-4 py-2">
                    <img
                      src={food.food_image}
                      alt={food.food_name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold">{food.food_name}</td>
                  <td className="px-4 py-2 text-green-700 font-bold">
                    {food.food_quantity}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-1 text-green-600">
                    <MapPin /> {food.pickup_location}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(food.expire_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="btn btn-sm btn-warning flex items-center gap-1">
                      <FaEdit /> Update
                    </button>
                    <button className="btn btn-sm btn-error flex items-center gap-1">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
