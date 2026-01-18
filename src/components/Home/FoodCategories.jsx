import React from 'react';
import { Apple, ChefHat, Cookie, Package } from 'lucide-react';

const FoodCategories = () => {
  const categories = [
    {
      name: 'Fresh Produce',
      description: 'Fruits, vegetables, and fresh ingredients',
      icon: Apple,
      count: '2.5K+ items',
    },
    {
      name: 'Cooked Meals',
      description: 'Ready-to-eat homemade dishes',
      icon: ChefHat,
      count: '1.8K+ items',
    },
    {
      name: 'Baked Goods',
      description: 'Bread, pastries, and desserts',
      icon: Cookie,
      count: '900+ items',
    },
    {
      name: 'Packaged Foods',
      description: 'Canned goods and packaged items',
      icon: Package,
      count: '1.2K+ items',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-white dark:bg-slate-900">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900 dark:text-white">
        Food Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-green-50 dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center text-center
                       transform transition duration-300 hover:shadow-xl hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-600"
          >
            <category.icon size={60} className="mb-4 text-green-600 dark:text-green-400 transform transition duration-300 hover:rotate-12" />
            <h3 
              className="text-xl font-semibold text-green-900 dark:text-white mb-2"
            >
              {category.name}
            </h3>
            <p className="text-gray-600 dark:text-white mb-3 text-sm">{category.description}</p>
            <span className="text-green-700 dark:text-white font-bold text-sm">{category.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodCategories;