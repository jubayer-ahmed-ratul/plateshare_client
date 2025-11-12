import React, { useState, useContext } from "react";
import axios from "axios";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const dataToSubmit = {
      food_name: formData.name,
      food_image: formData.image,
      food_quantity: parseInt(formData.quantity), 
      pickup_location: formData.location,
      expire_date: formData.expireDate,
      additional_notes: formData.notes || "",
      donator_name: user?.displayName || "",
      donator_email: user?.email || "",
      donator_image: user?.photoURL || "",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-food",
        dataToSubmit
      );

      if (response.status === 201) {
        alert("Food added successfully!");
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
      alert("Failed to add food. Please try again.");
    }
  };

  return (
    <section className="py-5 bg-green-50 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
          Add Food
        </h2>

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
              {user?.displayName || "Name not set"}
            </p>
            <p className="text-green-800 text-xs">
              {user?.email || "Email not set"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-800 font-semibold mb-1 text-sm">
                Food Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg px-3 py-1.5 text-sm"
                placeholder="e.g., Sandwich, Rice"
                required
              />
            </div>
            <div>
              <label className="block text-green-800 font-semibold mb-1 text-sm">
                Food Image
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg px-3 py-1.5 text-sm"
                placeholder="Image URL (from imgbb)"
                required
              />
            </div>
          </div>

    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-800 font-semibold mb-1 text-sm">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg px-3 py-1.5 text-sm"
                placeholder="e.g., 3"
                required
              />
            </div>
            <div>
              <label className="block text-green-800 font-semibold mb-1 text-sm">
                Pickup Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-lg px-3 py-1.5 text-sm"
                placeholder="e.g., 123 Main St"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-green-800 font-semibold mb-1 text-sm">
              Expire Date
            </label>
            <input
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg px-3 py-1.5 text-sm"
              required
            />
          </div>

        
          <div>
            <label className="block text-green-800 font-semibold mb-1 text-sm">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-green-300 rounded-lg px-3 py-1.5 text-sm"
              rows={3}
              placeholder="Any extra details..."
            ></textarea>
          </div>

         
          <button
            type="submit"
            className="w-full bg-green-800 text-white font-semibold py-2.5 rounded-lg hover:bg-green-900 transition text-sm"
          >
            Add Food
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddFood;
