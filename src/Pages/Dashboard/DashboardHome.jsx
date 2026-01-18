import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Plus, 
  List, 
  Heart, 
  Users, 
  TrendingUp, 
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalRequests: 0,
    acceptedRequests: 0,
    pendingRequests: 0
  });
  const [recentFoods, setRecentFoods] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) return;
      
      try {
        // Fetch user's foods
        const foodsResponse = await axios.get(`https://plateshare-api-server.vercel.app/my-foods?email=${user.email}`);
        const userFoods = foodsResponse.data;
        
        // Fetch user's requests
        const requestsResponse = await axios.get(`https://plateshare-api-server.vercel.app/my-food-requests?email=${user.email}`);
        const userRequests = requestsResponse.data;
        
        // Calculate stats
        const acceptedCount = userRequests.filter(req => req.status === 'accepted').length;
        const pendingCount = userRequests.filter(req => req.status === 'pending').length;
        
        setStats({
          totalFoods: userFoods.length,
          totalRequests: userRequests.length,
          acceptedRequests: acceptedCount,
          pendingRequests: pendingCount
        });
        
        // Set recent data (last 5 items)
        setRecentFoods(userFoods.slice(0, 5));
        setRecentRequests(userRequests.slice(0, 5));
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.email]);

  const summaryCards = [
    {
      title: 'Total Foods Shared',
      value: stats.totalFoods,
      icon: List,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Food Requests Made',
      value: stats.totalRequests,
      icon: Heart,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Accepted Requests',
      value: stats.acceptedRequests,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Pending Requests',
      value: stats.pendingRequests,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner text-4xl text-green-700"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.displayName || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600">
              Here's an overview of your food sharing activities
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => navigate('/dashboard/add-food')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <Plus size={20} />
              <span>Share New Food</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
              <div className={`p-3 rounded-full ${card.color}`}>
                <card.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Foods Shared */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Foods Shared</h2>
            <button
              onClick={() => navigate('/dashboard/manage-foods')}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              View All
            </button>
          </div>
          
          {recentFoods.length === 0 ? (
            <div className="text-center py-8">
              <List size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">No foods shared yet</p>
              <button
                onClick={() => navigate('/dashboard/add-food')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Share Your First Food
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentFoods.map((food) => (
                <div key={food._id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{food.food_name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{food.food_quantity} portions</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{food.pickup_location}</span>
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    food.food_status === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {food.food_status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Food Requests */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Food Requests</h2>
            <button
              onClick={() => navigate('/dashboard/my-requests')}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              View All
            </button>
          </div>
          
          {recentRequests.length === 0 ? (
            <div className="text-center py-8">
              <Heart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">No food requests yet</p>
              <button
                onClick={() => navigate('/available-foods')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Browse Available Foods
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request._id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  {request.foodDetails?.food_image && (
                    <img
                      src={request.foodDetails.food_image}
                      alt={request.foodDetails.food_name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {request.foodDetails?.food_name || 'Food Item'}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{request.quantityRequested} portions</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(request.requestDate).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'accepted' 
                      ? 'bg-green-100 text-green-800' 
                      : request.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/dashboard/add-food')}
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors"
          >
            <Plus size={24} className="text-green-600" />
            <span className="font-medium text-green-600">Share New Food</span>
          </button>
          
          <button
            onClick={() => navigate('/available-foods')}
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            <Heart size={24} className="text-blue-600" />
            <span className="font-medium text-blue-600">Browse Available Foods</span>
          </button>
          
          <button
            onClick={() => navigate('/dashboard/profile')}
            className="flex items-center space-x-3 p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors"
          >
            <Users size={24} className="text-purple-600" />
            <span className="font-medium text-purple-600">Update Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;