import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { MapPin } from "lucide-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchMyFoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://plateshare-api-server.vercel.app/my-foods?email=${user?.email}`
      );
      setMyFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error("Failed to load your foods.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyFoods();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://plateshare-api-server.vercel.app/delete-food/${id}`
          );
          if (res.data.deletedCount > 0) {
            toast.success("Food deleted successfully!");
            fetchMyFoods();
          }
        } catch (error) {
          console.error("Error deleting food:", error);
          toast.error("Failed to delete food.");
        }
      }
    });
  };

  const openModal = (food) => {
    setSelectedFood({ ...food, expire_date: food.expire_date.slice(0, 10) });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFood(null);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      // Only include editable fields
      const updatedFood = {
        food_name: selectedFood.food_name,
        food_image: selectedFood.food_image,
        food_quantity: Number(selectedFood.food_quantity),
        pickup_location: selectedFood.pickup_location,
        expire_date: new Date(selectedFood.expire_date),
        additional_notes: selectedFood.additional_notes || "",
      };

      const res = await axios.patch(
        `https://plateshare-api-server.vercel.app/update-food/${selectedFood._id}`,
        updatedFood
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Food updated successfully!");
        fetchMyFoods();
        closeModal();
      } else {
        toast.info("No changes were made.");
      }
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error("Failed to update food.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-green-600 text-4xl"></span>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-20 mx-auto py-10">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
        Manage My Foods
      </h2>

      {myFoods.length === 0 ? (
        <p className="text-center text-green-800 font-semibold text-lg sm:text-xl">
          You haven't added any foods yet.
        </p>
      ) : (
        <>
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
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">
                    Pickup Location
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 w-32">
                    Expire Date
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 w-40">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-200">
                {myFoods.map((food) => (
                  <tr key={food._id} className="hover:bg-green-50 transition">
                    <td className="px-3 py-3">
                      <div className="flex items-center h-20">
                        <img
                          src={food.food_image}
                          alt={food.food_name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center h-20 truncate">
                        {food.food_name}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center h-20 text-green-700 font-bold">
                        {food.food_quantity}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1 h-20 truncate">
                        <MapPin className="flex-shrink-0 w-4 h-4" />
                        {food.pickup_location}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center h-20">
                        {new Date(food.expire_date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2 h-20">
                        <button
                          onClick={() => openModal(food)}
                          className="btn btn-sm btn-warning flex items-center gap-1 px-2"
                        >
                          <FaEdit className="text-xs" /> Update
                        </button>
                        <button
                          onClick={() => handleDelete(food._id)}
                          className="btn btn-sm btn-error flex items-center gap-1 px-2"
                        >
                          <FaTrash className="text-xs" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col gap-4">
            {myFoods.map((food) => (
              <div
                key={food._id}
                className="border border-green-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900">
                      {food.food_name}
                    </h3>
                    <p className="text-green-700 font-bold">
                      Quantity: {food.food_quantity}
                    </p>
                    <p className="flex items-center gap-1 text-green-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      {food.pickup_location}
                    </p>
                    <p className="text-sm text-gray-600">
                      Expire: {new Date(food.expire_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openModal(food)}
                    className="btn btn-sm btn-warning flex-1 flex items-center justify-center gap-1"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="btn btn-sm btn-error flex-1 flex items-center justify-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {modalOpen && selectedFood && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-xl p-6 w-11/12 sm:w-96 relative shadow-lg pointer-events-auto">
            <h3 className="text-xl font-semibold mb-4 text-green-900">
              Update Food
            </h3>
            <form className="flex flex-col gap-3" onSubmit={handleModalSubmit}>
              <input
                type="text"
                name="food_name"
                value={selectedFood.food_name}
                onChange={handleModalChange}
                placeholder="Food Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                name="food_quantity"
                value={selectedFood.food_quantity}
                onChange={handleModalChange}
                placeholder="Quantity"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="pickup_location"
                value={selectedFood.pickup_location}
                onChange={handleModalChange}
                placeholder="Pickup Location"
                className="input input-bordered w-full"
                required
              />
              <input
                type="date"
                name="expire_date"
                value={selectedFood.expire_date}
                onChange={handleModalChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="food_image"
                value={selectedFood.food_image}
                onChange={handleModalChange}
                placeholder="Image URL"
                className="input input-bordered w-full"
                required
              />

              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="btn btn-success flex-1"
                >
                  {updating ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-error flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
