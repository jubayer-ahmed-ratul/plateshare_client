import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../components/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapPin } from "lucide-react";

const RequestFoodModal = ({ formData, handleChange, handleSubmit, onClose }) => (
  <div className="absolute top-0 left-0 w-full flex justify-center mt-10 z-50">
    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border border-green-200">
      <h3 className="text-2xl font-semibold text-green-800 mb-4 text-center">
        Request Food
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:outline-green-700"
            placeholder="Enter your location"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Why Need Food</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 h-24 focus:outline-green-700"
            placeholder="Explain why you need food"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Contact No.</label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:outline-green-700"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Quantity Needed</label>
          <input
            type="number"
            name="quantityRequested"
            min="1"
            max={formData.maxQuantity}
            value={formData.quantityRequested}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1 focus:outline-green-700"
            placeholder="Enter number of portions"
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            Maximum available: {formData.maxQuantity}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 rounded-lg text-white hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 rounded-lg text-white hover:bg-green-800"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  </div>
);

const FoodRequestsTable = ({ requests, loading, handleAction, foodQuantity }) => {
  if (loading) return <p className="text-center">Loading requests...</p>;
  if (!requests || requests.length === 0)
    return <p className="text-center text-gray-600">No requests yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Reason</th>
            <th className="px-4 py-2 border">Contact No.</th>
            <th className="px-4 py-2 border">Quantity Requested</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="text-center hover:bg-gray-50">
              <td className="px-4 py-2 border">{req.name || "-"}</td>
              <td className="px-4 py-2 border">{req.userEmail}</td>
              <td className="px-4 py-2 border">{req.location}</td>
              <td className="px-4 py-2 border max-w-xs truncate" title={req.reason}>
                {req.reason}
              </td>
              <td className="px-4 py-2 border">{req.contactNo}</td>
              <td className="px-4 py-2 border">{req.quantityRequested}</td>
              <td className="px-4 py-2 border">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  req.status === "pending" 
                    ? "bg-green-200 text-green-800" 
                    : req.status === "accepted" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {req.status}
                </span>
              </td>
              <td className="px-4 py-2 border">
                {req.status === "pending" ? (
                  <div className="flex justify-center gap-2">
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      onClick={() => handleAction(req._id, "accepted")}
                      disabled={req.quantityRequested > foodQuantity}
                      title={req.quantityRequested > foodQuantity ? "Not enough quantity available" : ""}
                    >
                      Accept
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      onClick={() => handleAction(req._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contactNo: "",
    quantityRequested: 1,
    maxQuantity: 1
  });
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  useEffect(() => {
    if (!user) {
      // Allow public access but limit functionality
      console.log("Public access - limited functionality");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`https://plateshare-api-server.vercel.app/food/${id}`);
        setFood(response.data);
        
        if (user) {
          setFormData(prev => ({
            ...prev,
            maxQuantity: response.data.food_quantity,
            quantityRequested: Math.min(prev.quantityRequested, response.data.food_quantity)
          }));
        }
      } catch (error) {
        console.error("Error fetching food details:", error);
        toast.error("Failed to load food details.");
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id, user]);

  useEffect(() => {
    if (food && user) {
      setIsOwner(user.email === food.donator_email);
    }
  }, [food, user]);

  useEffect(() => {
    if (isOwner && food) {
      fetchOwnerRequests();
    }
  }, [isOwner, food]);

  useEffect(() => {
    const checkUserRequest = async () => {
      if (!user || !food) return;
      
      try {
        const response = await axios.get(`https://plateshare-api-server.vercel.app/my-food-requests?email=${user.email}`);
        const userRequests = response.data;
        
        const hasRequested = userRequests.some(
          req => req.foodId === food._id && req.status === "pending"
        );
        
        setAlreadyRequested(hasRequested);
      } catch (err) {
        console.error("Error checking user requests:", err);
      }
    };
    
    checkUserRequest();
  }, [food, user]);

  const fetchOwnerRequests = async () => {
    if (!food || !user) return;
    
    setRequestsLoading(true);
    try {
      const response = await axios.get(`https://plateshare-api-server.vercel.app/owner-food-requests?email=${user.email}`);
      
      const foodRequests = response.data.filter(req => req.foodId === food._id);
      setRequests(foodRequests);
    } catch (err) {
      console.error("Error fetching owner requests:", err);
      toast.error("Failed to load requests.");
    } finally {
      setRequestsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === "quantityRequested" ? parseInt(value) || 1 : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { location, reason, contactNo, quantityRequested } = formData;
    
    if (!location || !reason || !contactNo || !quantityRequested) {
      return toast.error("Please fill all fields.");
    }

    if (quantityRequested < 1) {
      return toast.error("Quantity must be at least 1.");
    }

    if (quantityRequested > food.food_quantity) {
      return toast.error(`Only ${food.food_quantity} portion(s) available.`);
    }

    if (alreadyRequested) {
      return toast.info("You have already requested this food item.");
    }

    const requestData = {
      foodId: food._id,
      userEmail: user.email,
      name: user.displayName || "User",
      photoURL: user.photoURL || "",
      location,
      reason,
      contactNo,
      quantityRequested: quantityRequested,
    };

    try {
      await axios.post("https://plateshare-api-server.vercel.app/foodRequests", requestData);
      toast.success("Food request submitted successfully!");
      setShowModal(false);
      setFormData({ 
        location: "", 
        reason: "", 
        contactNo: "", 
        quantityRequested: 1,
        maxQuantity: food.food_quantity 
      });
      setAlreadyRequested(true);
      
      const updatedFood = await axios.get(`https://plateshare-api-server.vercel.app/food/${id}`);
      setFood(updatedFood.data);
      
    } catch (err) {
      console.error("Error submitting request:", err);
      const errorMessage = err.response?.data?.error || "Failed to submit food request.";
      toast.error(errorMessage);
      
      if (errorMessage.includes("already requested")) {
        setAlreadyRequested(true);
      }
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      await axios.patch(`https://plateshare-api-server.vercel.app/foodRequests/${requestId}`, { 
        status: action 
      });

      toast.success(`Request ${action} successfully!`);
      
      fetchOwnerRequests();
      const updatedFood = await axios.get(`https://plateshare-api-server.vercel.app/food/${id}`);
      setFood(updatedFood.data);
      
    } catch (err) {
      console.error("Error updating request:", err);
      toast.error("Failed to update request.");
    }
  };

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
    <div className="px-4 sm:px-6 lg:px-20 mx-auto py-10 relative">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          backgroundColor: '#16a34a',
          color: '#ffffff'
        }}
      />
      
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
          {food.food_name}
        </h2>
        
        {/* Single Image Section */}
        <div className="mb-8">
          <img
            src={food.food_image}
            alt={food.food_name}
            className="w-full h-64 md:h-80 rounded-2xl object-cover shadow-md mx-auto"
          />
        </div>

        {/* Overview / Description Section */}
        <div className="mb-8 bg-green-50 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-green-900 mb-4">Overview</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            {food.additional_notes || 
              `${food.food_name} is a delicious and fresh food item available for sharing with the community. 
              This nutritious meal has been prepared with care and is ready for pickup. Perfect for individuals 
              or families looking for a quality meal. The donor has ensured that this food meets safety standards 
              and is suitable for consumption.`
            }
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              Fresh
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              Ready to Eat
            </span>
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              Community Shared
            </span>
          </div>
        </div>

        {/* Key Information / Specs / Rules Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Food Specifications */}
          <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              Food Specifications
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Quantity Available:</span>
                <span className={`font-bold ${food.food_quantity === 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {food.food_quantity} portions
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Expiry Date:</span>
                <span className="font-semibold text-gray-800">
                  {new Date(food.expire_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Food Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  food.food_status === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {food.food_status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Donated by:</span>
                <span className="font-semibold text-gray-800">{food.donator_name}</span>
              </div>
            </div>
          </div>

          {/* Pickup Information & Rules */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Pickup Information & Rules
            </h3>
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-700 block mb-1">Pickup Location:</span>
                <span className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg block">
                  {food.pickup_location}
                </span>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <h4 className="font-semibold text-green-800 mb-2">Important Rules:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Please arrive on time for pickup</li>
                  <li>• Bring your own container if needed</li>
                  <li>• Contact donor before pickup</li>
                  <li>• Check food quality before consuming</li>
                  <li>• Be respectful and grateful</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="bg-gray-50 rounded-2xl p-6">
          {!user ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Please login to request this food item</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Login to Request Food
              </button>
            </div>
          ) : user.email !== food.donator_email && food.food_status === "Available" && food.food_quantity > 0 ? (
            <div className="text-center">
              <button
                className={`w-full max-w-md font-semibold py-3 rounded-lg text-lg transition-colors ${
                  alreadyRequested 
                    ? "bg-gray-400 cursor-not-allowed text-gray-600" 
                    : "bg-green-800 hover:bg-green-900 text-white"
                }`}
                onClick={() => {
                  setFormData(prev => ({ ...prev, maxQuantity: food.food_quantity }));
                  setShowModal(true);
                }}
                disabled={alreadyRequested}
              >
                {alreadyRequested ? "Already Requested" : "Request This Food"}
              </button>
            </div>
          ) : food.food_status !== "Available" ? (
            <p className="text-red-600 font-semibold text-center py-3 bg-red-50 rounded-lg">
              This food is no longer available.
            </p>
          ) : food.food_quantity === 0 && food.food_status === "Available" ? (
            <p className="text-orange-600 font-semibold text-center py-3 bg-orange-50 rounded-lg">
              All portions have been requested. Waiting for donor confirmation.
            </p>
          ) : user.email === food.donator_email ? (
            <p className="text-blue-600 font-semibold text-center py-3 bg-blue-50 rounded-lg">
              This is your food donation. Manage requests below.
            </p>
          ) : null}
        </div>
      </div>

      {showModal && (
        <RequestFoodModal
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}

      {isOwner && user && (
        <div className="mt-8 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-green-900 text-center">
            Food Requests Management
          </h3>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FoodRequestsTable
              requests={requests}
              loading={requestsLoading}
              handleAction={handleAction}
              foodQuantity={food.food_quantity}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;