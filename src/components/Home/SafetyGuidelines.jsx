import React from 'react';

const SafetyGuidelines = () => {
  const guidelines = [
    {
      title: 'Food Safety First',
      description: 'Always check food quality and expiration dates before sharing or consuming.',
      icon: 'https://i.ibb.co.com/VYqpypzh/image.png',
    },
    {
      title: 'Proper Storage',
      description: 'Keep perishable items refrigerated and maintain proper temperature during transport.',
      icon: 'https://i.ibb.co.com/XrBjp5BB/image.png',
    },
    {
      title: 'Clear Communication',
      description: 'Provide accurate descriptions and communicate any allergens or special notes.',
      icon: 'https://i.ibb.co.com/TB8Vf9Cb/image.png',
    },
    {
      title: 'Timely Pickup',
      description: 'Arrange pickup times promptly to ensure food freshness and quality.',
      icon: 'https://i.ibb.co.com/0Vq68tWm/image.png',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-green-50 dark:bg-slate-800">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900 dark:text-white">
        Safety Guidelines
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guidelines.map((guideline, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 flex items-start gap-4
                       transform transition duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 dark:border-gray-600"
          >
            <img
              src={guideline.icon}
              alt={guideline.title}
              className="w-16 h-16 flex-shrink-0 transform transition duration-300 hover:rotate-12"
            />
            <div>
              <h3 className="text-xl font-semibold text-green-900 dark:text-white mb-2">{guideline.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{guideline.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SafetyGuidelines;