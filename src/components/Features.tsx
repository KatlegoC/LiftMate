import React from 'react';
import {
  ShieldCheck,
  DollarSign,
  Star,
  MessageSquare,
  Calendar,
  Search,
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Search className="w-8 h-8" />,
    title: 'Easy Trip Discovery',
    description:
      'Scroll through available trips by route, date, and price — no endless Facebook posts, comments, or screenshots.',
  },
  {
    icon: <ShieldCheck size={32} />,
    title: 'Verified Drivers',
    description: 'All drivers undergo background checks and verification to ensure your safety.',
  },
  {
    icon: <DollarSign size={32} />,
    title: 'Clear Pricing & Availability',
    description:
      'See clear, affordable prices upfront and share travel costs without negotiating in comments or inboxes. Save up to 70% compared to solo trips.',
  },
  {
    icon: <Star size={32} />,
    title: 'Community Ratings',
    description: 'Rate and review drivers and riders to build a trusted community.',
  },
  {
    icon: <MessageSquare size={32} />,
    title: 'In-App Messaging',
    description: 'Connect directly with drivers and riders via WhatsApp to confirm details before your journey.',
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
            Why Move from Facebook to LiftMate?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All the convenience of Facebook lift groups — without the chaos. Find, compare, and book trips safely in one place.
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

