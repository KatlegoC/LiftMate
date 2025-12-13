import React from 'react';
import { ArrowRight, Users, MapPin, Star } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  onPostRide?: () => void;
  onFindRide?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPostRide, onFindRide }) => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connect. Travel. Deliver.
              <span className="text-emerald-600 block mt-2">Across South Africa</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
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
                <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-600 mb-2">
                  <Users size={24} />
                  <span className="text-3xl font-bold">5,000+</span>
                </div>
                <p className="text-gray-600 text-sm">Active Users</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-600 mb-2">
                  <MapPin size={24} />
                  <span className="text-3xl font-bold">15,000+</span>
                </div>
                <p className="text-gray-600 text-sm">Trips Completed</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-600 mb-2">
                  <Star size={24} />
                  <span className="text-3xl font-bold">4.8★</span>
                </div>
                <p className="text-gray-600 text-sm">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop"
                alt="People traveling together in South Africa"
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

