import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Users, Car, Search, Filter, Phone, MessageSquare } from 'lucide-react';
import { supabase, RidePost } from '../lib/supabase';

interface Ride {
  id: string;
  type: 'passengers' | 'parcel';
  pickupLocation: string;
  dropoffLocation: string;
  departureDate: string;
  departureTime: string;
  seatsAvailable?: number;
  pricePerSeat?: number;
  vehicle: string;
  driverName: string;
  phoneNumber: string;
  isWhatsApp: boolean;
  comments?: string;
  selfieUrl?: string;
}

interface AvailableRidesProps {
  refreshTrigger?: number;
}

export const AvailableRides: React.FC<AvailableRidesProps> = ({ refreshTrigger }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'passengers' | 'parcel'>('all');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError('Failed to load rides. Please try again.');
        setIsLoading(false);
        return;
      }

      // Transform Supabase data to Ride format
      const transformedRides: Ride[] = (data || []).map((ride: RidePost) => ({
        id: ride.id || '',
        type: ride.post_type,
        pickupLocation: ride.pickup_location,
        dropoffLocation: ride.dropoff_location,
        departureDate: ride.departure_date,
        departureTime: ride.departure_time,
        seatsAvailable: ride.seats_available,
        pricePerSeat: ride.price_per_seat,
        vehicle: ride.vehicle,
        driverName: ride.driver_name,
        phoneNumber: ride.phone_number,
        isWhatsApp: ride.is_whatsapp,
        comments: ride.comments,
        selfieUrl: ride.selfie_url,
      }));

      setRides(transformedRides);
      setFilteredRides(transformedRides);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Error:', err);
      // Handle 503 errors (project paused)
      if (err.message?.includes('503') || err.message?.includes('Service Unavailable') || err.message?.includes('upstream connect error')) {
        setError('Supabase project may be paused. Please restore it in the Supabase dashboard (https://app.supabase.com/).');
      } else {
        setError(err.message || 'Failed to load rides. Please try again.');
      }
      setIsLoading(false);
    }
  };

  // Extract city from location string (e.g., "Cape Town, Western Cape" -> "Cape Town")
  const extractCity = (location: string): string => {
    // Split by comma and take the first part, trim whitespace
    const city = location.split(',')[0].trim();
    return city;
  };

  // Get unique cities with trip counts
  const getCityCounts = (): Array<{ city: string; count: number }> => {
    const cityCounts: { [key: string]: number } = {};
    
    rides.forEach(ride => {
      const pickupCity = extractCity(ride.pickupLocation);
      const dropoffCity = extractCity(ride.dropoffLocation);
      
      // Count if city appears in pickup or dropoff
      cityCounts[pickupCity] = (cityCounts[pickupCity] || 0) + 1;
      if (pickupCity !== dropoffCity) {
        cityCounts[dropoffCity] = (cityCounts[dropoffCity] || 0) + 1;
      }
    });
    
    // Convert to array and sort by count (descending)
    return Object.entries(cityCounts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count);
  };

  // Filter rides when search, filter, or city changes
  useEffect(() => {
    filterRides(searchQuery, filterType, selectedCity);
  }, [searchQuery, filterType, selectedCity, rides]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleFilterChange = (type: 'all' | 'passengers' | 'parcel') => {
    setFilterType(type);
  };

  const handleCityClick = (city: string) => {
    // Toggle city filter - if same city clicked, clear filter
    setSelectedCity(selectedCity === city ? null : city);
  };

  const filterRides = (query: string, type: 'all' | 'passengers' | 'parcel', city: string | null) => {
    let filtered = rides;

    // Filter by type
    if (type !== 'all') {
      filtered = filtered.filter(ride => ride.type === type);
    }

    // Filter by city
    if (city) {
      filtered = filtered.filter(
        ride =>
          extractCity(ride.pickupLocation).toLowerCase() === city.toLowerCase() ||
          extractCity(ride.dropoffLocation).toLowerCase() === city.toLowerCase()
      );
    }

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        ride =>
          ride.pickupLocation.toLowerCase().includes(query) ||
          ride.dropoffLocation.toLowerCase().includes(query) ||
          ride.vehicle.toLowerCase().includes(query) ||
          ride.driverName.toLowerCase().includes(query)
      );
    }

    setFilteredRides(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <section id="find-ride" className="py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Ride
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse available rides and connect with drivers traveling your route.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by pickup, dropoff, vehicle, or driver name..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-lg"
            />
          </div>

          {/* Location Capsules */}
          {!isLoading && rides.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {getCityCounts().map(({ city, count }) => (
                <button
                  key={city}
                  onClick={() => handleCityClick(city)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors flex items-center gap-2 ${
                    selectedCity === city
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-100'
                  }`}
                >
                  <MapPin size={16} />
                  {city}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCity === city
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {count}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                filterType === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-500'
              }`}
            >
              <Filter size={18} />
              All Rides
            </button>
            <button
              onClick={() => handleFilterChange('passengers')}
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
              onClick={() => handleFilterChange('parcel')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                filterType === 'parcel'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-500'
              }`}
            >
              <Car size={18} />
              Parcel Delivery
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredRides.length} {filteredRides.length === 1 ? 'ride' : 'rides'} available
          </p>
          <button
            onClick={fetchRides}
            className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading rides...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-red-200">
            <p className="text-xl text-red-600 mb-2">Error loading rides</p>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={fetchRides}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Rides List */}
        {!isLoading && !error && (
          <div className="space-y-6">
            {filteredRides.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200">
                <p className="text-xl text-gray-600 mb-2">No rides found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
            filteredRides.map(ride => (
              <div
                key={ride.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-gray-100"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Side - Route Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          ride.type === 'passengers' ? 'bg-emerald-100' : 'bg-blue-100'
                        }`}>
                          {ride.type === 'passengers' ? (
                            <Users size={24} className={ride.type === 'passengers' ? 'text-emerald-600' : 'text-blue-600'} />
                          ) : (
                            <Car size={24} className="text-blue-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            ride.type === 'passengers' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {ride.type === 'passengers' ? 'Passengers' : 'Parcel Delivery'}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-900">
                            <MapPin size={18} className="text-emerald-600 flex-shrink-0" />
                            <span className="font-semibold">{ride.pickupLocation}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 ml-5">
                            <span className="text-emerald-600">↓</span>
                            <span>{ride.dropoffLocation}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={18} className="text-emerald-600" />
                        <span>{formatDate(ride.departureDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-emerald-600" />
                        <span>{ride.departureTime}</span>
                      </div>
                    </div>

                    {/* Vehicle and Driver Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Car size={16} className="text-emerald-600" />
                        <span>{ride.vehicle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {ride.selfieUrl && (
                          <img 
                            src={ride.selfieUrl} 
                            alt={ride.driverName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <span className="font-semibold">{ride.driverName}</span>
                      </div>
                    </div>

                    {/* Phone Number and WhatsApp */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={16} className="text-emerald-600" />
                        <span className="font-medium">{ride.phoneNumber}</span>
                      </div>
                      {ride.isWhatsApp && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          <MessageSquare size={12} />
                          WhatsApp
                        </div>
                      )}
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
                    {ride.type === 'passengers' && ride.seatsAvailable && ride.pricePerSeat && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={18} className="text-emerald-600" />
                          <span className="text-gray-700 font-semibold">
                            {ride.seatsAvailable} {ride.seatsAvailable === 1 ? 'seat' : 'seats'} available
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">
                          R{ride.pricePerSeat}
                          <span className="text-sm font-normal text-gray-600">/seat</span>
                        </div>
                      </div>
                    )}
                    {ride.type === 'parcel' && (
                      <div className="mb-4">
                        <div className="text-lg font-semibold text-gray-700">
                          Parcel Delivery
                        </div>
                        <div className="text-sm text-gray-600">
                          Contact for pricing
                        </div>
                      </div>
                    )}
                    <a
                      href={ride.isWhatsApp ? `https://wa.me/${ride.phoneNumber.replace(/[^0-9]/g, '')}` : `tel:${ride.phoneNumber}`}
                      target={ride.isWhatsApp ? "_blank" : "_self"}
                      rel={ride.isWhatsApp ? "noopener noreferrer" : undefined}
                      className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-center flex items-center justify-center gap-2"
                    >
                      {ride.isWhatsApp ? (
                        <>
                          <MessageSquare size={18} />
                          WhatsApp Driver
                        </>
                      ) : (
                        <>
                          <Phone size={18} />
                          Call Driver
                        </>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableRides;

