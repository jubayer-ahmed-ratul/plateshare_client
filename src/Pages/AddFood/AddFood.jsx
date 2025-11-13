import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../components/context/AuthContext";

const AddFood = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    quantity: "",
    location: "",
    expireDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateDate = (date) => {
    if (!date) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0); 
    
    console.log("Today:", today);
    console.log("Selected:", selected);
    console.log("Is valid:", selected >= today);
    
    return selected >= today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image || !formData.quantity || !formData.location || !formData.expireDate) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!validateDate(formData.expireDate)) {
      const today = new Date().toLocaleDateString();
      toast.error(`Expire Date must be today (${today}) or a future date.`);
      return;
    }

    if (parseInt(formData.quantity) <= 0) {
      toast.error("Quantity must be greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const dataToSubmit = {
        food_name: formData.name,
        food_image: formData.image,
        food_quantity: parseInt(formData.quantity),
        pickup_location: formData.location,
        expire_date: formData.expireDate,
        additional_notes: formData.notes || "",
        donator_name: user?.displayName || "Anonymous Donor",
        donator_email: user?.email || "",
        donator_image: user?.photoURL || "",
        food_status: "Available",
      };

      console.log("Submitting data:", dataToSubmit);

      const response = await axios.post(
        "https://plateshare-api-server.vercel.app/add-food",
        dataToSubmit
      );

      if (response.status === 201) {
        toast.success("Food added successfully!");
        setFormData({
          name: "",
          image: "",
          quantity: "",
          location: "",
          expireDate: "",
          notes: "",
        });
      }
    } catch (error) {
      console.error("Error adding food:", error);
      if (error.response) {
        toast.error(error.response.data.error || "Failed to add food. Please try again.");
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <section className="py-5 flex justify-center items-start">
      <ToastContainer />
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
          Add Food
        </h2>

        {/* Donator Info */}
        <div className="mb-6 p-4 bg-green-100 rounded-lg flex items-center gap-4">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-green-900 text-sm">
              {user?.displayName || "Anonymous Donor"}
            </p>
            <p className="text-green-800 text-xs">
              {user?.email || "Email not available"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-800 font-semibold mb-1 text-sm">
                Food Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg px-3 py-2.5 text-sm focus:outline-green-500 focus:border-green-500"
                placeholder="e.g., Sandwich, Rice, Curry"
                required
              />
            </div>

            <div>
              <label className="block text-green-800 font-semibold mb-1 text-sm">
                Food Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg px-3 py-2.5 text-sm focus:outline-green-500 focus:border-green-500"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-800 font-semibold mb-1 text-sm">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full border border-green-300 rounded-lg px-3 py-2.5 text-sm focus:outline-green-500 focus:border-green-500"
                placeholder="e.g., 3"
                required
              />
            </div>
            <div>
              <label className="block text-green-800 font-semibold mb-1 text-sm">
                Pickup Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg px-3 py-2.5 text-sm focus:outline-green-500 focus:border-green-500"
                placeholder="e.g., Dhanmondi, Dhaka"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1 text-sm">
              Expire Date *
            </label>
            <input
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg px-3 py-2.5 text-sm focus:outline-green-500 focus:border-green-500"
              required
              min={todayDate}
            />
            <p className="text-xs text-gray-600 mt-1">
              Must be today or a future date
            </p>
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1 text-sm">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg px-3 py-2.5 text-sm focus:outline-green-500 focus:border-green-500"
              rows={3}
              placeholder="Any special instructions, ingredients, or notes..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-3 rounded-lg transition text-sm ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800 shadow-md"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Food...
              </span>
            ) : (
              "Add Food for Donation"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddFood;