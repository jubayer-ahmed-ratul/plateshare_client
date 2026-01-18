import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { MapPin, Search, Filter, SortAsc } from 'lucide-react';
import { AuthContext } from '../../components/context/AuthContext';
import { toast } from 'react-toastify';

const AvailableFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [quantityFilter, setQuantityFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchAvailableFoods = async () => {
      try {
        const response = await axios.get('https://plateshare-api-server.vercel.app/available-foods');
        setAllFoods(response.data);
        setFilteredFoods(response.data);
      } catch (error) {
        console.error('Error fetching available foods:', error);
        toast.error('Failed to load available foods.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableFoods();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...allFoods];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(food => 
        food.food_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.donator_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(food => 
        food.pickup_location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Quantity filter
    if (quantityFilter) {
      if (quantityFilter === 'low') {
        filtered = filtered.filter(food => food.food_quantity >= 1 && food.food_quantity <= 2);
      } else if (quantityFilter === 'medium') {
        filtered = filtered.filter(food => food.food_quantity >= 3 && food.food_quantity <= 5);
      } else if (quantityFilter === 'high') {
        filtered = filtered.filter(food => food.food_quantity > 5);
      }
    }

    // Sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.expire_date) - new Date(a.expire_date));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.expire_date) - new Date(b.expire_date));
    } else if (sortBy === 'quantity-high') {
      filtered.sort((a, b) => b.food_quantity - a.food_quantity);
    } else if (sortBy === 'quantity-low') {
      filtered.sort((a, b) => a.food_quantity - b.food_quantity);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.food_name.localeCompare(b.food_name));
    }

    setFilteredFoods(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allFoods, searchTerm, locationFilter, quantityFilter, sortBy]);

  const handleViewDetails = (foodId) => {
    navigate(`/food/${foodId}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setQuantityFilter('');
    setSortBy('newest');
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFoods = filteredFoods.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="px-4 sm:px-6 py-10 lg:px-20 mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
        Available Foods ({filteredFoods.length} items)
      </h2>

      {/* Search and Filter Section */}
      <div className="bg-green-50 rounded-2xl p-6 mb-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by food name or donor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location Filter */}
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">
              <Filter size={16} className="inline mr-1" />
              Filter by Location
            </label>
            <input
              type="text"
              placeholder="Enter location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Quantity Filter */}
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">
              <Filter size={16} className="inline mr-1" />
              Filter by Quantity
            </label>
            <select
              value={quantityFilter}
              onChange={(e) => setQuantityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Quantities</option>
              <option value="low">1-2 portions</option>
              <option value="medium">3-5 portions</option>
              <option value="high">5+ portions</option>
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">
              <SortAsc size={16} className="inline mr-1" />
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="quantity-high">Quantity: High to Low</option>
              <option value="quantity-low">Quantity: Low to High</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      {(searchTerm || locationFilter || quantityFilter) && (
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing {filteredFoods.length} results
            {searchTerm && ` for "${searchTerm}"`}
            {locationFilter && ` in "${locationFilter}"`}
          </p>
        </div>
      )}

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {loading ? (
          <div className="flex flex-col items-center col-span-full py-20 gap-4">
            <span className="loading loading-spinner text-success text-4xl"></span>
            <p className="text-xl text-green-900 font-semibold">Loading foods...</p>
          </div>
        ) : currentFoods.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-gray-600">No foods found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          currentFoods.map((food) => (
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
                  <MapPin size={16} /> Pickup: {food.pickup_location}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-black rounded-lg font-semibold transition-colors"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === page
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-black'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed text-black rounded-lg font-semibold transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Results Summary */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredFoods.length)} of {filteredFoods.length} items
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
