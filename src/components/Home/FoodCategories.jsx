import React from 'react';

const FoodCategories = () => {
  const categories = [
    {
      name: 'Fresh Produce',
      description: 'Fruits, vegetables, and fresh ingredients',
      icon: 'https://i.ibb.co/XxHpZ3Nz/image.png',
      count: '2.5K+ items',
    },
    {
      name: 'Cooked Meals',
      description: 'Ready-to-eat homemade dishes',
      icon: 'https://i.ibb.co/5xgsj9qg/image.png',
      count: '1.8K+ items',
    },
    {
      name: 'Baked Goods',
      description: 'Bread, pastries, and desserts',
      icon: 'https://i.ibb.co/b5THxvJq/food-donation.png',
      count: '900+ items',
    },
    {
      name: 'Packaged Foods',
      description: 'Canned goods and packaged items',
      icon: 'https://i.ibb.co/RGz1TDSQ/verified.png',
      count: '1.2K+ items',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-white">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
        Food Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-2xl shadow p-6 flex flex-col items-center text-center
                       transform transition duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            <img
              src={category.icon}
              alt={category.name}
              className="w-20 h-20 mb-4 transform transition duration-300 hover:rotate-12"
            />
            <h3 className="text-xl font-semibold text-green-900 mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-3 text-sm">{category.description}</p>
            <span className="text-green-700 font-bold text-sm">{category.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodCategories;