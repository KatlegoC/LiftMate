import React from 'react';
import {
  ShieldCheck,
  DollarSign,
  Star,
  MessageSquare,
  Package,
  Calendar,
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <ShieldCheck size={32} />,
    title: 'Community Verified',
    description: 'All drivers are verified by our community to ensure safe and reliable journeys.',
  },
  {
    icon: <DollarSign size={32} />,
    title: 'Free & Hassle-Free',
    description: 'No hidden fees, no complicated processes. Post or find rides completely free.',
  },
  {
    icon: <Star size={32} />,
    title: 'Safe & Reliable',
    description: 'Trusted community with verified profiles and ratings for peace of mind.',
  },
  {
    icon: <MessageSquare size={32} />,
    title: 'Local Routes',
    description: 'Connect with drivers and riders on routes across South Africa.',
  },
  {
    icon: <Package size={32} />,
    title: 'Package Delivery',
    description: 'Send and receive packages safely through our verified delivery network.',
  },
  {
    icon: <Calendar size={32} />,
    title: 'Flexible Scheduling',
    description: 'Plan trips in advance or find last-minute rides that fit your schedule.',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose LiftMate?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Free, hassle-free, and safe travel across South Africa. Community verified and reliable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all group"
            >
              <div className="text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

