import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Clock, Users, DollarSign, Car, FileText, MessageSquare, Facebook, LogOut } from 'lucide-react';
import { useFacebookAuth } from '../hooks/useFacebookAuth';

interface PostRideFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Facebook App ID - Replace with your actual App ID from https://developers.facebook.com/
// For development, you can use a test app ID or set it via environment variable
const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID';

export const PostRideForm: React.FC<PostRideFormProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, isLoading, login, logout } = useFacebookAuth(FACEBOOK_APP_ID);
  const [postType, setPostType] = useState<'passengers' | 'parcel' | null>(null);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    departureDate: '',
    departureTime: '',
    seatsAvailable: '',
    pricePerSeat: '',
    vehicle: '',
    vehicleRegistration: '',
    comments: '',
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPostType(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFacebookLogin = async () => {
    try {
      await login();
    } catch (error) {
      alert('Facebook login failed. Please try again.');
      console.error('Facebook login error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', { postType, ...formData });
    alert('Ride posted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-gray-900">Post a Ride</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : !isAuthenticated ? (
            /* Facebook Login Screen */
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Facebook size={40} className="text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Connect with Facebook
                </h3>
                <p className="text-gray-600 mb-6">
                  Please sign in with your Facebook account to post a ride. This helps us verify your identity and keep our community safe.
                </p>
              </div>
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="w-full bg-[#1877F2] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#166FE5] transition-colors flex items-center justify-center gap-3 mb-4"
              >
                <Facebook size={24} />
                Continue with Facebook
              </button>
              <p className="text-xs text-gray-500">
                By continuing, you agree to LiftMate's Terms of Service and Privacy Policy
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* User Info Bar */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {user?.picture?.data?.url ? (
                    <img 
                      src={user.picture.data.url} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">Ready to post your ride</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm"
                  title="Logout"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>

              {/* Step 1: Post Type Selection */}
              {!postType && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What are you posting?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPostType('passengers')}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group"
                  >
                    <Users size={32} className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Passengers</h4>
                    <p className="text-gray-600">Share your ride with passengers</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostType('parcel')}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group"
                  >
                    <FileText size={32} className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Parcel</h4>
                    <p className="text-gray-600">Deliver packages or parcels</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Form Fields (only show if postType is selected) */}
            {postType && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPostType(null)}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    ← Back
                  </button>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-600">
                    Posting: <span className="font-semibold capitalize">{postType}</span>
                  </span>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin size={16} className="text-emerald-600" />
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Johannesburg, Gauteng"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                {/* Dropoff Location */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin size={16} className="text-emerald-600" />
                    Dropoff Location
                  </label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Cape Town, Western Cape"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Departure Date */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={16} className="text-emerald-600" />
                      Departure Date
                    </label>
                    <input
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>

                  {/* Departure Time */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Clock size={16} className="text-emerald-600" />
                      Departure Time
                    </label>
                    <input
                      type="time"
                      name="departureTime"
                      value={formData.departureTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {postType === 'passengers' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Seats Available */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Users size={16} className="text-emerald-600" />
                          Seats Available
                        </label>
                        <input
                          type="number"
                          name="seatsAvailable"
                          value={formData.seatsAvailable}
                          onChange={handleInputChange}
                          placeholder="e.g., 3"
                          min="1"
                          max="10"
                          required={postType === 'passengers'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>

                      {/* Price Per Seat */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <DollarSign size={16} className="text-emerald-600" />
                          Price Per Seat (R)
                        </label>
                        <input
                          type="number"
                          name="pricePerSeat"
                          value={formData.pricePerSeat}
                          onChange={handleInputChange}
                          placeholder="e.g., 250"
                          min="0"
                          step="0.01"
                          required={postType === 'passengers'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Vehicle */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Car size={16} className="text-emerald-600" />
                    Vehicle (Car Model)
                  </label>
                  <input
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    placeholder="e.g., Toyota Corolla 2020"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                {/* Vehicle Registration */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText size={16} className="text-emerald-600" />
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    name="vehicleRegistration"
                    value={formData.vehicleRegistration}
                    onChange={handleInputChange}
                    placeholder="e.g., ABC 123 GP"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all uppercase"
                    style={{ textTransform: 'uppercase' }}
                  />
                </div>

                {/* Comments */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MessageSquare size={16} className="text-emerald-600" />
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    placeholder="Add any additional details, preferences, or special instructions..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Post Ride
                  </button>
                </div>
              </>
            )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostRideForm;

