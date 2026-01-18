import React from 'react';
import { Upload, Search, HandHeart } from 'lucide-react';

const HowWorks = () => {
  const steps = [
    {
      title: 'Post Food',
      description:
        'If you have extra food, post it using our platform. Add details like type, quantity, and pickup location.',
      icon: Upload,
    },
    {
      title: 'Find Food',
      description:
        'Browse available food items posted by donors nearby. You can see quantity, location, and additional notes.',
      icon: Search,
    },
    {
      title: 'Collect Food',
      description:
        'Collect the food from the pickup location or request delivery. Enjoy fresh meals while helping reduce food waste.',
      icon: HandHeart,
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-green-50 dark:bg-slate-800">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900 dark:text-white">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center text-center
                       transform transition duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 dark:border-gray-600"
          >
            <step.icon size={60} className="mb-4 text-green-600 dark:text-green-400 transform transition duration-300 hover:rotate-12" />
            <h3 className="text-2xl mb-4 font-semibold text-green-900 dark:text-white">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWorks;
