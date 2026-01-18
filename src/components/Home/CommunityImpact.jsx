import React from 'react';

const CommunityImpact = () => {
  const impacts = [
    {
      title: 'Environmental Benefits',
      description: 'Reducing food waste helps decrease methane emissions and conserves resources used in food production.',
      percentage: '40%',
      metric: 'Less Food Waste',
      color: 'bg-green-100 text-green-800',
    },
    {
      title: 'Social Connection',
      description: 'Building stronger communities by connecting neighbors and fostering a culture of sharing and caring.',
      percentage: '85%',
      metric: 'User Satisfaction',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Economic Impact',
      description: 'Helping families save money on groceries while reducing the economic burden of food insecurity.',
      percentage: '$200',
      metric: 'Average Savings',
      color: 'bg-yellow-100 text-yellow-800',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-white">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
        Community Impact
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {impacts.map((impact, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-2xl shadow p-6 text-center
                       transform transition duration-300 hover:shadow-xl hover:scale-105"
          >
            <div className={`inline-block px-4 py-2 rounded-full text-2xl font-bold mb-4 ${impact.color}`}>
              {impact.percentage}
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-3">{impact.title}</h3>
            <p className="text-gray-600 mb-4">{impact.description}</p>
            <span className="text-green-700 font-semibold">{impact.metric}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityImpact;