import React from 'react';
import { Shield, CheckCircle, UserCheck, Car, Camera } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

const safetyFeatures = [
  {
    icon: <Camera size={24} />,
    title: 'Identity Verification',
    description: 'All users are required to submit a selfie verification, which we securely store to confirm identity and reduce impersonation.',
  },
  {
    icon: <Car size={24} />,
    title: 'Vehicle Details',
    description: 'Drivers must provide vehicle information, including number plates, to ensure transparency and traceability for every trip.',
  },
  {
    icon: <UserCheck size={24} />,
    title: 'Verified Profiles',
    description: 'Profile verification helps you know exactly who you\'re travelling with before the journey begins.',
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
              Safety First
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We prioritise trust and safety on every journey by verifying drivers and riders before they connect.
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
              <span className="font-semibold">Community Verified - Safe & Reliable - Free & Hassle-Free</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/images/IMG_3015.JPG"
                alt="South African transport hub"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-center gap-3">
                <Shield size={32} />
                <div>
                  <div className="font-bold text-lg">Community Verified</div>
                  <div className="text-sm opacity-90">Safe & Reliable</div>
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

