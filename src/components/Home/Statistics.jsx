import React from 'react';

const Statistics = () => {
  const stats = [
    {
      number: '50K+',
      label: 'Meals Shared',
      icon: 'https://i.ibb.co/b5THxvJq/food-donation.png',
    },
    {
      number: '10K+',
      label: 'Active Users',
      icon: 'https://i.ibb.co/RGz1TDSQ/verified.png',
    },
    {
      number: '500+',
      label: 'Communities',
      icon: 'https://i.ibb.co/6JP8FNFp/delivery-man.png',
    },
    {
      number: '95%',
      label: 'Waste Reduced',
      icon: 'https://i.ibb.co/5gfnRMhc/image.png',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-white">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
        Our Impact
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-2xl shadow p-6 flex flex-col items-center text-center
                       transform transition duration-300 hover:shadow-xl hover:scale-105"
          >
            <img
              src={stat.icon}
              alt={stat.label}
              className="w-16 h-16 mb-4 transform transition duration-300 hover:rotate-12"
            />
            <h3 className="text-3xl font-bold text-green-900 mb-2">{stat.number}</h3>
            <p className="text-green-800 font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;