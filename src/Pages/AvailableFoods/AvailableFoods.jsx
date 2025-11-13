import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { MapPin } from 'lucide-react';
import { AuthContext } from '../../components/context/AuthContext';
import { toast } from 'react-toastify';

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAvailableFoods = async () => {
      try {
        const response = await axios.get('https://plateshare-api-server.vercel.app/available-foods');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching available foods:', error);
        toast.error('Failed to load available foods.');
      }
    };

    fetchAvailableFoods();
  }, []);

  const handleViewDetails = (foodId) => {
    const targetPath = `/food/${foodId}`;
    if (!user) {
      toast.info('Please login to view details.');
      // Use React Router state instead of localStorage
      navigate('/login', { state: { from: targetPath } });
    } else {
      navigate(targetPath);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-20 mx-auto">
      <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center mt-16">
        Available Foods
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.length === 0 ? (
          <div className="flex flex-col items-center col-span-full py-20 gap-4">
            <span className="loading loading-spinner text-success text-4xl"></span>
            <p className="text-xl text-green-900 font-semibold">Loading foods...</p>
          </div>
        ) : (
          foods.map((food) => (
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
                <h2 className="card-title text-2xl text-green-900">{food.food_name}</h2>

                <p className="text-green-700 font-semibold flex items-center gap-1">
                  <MapPin /> Pickup: {food.pickup_location}
                </p>

                <p>
                  Quantity: <span className="text-green-600 font-bold">{food.food_quantity}</span>
                </p>

                <p>
                  Expires on: <span className="font-semibold">{new Date(food.expire_date).toLocaleDateString()}</span>
                </p>

                <div className="flex items-center gap-2 mt-2">
                  {food.donator_image && (
                    <img
                      src={food.donator_image}
                      alt={food.donator_name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="font-semibold">{food.donator_name}</span>
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
    </div>
  );
};

export default AvailableFoods;
