import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../components/context/AuthContext";
import { toast } from "react-toastify";
import { MapPin } from "lucide-react";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.info("Please login to view food details.");
      navigate("/login");
    }
  }, [user, navigate]);

  
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/food/${id}`);
        setFood(response.data);
      } catch (error) {
        console.error("Error fetching food details:", error);
        toast.error("Failed to load food details.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFood();
    }
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner text-4xl text-green-700"></span>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-600 font-semibold">Food not found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-20 mx-auto py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
          {food.food_name}
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={food.food_image}
            alt={food.food_name}
            className="w-full md:w-1/2 h-64 md:h-auto rounded-2xl object-cover"
          />

          <div className="flex-1 flex flex-col gap-4">
            <p className="text-lg">
              <span className="font-semibold text-green-700">Quantity:</span>{" "}
              {food.food_quantity}
            </p>
            <p className="text-lg flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold text-green-700">Pickup Location:</span>{" "}
              {food.pickup_location}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-green-700">Expires on:</span>{" "}
              {new Date(food.expire_date).toLocaleDateString()}
            </p>

            {food.additional_notes && (
              <p className="text-lg">
                <span className="font-semibold text-green-700">Notes:</span> {food.additional_notes}
              </p>
            )}

            <div className="flex items-center gap-3 mt-4">
              {food.donator_image && (
                <img
                  src={food.donator_image}
                  alt={food.donator_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-green-900">{food.donator_name}</p>
                <p className="text-green-800 text-sm">{food.donator_email}</p>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-green-800 text-white font-semibold py-2.5 rounded-lg hover:bg-green-900 transition text-lg"
              onClick={() => toast.info("Request Food functionality coming soon!")}
            >
              Request Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
