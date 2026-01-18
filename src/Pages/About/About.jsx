import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Globe, 
  Target, 
  Award, 
  Leaf,
  HandHeart,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { number: '50K+', label: 'Meals Shared', icon: Heart },
    { number: '10K+', label: 'Active Users', icon: Users },
    { number: '500+', label: 'Communities', icon: Globe },
    { number: '95%', label: 'Waste Reduced', icon: Leaf }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We believe in the power of community to solve local problems and create lasting connections.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Reducing food waste is our mission. Every shared meal helps create a more sustainable future.'
    },
    {
      icon: Shield,
      title: 'Safety & Trust',
      description: 'We prioritize food safety and build trust through verified users and clear guidelines.'
    },
    {
      icon: HandHeart,
      title: 'Compassion',
      description: 'No one should go hungry. We connect those who have with those who need with dignity and respect.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://i.ibb.co/Ld61KCvs/image.png',
      description: 'Passionate about community building and sustainable living.'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Technology',
      image: 'https://i.ibb.co/F4TB4bKg/image.png',
      description: 'Expert in building scalable platforms that connect people.'
    },
    {
      name: 'Emma Davis',
      role: 'Community Manager',
      image: 'https://i.ibb.co/Mx37msb8/image.png',
      description: 'Dedicated to fostering safe and inclusive communities.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'PlateShare Founded',
      description: 'Started with a simple idea: connect neighbors to share food and reduce waste.'
    },
    {
      year: '2024',
      title: '10,000 Users',
      description: 'Reached our first major milestone with 10,000 active community members.'
    },
    {
      year: '2024',
      title: '50,000 Meals',
      description: 'Celebrated sharing over 50,000 meals and preventing tons of food waste.'
    },
    {
      year: '2025',
      title: 'Global Expansion',
      description: 'Expanding to serve communities worldwide with localized features.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#14532d' }}>
            About PlateShare
          </h1>
          <p className="text-xl sm:text-2xl text-green-800 max-w-3xl mx-auto leading-relaxed">
            Connecting communities through food sharing. We believe that no meal should go to waste 
            and no one should go hungry when we can help each other.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                PlateShare was born from a simple observation: millions of tons of food are wasted 
                every year while many people struggle with food insecurity. We created a platform 
                that makes it easy for communities to share surplus food, reducing waste and 
                helping neighbors in need.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our mission is to build stronger, more sustainable communities by connecting people 
                through the universal language of food. Every shared meal creates connections, 
                reduces environmental impact, and makes our world a little bit better.
              </p>
              <button
                onClick={() => navigate('/register')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Join Our Community
              </button>
            </div>
            <div>
              <img
                src="https://i.ibb.co/KccQ4bzw/image.png"
                alt="Community food sharing"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-900 mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <stat.icon size={48} className="mx-auto text-green-600 mb-4" />
                  <h3 className="text-3xl font-bold text-green-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600 font-semibold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-green-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <value.icon size={48} className="text-green-600 mb-6" />
                <h3 className="text-2xl font-bold text-green-900 mb-4">{value.title}</h3>
                <p className="text-gray-700 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-900 mb-12">
            How PlateShare Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">Share Your Food</h3>
              <p className="text-gray-600">
                Post details about surplus food you'd like to share with your community.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">Connect Safely</h3>
              <p className="text-gray-600">
                Browse available food and connect with verified community members nearby.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-4">Make an Impact</h3>
              <p className="text-gray-600">
                Reduce waste, help neighbors, and build stronger community connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-green-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-green-200"
                />
                <h3 className="text-xl font-bold text-green-900 mb-2">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-900 mb-12">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of community members who are already sharing food and building 
            stronger neighborhoods. Every meal shared makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Join PlateShare
            </button>
            <button
              onClick={() => navigate('/available-foods')}
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Browse Available Foods
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;