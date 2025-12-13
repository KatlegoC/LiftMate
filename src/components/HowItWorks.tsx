import React, { useState } from 'react';
import { Car, Search, MessageCircle, MapPin, Calendar, Package } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'driver' | 'rider'>('rider');

  const driverSteps = [
    {
      icon: <Calendar size={24} />,
      title: 'Plan Your Trip',
      description: 'Post your planned journey with departure time, route, and available seats.',
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Connect with Riders',
      description: 'Receive requests and messages from riders interested in joining your trip.',
    },
    {
      icon: <Car size={24} />,
      title: 'Start Your Journey',
      description: 'Confirm riders, share costs, and enjoy the company on your travels.',
    },
  ];

  const riderSteps = [
    {
      icon: <Search size={24} />,
      title: 'Search for Trips',
      description: 'Browse available trips between provinces that match your travel needs.',
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Contact Drivers',
      description: 'Message drivers directly to confirm details and arrange your journey.',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Join & Travel',
      description: 'Meet your driver, share the journey, and save money on travel costs.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to connect drivers and riders across South Africa.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('rider')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'rider'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              For Riders
            </button>
            <button
              onClick={() => setActiveTab('driver')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'driver'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              For Drivers
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {(activeTab === 'rider' ? riderSteps : driverSteps).map((step, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                {step.icon}
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Package Delivery CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-xl p-6 shadow-md">
            <Package size={32} className="text-emerald-600" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">
                Also Available: Package Delivery
              </h3>
              <p className="text-gray-600">
                Send packages safely with verified drivers traveling your route.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

