import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../components/context/AuthContext";
import { toast } from "react-toastify";
import { MapPin } from "lucide-react";
import FoodRequestsTable from "./FoodRequestsTable"; // Import your new table component

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
  });
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  // Redirect if user not logged in
  useEffect(() => {
    if (!user) {
      toast.info("Please login to view food details.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch food details
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
    if (user) fetchFood();
  }, [id, user]);

  // Update owner status once food is loaded
  useEffect(() => {
    if (food && user) {
      setIsOwner(user.email === food.donator_email);
    }
  }, [food, user]);

  // Fetch requests if user is owner
  useEffect(() => {
    if (isOwner) fetchRequests();
  }, [isOwner]);

  const fetchRequests = async () => {
    if (!food) return;
    setRequestsLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/foodRequests/${food._id}`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests.");
    } finally {
      setRequestsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit food request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location || !formData.reason || !formData.contactNo) {
      return toast.error("Please fill all fields.");
    }

    const requestData = {
      foodId: id,
      userEmail: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      location: formData.location,
      reason: formData.reason,
      contactNo: formData.contactNo,
      status: "pending",
    };

    try {
      await axios.post("http://localhost:3000/foodRequests", requestData);
      toast.success("Food request submitted!");
      setShowModal(false);
      setFormData({ location: "", reason: "", contactNo: "" });
    } catch (err) {
      console.error("Error submitting request:", err);
      toast.error("Failed to submit food request.");
    }
  };

  // Handle Accept / Reject actions
  const handleAction = async (requestId, action) => {
    try {
      await axios.patch(`http://localhost:3000/foodRequests/${requestId}`, { status: action });
      if (action === "accepted") {
        await axios.patch(`http://localhost:3000/update-food/${food._id}`, { food_status: "Donated" });
      }
      toast.success(`Request ${action}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
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
    <div className="px-4 sm:px-6 lg:px-20 mx-auto py-10">
      {/* Food Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">{food.food_name}</h2>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={food.food_image}
            alt={food.food_name}
            className="w-full md:w-1/2 h-64 md:h-auto rounded-2xl object-cover"
          />

          <div className="flex-1 flex flex-col gap-4">
            <p className="text-lg">
              <span className="font-semibold text-green-700">Quantity:</span> {food.food_quantity}
            </p>
            <p className="text-lg flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold text-green-700">Pickup Location:</span> {food.pickup_location}
            </p>
            <p className="text-lg">
              <span className="font-semibold text-green-700">Expires on:</span> {new Date(food.expire_date).toLocaleDateString()}
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

            {food.food_status !== "Available" && (
              <p className="text-red-600 font-semibold mt-3">This food has already been donated.</p>
            )}

            {/* Request Food Button */}
            {user.email !== food.donator_email && food.food_status === "Available" && (
              <button
                className="mt-6 w-full bg-green-800 text-white font-semibold py-2.5 rounded-lg hover:bg-green-900 transition text-lg"
                onClick={() => setShowModal(true)}
              >
                Request Food
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Request Food Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold text-green-800 mb-4 text-center">Request Food</h3>

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
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 rounded-lg text-white hover:bg-gray-500"
                  onClick={() => setShowModal(false)}
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
      )}

      {/* Owner Requests Table */}
      {isOwner && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-green-900 text-center">Food Requests</h3>
          <FoodRequestsTable
            requests={requests}
            loading={requestsLoading}
            handleAction={handleAction}
          />
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
