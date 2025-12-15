import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Users, Car, Search, Filter, UserPlus, Phone, User } from 'lucide-react';
import { supabase, RidePost } from '../lib/supabase';
import PostRideForm from './PostRideForm';

interface Ride extends RidePost {
  id: string;
}

interface AvailableRidesProps {
  refreshTrigger?: number;
}

export const AvailableRides: React.FC<AvailableRidesProps> = ({ refreshTrigger }) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'passengers' | 'parcel'>('all');
  const [filterRideType, setFilterRideType] = useState<'all' | 'offer' | 'request'>('all');
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [cityCounts, setCityCounts] = useState<Record<string, number>>({});

  // Fetch rides from Supabase
  useEffect(() => {
    fetchRides();
  }, [refreshTrigger]);

  const fetchRides = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching rides:', error);
        return;
      }

      if (data) {
        const ridesData = data as Ride[];
        setRides(ridesData);
        
        // Calculate city counts
        const counts: Record<string, number> = {};
        ridesData.forEach(ride => {
          const pickupCity = ride.pickup_location.split(',')[0].trim();
          const dropoffCity = ride.dropoff_location.split(',')[0].trim();
          counts[pickupCity] = (counts[pickupCity] || 0) + 1;
          counts[dropoffCity] = (counts[dropoffCity] || 0) + 1;
        });
        setCityCounts(counts);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter rides
  useEffect(() => {
    let filtered = rides;

    // Filter by ride type (offer/request)
    if (filterRideType !== 'all') {
      filtered = filtered.filter(ride => ride.ride_type === filterRideType);
    }

    // Filter by post type (passengers/parcel)
    if (filterType !== 'all') {
      filtered = filtered.filter(ride => ride.post_type === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ride => {
        const pickupDisplay = ride.pickup_area
          ? `${ride.pickup_location} - ${ride.pickup_area}`
          : ride.pickup_location;
        const dropoffDisplay = ride.dropoff_area
          ? `${ride.dropoff_location} - ${ride.dropoff_area}`
          : ride.dropoff_location;

        return (
          pickupDisplay.toLowerCase().includes(query) ||
          dropoffDisplay.toLowerCase().includes(query) ||
          (ride.vehicle && ride.vehicle.toLowerCase().includes(query)) ||
          ride.driver_name.toLowerCase().includes(query)
        );
      });
    }

    setFilteredRides(filtered);
  }, [rides, searchQuery, filterType, filterRideType]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleContact = (ride: Ride) => {
    const phoneNumber = ride.phone_number.replace(/\D/g, ''); // Remove non-digits
    if (ride.is_whatsapp) {
      window.open(`https://wa.me/27${phoneNumber}`, '_blank');
    } else {
      window.open(`tel:${ride.phone_number}`, '_blank');
    }
  };

  const handleRequestSuccess = () => {
    fetchRides();
    setIsRequestFormOpen(false);
  };

  // Get unique cities with counts
  const citiesWithTrips = Object.entries(cityCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <section id="find-ride" className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Ride
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Browse available rides and connect with drivers traveling your route.
          </p>
          
          {/* Post Ride Request Button */}
          <button
            onClick={() => setIsRequestFormOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            <UserPlus size={20} />
            Request a Ride
          </button>
        </div>

        {/* City Capsules */}
        {citiesWithTrips.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {citiesWithTrips.map(([city, count]) => (
                <button
                  key={city}
                  onClick={() => setSearchQuery(city)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-full text-sm font-semibold text-emerald-800 hover:border-emerald-500 transition-all"
                >
                  <MapPin size={16} className="text-emerald-700" />
                  <span>{city}</span>
                  <span className="flex items-center justify-center w-6 h-6 bg-emerald-700 text-white rounded-full text-xs font-bold">
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by pickup, dropoff, vehicle, or name..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-lg"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterRideType('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                filterRideType === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-500'
              }`}
            >
              <Filter size={18} />
              All
            </button>
            <button
              onClick={() => setFilterRideType('offer')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                filterRideType === 'offer'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-500'
              }`}
            >
              <Car size={18} />
              Ride Offers
            </button>
            <button
              onClick={() => setFilterRideType('request')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                filterRideType === 'request'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500'
              }`}
            >
              <UserPlus size={18} />
              Ride Requests
            </button>
            <button
              onClick={() => setFilterType('passengers')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                filterType === 'passengers'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-500'
              }`}
            >
              <Users size={18} />
              Passengers
            </button>
            <button
              onClick={() => setFilterType('parcel')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                filterType === 'parcel'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-500'
              }`}
            >
              <Car size={18} />
              Parcel
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredRides.length} {filteredRides.length === 1 ? 'ride' : 'rides'} {filterRideType === 'all' ? 'available' : filterRideType === 'offer' ? 'offered' : 'requested'}
          </p>
        </div>

        {/* Rides List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200">
              <p className="text-xl text-gray-600">Loading rides...</p>
            </div>
          ) : filteredRides.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200">
              <p className="text-xl text-gray-600 mb-2">No rides found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredRides.map(ride => (
              <div
                key={ride.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 ${
                  ride.ride_type === 'request' ? 'border-blue-200' : 'border-gray-100'
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Side - Route Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        {ride.selfie_url && (
                          <img
                            src={ride.selfie_url}
                            alt={ride.driver_name}
                            className="w-12 h-12 rounded-lg object-cover border-2 border-emerald-200"
                          />
                        )}
                        {!ride.selfie_url && (
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            ride.post_type === 'passengers' ? 'bg-emerald-100' : 'bg-blue-100'
                          }`}>
                            {ride.post_type === 'passengers' ? (
                              <Users size={24} className="text-emerald-600" />
                            ) : (
                              <Car size={24} className="text-blue-600" />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            ride.ride_type === 'request'
                              ? 'bg-blue-100 text-blue-700'
                              : ride.post_type === 'passengers' 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-blue-100 text-blue-700'
                          }`}>
                            {ride.ride_type === 'request' ? 'Ride Request' : ride.post_type === 'passengers' ? 'Passengers' : 'Parcel Delivery'}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-900">
                            <MapPin size={18} className="text-emerald-600 flex-shrink-0" />
                            <span className="font-semibold">
                              {ride.pickup_location}
                              {ride.pickup_area ? ` - ${ride.pickup_area}` : ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 ml-5">
                            <span className="text-emerald-600">↓</span>
                            <span>
                              {ride.dropoff_location}
                              {ride.dropoff_area ? ` - ${ride.dropoff_area}` : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={18} className="text-emerald-600" />
                        <span>{formatDate(ride.departure_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-emerald-600" />
                        <span>{ride.departure_time}</span>
                      </div>
                    </div>

                    {/* Vehicle and Driver Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                      {ride.ride_type === 'offer' && ride.vehicle && (
                        <div className="flex items-center gap-2">
                          <Car size={16} className="text-emerald-600" />
                          <span>{ride.vehicle}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-emerald-600" />
                        <span className="font-semibold">{ride.driver_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-emerald-600" />
                        <span>{ride.phone_number}</span>
                        {ride.is_whatsapp && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">WhatsApp</span>
                        )}
                      </div>
                    </div>

                    {/* Comments */}
                    {ride.comments && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{ride.comments}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Pricing and Action */}
                  <div className="lg:w-48 flex flex-col justify-between">
                    {ride.post_type === 'passengers' && ride.seats_available && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={18} className="text-emerald-600" />
                          <span className="text-gray-700 font-semibold">
                            {ride.seats_available} {ride.seats_available === 1 ? 'seat' : 'seats'} {ride.ride_type === 'request' ? 'needed' : 'available'}
                          </span>
                        </div>
                        {ride.ride_type === 'offer' && ride.price_per_seat && (
                          <div className="text-2xl font-bold text-emerald-600">
                            R{ride.price_per_seat}
                            <span className="text-sm font-normal text-gray-600">/seat</span>
                          </div>
                        )}
                      </div>
                    )}
                    {ride.post_type === 'parcel' && (
                      <div className="mb-4">
                        <div className="text-lg font-semibold text-gray-700">
                          Parcel {ride.ride_type === 'request' ? 'Request' : 'Delivery'}
                        </div>
                        {ride.ride_type === 'offer' && (
                          <div className="text-sm text-gray-600">
                            Contact for pricing
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => handleContact(ride)}
                      className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                        ride.ride_type === 'request'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {ride.ride_type === 'request' ? 'Contact Rider' : 'Contact Driver'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Post Ride Request Modal */}
      <PostRideForm
        isOpen={isRequestFormOpen}
        onClose={() => setIsRequestFormOpen(false)}
        rideType="request"
        onSuccess={handleRequestSuccess}
      />
    </section>
  );
};

export default AvailableRides;
