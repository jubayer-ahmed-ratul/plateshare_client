import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import { toast } from "react-toastify";

const FeaturedFood = () => {
  const [topFoods, setTopFoods] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const res = await axios.get(
          `https://plateshare-api-server.vercel.app/top-foods?t=${Date.now()}`
        );
        console.log("API Response:", res.data);
        setTopFoods(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load top foods.");
      }
    };
    fetchTopFoods();
  }, []);

  const handleViewDetails = (foodId) => {
    navigate(`/food/${foodId}`);
  };

  return (
    <div id="featured-section" className="px-4 sm:px-6 lg:px-20 mx-auto bg-white dark:bg-slate-900 py-16">
      <h2 className="featured-title text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
        Featured Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
        {topFoods.length === 0 ? (
          <div className="flex flex-col items-center col-span-full py-20 gap-4">
            <span className="loading loading-spinner text-success text-4xl"></span>
            <p className="text-xl text-green-900 font-semibold">
              Loading top foods...
            </p>
          </div>
        ) : (
          topFoods.map((food) => (
            <div
              key={food._id}
              className="card bg-themed-card dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 h-full flex flex-col w-full max-w-sm border border-gray-200 dark:border-gray-600"
            >
              <figure className="flex-shrink-0">
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="h-48 w-full mt-4 rounded-2xl object-cover"
                />
              </figure>

              <div className="card-body flex-grow flex flex-col">
                <h2 className="food-item-name card-title text-2xl text-green-900">
                  {food.food_name}
                </h2>

                <p className="text-themed-secondary text-sm flex-grow">
                  {food.additional_notes ||
                    food.food_name +
                      " - Fresh and delicious food ready for pickup. Perfect for sharing with the community."}
                </p>

                <div className="space-y-2 mt-3">
                  <p className="text-xl">
                    Serves{" "}
                    <span className="text-green-600 font-bold">
                      {food.food_quantity}
                    </span>{" "}
                    people
                  </p>
                  <p className="text-green-700 font-bold flex items-center gap-1">
                    <MapPin size={16} /> Pickup: {food.pickup_location}
                  </p>
                  <p className="text-themed-secondary">Donor: {food.donator_name}</p>

                  <div className="flex justify-between items-center text-sm text-themed-tertiary mt-2">
                    <span>
                      {food.expired_date
                        ? `Expires: ${new Date(food.expired_date).toLocaleDateString()}`
                        : "Fresh"}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Available
                    </span>
                  </div>
                </div>

                <div className="card-actions justify-center mt-4">
                  <button
                    onClick={() => handleViewDetails(food._id)}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-10">
        <NavLink to="/available-foods">
          <button className="btn btn-primary px-8 py-3 text-lg font-bold">
            Show All
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default FeaturedFood;
