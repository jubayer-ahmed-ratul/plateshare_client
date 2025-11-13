import React from 'react';

const HowWorks = () => {
  const steps = [
    {
      title: 'Post Food',
      description:
        'If you have extra food, post it using our platform. Add details like type, quantity, and pickup location.',
      icon: 'https://i.ibb.co/b5THxvJq/food-donation.png',
    },
    {
      title: 'Find Food',
      description:
        'Browse available food items posted by donors nearby. You can see quantity, location, and additional notes.',
      icon: 'https://i.ibb.co/RGz1TDSQ/verified.png',
    },
    {
      title: 'Collect Food',
      description:
        'Collect the food from the pickup location or request delivery. Enjoy fresh meals while helping reduce food waste.',
      icon: 'https://i.ibb.co/6JP8FNFp/delivery-man.png',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-green-50">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center
                       transform transition duration-300 hover:shadow-xl hover:scale-105"
          >
            <img
              src={step.icon}
              alt={step.title}
              className="w-20 h-20 mb-4 transform transition duration-300 hover:rotate-12"
            />
            <h3 className="text-2xl mb-4 font-semibold text-green-900">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWorks;
