import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CallToAction = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-green-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-green-900 dark:text-white">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg sm:text-xl text-green-800 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of community members who are already sharing food and reducing waste. 
          Every meal shared makes a difference in someone's life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {user ? (
            <>
              <button
                onClick={() => navigate('/dashboard/add-food')}
                className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 rounded-2xl font-bold text-lg 
                           transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Share Food Now
              </button>
              <button
                onClick={() => navigate('/available-foods')}
                className="border-2 border-green-900 text-green-900 hover:bg-green-900 hover:text-white 
                           px-8 py-4 rounded-2xl font-bold text-lg transform transition duration-300 hover:scale-105"
              >
                Find Food
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/dashboard/add-food')}
                className="bg-green-900 hover:bg-green-800 text-white px-8 py-4 rounded-2xl font-bold text-lg 
                           transform transition duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Join PlateShare
              </button>
              <button
                onClick={() => navigate('/available-foods')}
                className="border-2 border-green-900 text-green-900 hover:bg-green-900 hover:text-white 
                           px-8 py-4 rounded-2xl font-bold text-lg transform transition duration-300 hover:scale-105"
              >
                Browse Foods
              </button>
            </>
          )}
        </div>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transform transition duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-green-900 dark:text-white mb-2">Free to Use</h3>
            <p className="text-gray-600 dark:text-white">No fees, no charges. Just community sharing.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transform transition duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-green-900 dark:text-white mb-2">Safe & Secure</h3>
            <p className="text-gray-600 dark:text-white">Verified users and safety guidelines.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 transform transition duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-green-900 dark:text-white mb-2">Local Community</h3>
            <p className="text-gray-600 dark:text-white">Connect with neighbors in your area.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;