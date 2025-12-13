import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface CTAProps {
  onPostRide?: () => void;
  onFindRide?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onPostRide, onFindRide }) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop"
          alt="Beautiful South African landscape"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-emerald-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-2xl mx-auto">
          Join thousands of South Africans connecting, traveling, and delivering across the country.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onFindRide}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
          >
            Find a Ride
            <ArrowRight size={20} />
          </button>
          <button 
            onClick={onPostRide}
            className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white hover:bg-emerald-700 transition-colors"
          >
            Post a Ride
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;

