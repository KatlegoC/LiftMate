import React from 'react';
import { ArrowRight, Users, MapPin, Star } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  onPostRide?: () => void;
  onFindRide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPostRide, onFindRide }) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Mobile Background Image */}
      <div className="absolute inset-0 lg:hidden z-0">
        <img
          src="/images/IMG_3011.JPG"
          alt="South African transport"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
      </div>
      
      {/* Desktop Background */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-emerald-50 to-white z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white lg:text-gray-900 mb-6 drop-shadow-lg">
              Connect. Travel. Deliver.
              <span className="text-emerald-400 lg:text-emerald-600 block mt-2 drop-shadow-lg">Across South Africa</span>
            </h1>
            <p className="text-xl text-white lg:text-gray-600 mb-8 drop-shadow-md">
              Join thousands of drivers and riders sharing journeys and delivering packages 
              safely and affordably across provinces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={onFindRide}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                Find a Ride
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={onPostRide}
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                Post a Ride
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-400 lg:text-emerald-600 mb-2 drop-shadow-md">
                  <Users size={24} />
                  <span className="text-3xl font-bold">5,000+</span>
                </div>
                <p className="text-white lg:text-gray-600 text-sm drop-shadow-sm">Active Users</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-400 lg:text-emerald-600 mb-2 drop-shadow-md">
                  <MapPin size={24} />
                  <span className="text-3xl font-bold">15,000+</span>
                </div>
                <p className="text-white lg:text-gray-600 text-sm drop-shadow-sm">Trips Completed</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-400 lg:text-emerald-600 mb-2 drop-shadow-md">
                  <Star size={24} />
                  <span className="text-3xl font-bold">4.8★</span>
                </div>
                <p className="text-white lg:text-gray-600 text-sm drop-shadow-sm">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="/images/LiftMap.png"
                alt="South Africa map with locations"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-emerald-500 rounded-full opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

