import React from 'react';

const OurMission = () => {
  const targets = [
    {
      title: 'Reduce Food Waste',
      icon: 'https://i.ibb.co.com/NR665Bs/image.png',
    },
    {
      title: 'Feed Communities',
      icon: 'https://i.ibb.co.com/TxPm8fkV/image.png',
    },
    {
      title: 'Spread Awareness',
      icon: 'https://i.ibb.co.com/KxGb04jV/image.png',
    },
  ];

  return (
    <section className="sm:px-6 lg:px-0 py-16 bg-white dark:bg-gray-800">
      <div className="max-w-[90%] mx-auto flex flex-col md:flex-row items-start md:items-center gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-5 text-green-900 dark:text-white">Our Mission</h2>
          <p className="text-lg sm:text-xl text-green-800 dark:text-white mb-6">
            We strive to reduce food waste, feed those in need, and create a sustainable and caring community. Every effort counts, and together we can make a meaningful impact.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
            {targets.map((target, index) => (
              <div
                key={index}
                className="w-full rounded-2xl flex flex-col items-center text-center border-2 border-green-800 p-4"
              >
                <img
                  src={target.icon}
                  alt={target.title}
                  className="w-full h-40 mb-4 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold text-green-900 dark:text-white mb-2">{target.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
