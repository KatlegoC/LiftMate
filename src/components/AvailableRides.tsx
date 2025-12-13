import { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Car, Search, Filter } from 'lucide-react';

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
  driverRating: number;
  comments?: string;
}

// Mock data for demonstration
const mockRides: Ride[] = [
  {
    id: '1',
    type: 'passengers',
    pickupLocation: 'Johannesburg, Gauteng',
    dropoffLocation: 'Cape Town, Western Cape',
    departureDate: '2024-12-20',
    departureTime: '08:00',
    seatsAvailable: 3,
    pricePerSeat: 350,
    vehicle: 'Toyota Corolla 2020',
    driverName: 'Thabo M.',
    driverRating: 4.9,
    comments: 'Comfortable ride with AC. Willing to make stops along the way.',
  },
  {
    id: '2',
    type: 'passengers',
    pickupLocation: 'Durban, KwaZulu-Natal',
    dropoffLocation: 'Johannesburg, Gauteng',
    departureDate: '2024-12-18',
    departureTime: '06:30',
    seatsAvailable: 2,
    pricePerSeat: 280,
    vehicle: 'Honda Civic 2019',
    driverName: 'Sarah K.',
    driverRating: 4.8,
    comments: 'Early departure. Non-smoking vehicle.',
  },
  {
    id: '3',
    type: 'passengers',
    pickupLocation: 'Pretoria, Gauteng',
    dropoffLocation: 'Bloemfontein, Free State',
    departureDate: '2024-12-19',
    departureTime: '14:00',
    seatsAvailable: 4,
    pricePerSeat: 200,
    vehicle: 'VW Polo 2021',
    driverName: 'John D.',
    driverRating: 5.0,
  },
  {
    id: '4',
    type: 'parcel',
    pickupLocation: 'Port Elizabeth, Eastern Cape',
    dropoffLocation: 'East London, Eastern Cape',
    departureDate: '2024-12-17',
    departureTime: '10:00',
    vehicle: 'Ford Ranger 2022',
    driverName: 'Mike T.',
    driverRating: 4.7,
    comments: 'Secure parcel delivery. Tracking available.',
  },
  {
    id: '5',
    type: 'passengers',
    pickupLocation: 'Cape Town, Western Cape',
    dropoffLocation: 'Stellenbosch, Western Cape',
    departureDate: '2024-12-21',
    departureTime: '09:00',
    seatsAvailable: 1,
    pricePerSeat: 150,
    vehicle: 'BMW 3 Series 2020',
    driverName: 'Lisa W.',
    driverRating: 4.9,
    comments: 'Direct route, no stops.',
  },
];

export const AvailableRides: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'passengers' | 'parcel'>('all');
  const [filteredRides, setFilteredRides] = useState<Ride[]>(mockRides);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterRides(query, filterType);
  };

  const handleFilterChange = (type: 'all' | 'passengers' | 'parcel') => {
    setFilterType(type);
    filterRides(searchQuery, type);
  };

  const filterRides = (query: string, type: 'all' | 'passengers' | 'parcel') => {
    let filtered = mockRides;

    // Filter by type
    if (type !== 'all') {
      filtered = filtered.filter(ride => ride.type === type);
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
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredRides.length} {filteredRides.length === 1 ? 'ride' : 'rides'} available
          </p>
        </div>

        {/* Rides List */}
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
                        <span className="font-semibold">{ride.driverName}</span>
                        <span className="text-emerald-600">★ {ride.driverRating}</span>
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
                    <button className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                      Contact Driver
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AvailableRides;

