import React from 'react';

const OurMission = () => {
  const targets = [
    {
      title: 'Reduce Food Waste',

      icon: 'https://i.ibb.co.com/5gfnRMhc/image.png',
    },
    {
      title: 'Feed Communities',
  
      icon: 'https://i.ibb.co.com/XxHpZ3Nz/image.png',
    },
    {
      title: 'Spread Awareness',

      icon: 'https://i.ibb.co.com/5xgsj9qg/image.png',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
       
        <div className="md:w-1/2">
          <h2 className="text-4xl sm:text-5xl font-bold  mb-6">
            Our Mission
          </h2>
          <p className="text-lg sm:text-xl text-green-800 mb-6">
            We strive to reduce food waste, feed those in need, and create a sustainable and caring community. Every effort counts, and together we can make a meaningful impact.
          </p>
         
        </div>

        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {targets.map((target, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={target.icon}
                alt={target.title}
                className="w-full h-25 mb-4 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-green-900 mb-2">{target.title}</h3>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
