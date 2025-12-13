import { useState, useEffect, useRef } from 'react';
import { X, MapPin, Calendar, Clock, Users, DollarSign, Car, FileText, MessageSquare, User, Phone, Camera } from 'lucide-react';
import { supabase, RidePost } from '../lib/supabase';

interface PostRideFormProps {
  isOpen: boolean;
  onClose: () => void;
  rideType?: 'offer' | 'request'; // 'offer' = driver offering ride, 'request' = rider looking for ride
  onSuccess?: () => void;
}

export const PostRideForm: React.FC<PostRideFormProps> = ({ isOpen, onClose, rideType = 'offer', onSuccess }) => {
  const [postType, setPostType] = useState<'passengers' | 'parcel' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    isWhatsApp: false,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPostType(null);
      setFormData({
        name: '',
        phoneNumber: '',
        isWhatsApp: false,
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
      setSelfie(null);
      setIsHumanVerified(false);
      setShowCamera(false);
    }
  }, [isOpen]);

  // Camera handling
  useEffect(() => {
    if (showCamera && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          alert('Could not access camera. Please allow camera permissions.');
          setShowCamera(false);
        });
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);

  const captureSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelfie(dataUrl);
        setShowCamera(false);
        setIsHumanVerified(true);
        // Stop video stream
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  };

  const retakeSelfie = () => {
    setSelfie(null);
    setIsHumanVerified(false);
    setShowCamera(true);
  };

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isHumanVerified || !selfie) {
      alert('Please complete selfie verification');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload selfie to Supabase Storage
      let selfieUrl = '';
      try {
        const selfieBlob = await fetch(selfie).then(r => r.blob());
        const fileName = `selfies/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('selfies')
          .upload(fileName, selfieBlob, { contentType: 'image/jpeg' });

        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('selfies')
          .getPublicUrl(fileName);
        selfieUrl = urlData.publicUrl;
      } catch (storageError) {
        console.error('Storage error, using base64 fallback:', storageError);
        // Fallback: store as base64 in database (not ideal but works)
        selfieUrl = selfie;
      }

      // Prepare ride data
      const rideData: RidePost = {
        ride_type: rideType,
        post_type: postType!,
        pickup_location: formData.pickupLocation,
        dropoff_location: formData.dropoffLocation,
        departure_date: formData.departureDate,
        departure_time: formData.departureTime,
        seats_available: postType === 'passengers' && formData.seatsAvailable ? parseInt(formData.seatsAvailable) : undefined,
        price_per_seat: rideType === 'offer' && postType === 'passengers' && formData.pricePerSeat ? parseFloat(formData.pricePerSeat) : undefined,
        vehicle: rideType === 'offer' ? formData.vehicle : undefined,
        vehicle_registration: rideType === 'offer' ? formData.vehicleRegistration : undefined,
        comments: formData.comments || undefined,
        driver_name: formData.name,
        phone_number: formData.phoneNumber,
        is_whatsapp: formData.isWhatsApp,
        selfie_url: selfieUrl,
      };

      // Insert into Supabase
      const { error } = await supabase
        .from('rides')
        .insert([rideData]);

      if (error) {
        console.error('Error posting ride:', error);
        if (error.message.includes('network') || error.message.includes('fetch')) {
          alert('Network error. Please check your internet connection and try again.');
        } else if (error.message.includes('permission') || error.message.includes('RLS')) {
          alert('Permission denied. Please check your database permissions.');
        } else {
          alert(`Failed to post ride: ${error.message}`);
        }
        setIsSubmitting(false);
        return;
      }

      alert('Ride posted successfully!');
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Error:', error);
      alert(`Failed to post ride: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
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
            <h2 className="text-2xl font-bold text-gray-900">
              {rideType === 'offer' ? 'Post a Ride' : 'Request a Ride'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                    {rideType === 'offer' ? 'Posting' : 'Requesting'}: <span className="font-semibold capitalize">{postType}</span>
                  </span>
                </div>

                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} className="text-emerald-600" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Phone size={16} className="text-emerald-600" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 0821234567"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isWhatsApp"
                      name="isWhatsApp"
                      checked={formData.isWhatsApp}
                      onChange={(e) => setFormData(prev => ({ ...prev, isWhatsApp: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <label htmlFor="isWhatsApp" className="text-sm text-gray-600">
                      This number is on WhatsApp
                    </label>
                  </div>
                </div>

                {/* Selfie Verification */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Camera size={16} className="text-emerald-600" />
                    Selfie Verification
                  </label>
                  {!selfie && !showCamera && (
                    <button
                      type="button"
                      onClick={() => setShowCamera(true)}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-gray-600"
                    >
                      Click to take a selfie
                    </button>
                  )}
                  {showCamera && (
                    <div className="space-y-2">
                      <div className="relative bg-black rounded-lg overflow-hidden">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-64 object-cover"
                        />
                        <canvas
                          ref={canvasRef}
                          className="hidden"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={captureSelfie}
                        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        Capture
                      </button>
                    </div>
                  )}
                  {selfie && (
                    <div className="space-y-2">
                      <img src={selfie} alt="Selfie" className="w-full h-64 object-cover rounded-lg border-2 border-emerald-500" />
                      <button
                        type="button"
                        onClick={retakeSelfie}
                        className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Retake
                      </button>
                    </div>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isHumanVerified"
                      checked={isHumanVerified}
                      onChange={(e) => setIsHumanVerified(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <label htmlFor="isHumanVerified" className="text-sm text-gray-600">
                      I confirm this is a real person (human verification)
                    </label>
                  </div>
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
                      {/* Seats Available/Needed */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Users size={16} className="text-emerald-600" />
                          {rideType === 'offer' ? 'Seats Available' : 'Seats Needed'}
                        </label>
                        <input
                          type="number"
                          name="seatsAvailable"
                          value={formData.seatsAvailable}
                          onChange={handleInputChange}
                          placeholder={rideType === 'offer' ? 'e.g., 3' : 'e.g., 2'}
                          min="1"
                          max="10"
                          required={postType === 'passengers'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>

                      {/* Price Per Seat (only for offers) */}
                      {rideType === 'offer' && (
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
                      )}
                    </div>
                  </>
                )}

                {/* Vehicle (only for offers) */}
                {rideType === 'offer' && (
                  <>
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
                  </>
                )}

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
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Posting...' : rideType === 'offer' ? 'Post Ride' : 'Request Ride'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostRideForm;

