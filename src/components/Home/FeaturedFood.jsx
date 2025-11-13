import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
          "https://plateshare-api-server.vercel.app/top-foods"
        );
        setTopFoods(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load top foods.");
      }
    };
    fetchTopFoods();
  }, []);

  const handleViewDetails = (foodId) => {
    const targetPath = `/food/${foodId}`; // Save target page
    if (!user) {
      toast.info("Please login to view details.");
      navigate("/login", { state: { from: targetPath } });
    } else {
      navigate(targetPath);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-20 mx-auto">
      <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center mt-16">
        Featured Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              className="card bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <figure>
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="h-48 w-full mt-4 rounded-2xl object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title text-2xl text-green-900">
                  {food.food_name}
                </h2>
                <p className="text-xl">
                  Serves{" "}
                  <span className="text-green-600 font-bold">
                    {food.food_quantity}
                  </span>{" "}
                  people
                </p>
                <p className="text-green-700 font-bold flex items-center gap-1">
                  <MapPin /> Pickup: {food.pickup_location}
                </p>
                <p>Donor: {food.donator_name}</p>

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
    </div>
  );
};

export default FeaturedFood;
