import React from 'react';
import { Heart, Users, Globe, Leaf } from 'lucide-react';

const Statistics = () => {
  const stats = [
    {
      number: '50K+',
      label: 'Meals Shared',
      icon: Heart,
    },
    {
      number: '10K+',
      label: 'Active Users',
      icon: Users,
    },
    {
      number: '500+',
      label: 'Communities',
      icon: Globe,
    },
    {
      number: '95%',
      label: 'Waste Reduced',
      icon: Leaf,
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-white dark:bg-gray-800">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900 dark:text-white">
        Our Impact
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-green-50 dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center text-center
                       transform transition duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 dark:border-gray-600"
          >
            <stat.icon size={48} className="mb-4 text-green-600 dark:text-green-400 transform transition duration-300 hover:rotate-12" />
            <h3 className="stats-number text-3xl font-bold text-green-900 dark:text-white mb-2">{stat.number}</h3>
            <p className="text-green-800 dark:text-white font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;