import React from 'react';
import { Shield, CheckCircle, UserCheck, Phone, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const safetyFeatures = [
  {
    icon: <Shield size={24} />,
    title: 'Background Checks',
    description: 'All drivers undergo comprehensive background verification.',
  },
  {
    icon: <UserCheck size={24} />,
    title: 'Verified Profiles',
    description: 'ID verification ensures you know who you\'re traveling with.',
  },
  {
    icon: <Phone size={24} />,
    title: '24/7 Support',
    description: 'Our support team is available around the clock for assistance.',
  },
  {
    icon: <AlertCircle size={24} />,
    title: 'Emergency Features',
    description: 'Quick access to emergency contacts and trip sharing.',
  },
];

export const Safety: React.FC = () => {
  return (
    <section id="safety" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-2 rounded-full mb-6">
              <Shield size={20} />
              <span className="font-semibold">Safety First</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Safety is Our Priority
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We've built multiple layers of safety features to ensure every journey 
              is secure and trustworthy.
            </p>

            <div className="space-y-6">
              {safetyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-emerald-600">
              <CheckCircle size={20} />
              <span className="font-semibold">Trusted by 5,000+ users across South Africa</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop"
                alt="Safe travel and security"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-center gap-3">
                <Shield size={32} />
                <div>
                  <div className="font-bold text-lg">Verified Platform</div>
                  <div className="text-sm opacity-90">Safety certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;

