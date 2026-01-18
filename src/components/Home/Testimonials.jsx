import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Community Member',
      text: 'PlateShare helped me find fresh meals when I needed them most. The community here is amazing!',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0c4428&color=ffffff',
    },
    {
      name: 'Mike Chen',
      role: 'Food Donor',
      text: 'I love being able to share my extra food instead of throwing it away. It feels great to help others.',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=0c4428&color=ffffff',
    },
    {
      name: 'Emma Davis',
      role: 'Regular User',
      text: 'The app is so easy to use and the pickup process is seamless. Highly recommend to everyone!',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=0c4428&color=ffffff',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-20 py-16 bg-green-50">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900">
        What Our Community Says
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center
                       transform transition duration-300 hover:shadow-xl hover:scale-105"
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mb-4 border-4 border-green-200"
            />
            <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
            <h3 className="text-xl font-semibold text-green-900">{testimonial.name}</h3>
            <p className="text-green-700">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;