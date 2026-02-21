import { useState } from 'react';
import { X, MapPin, Bed, Bath, Maximize, Check, Phone, Mail } from 'lucide-react';
import type { Database } from '../lib/database.types';
import { supabase } from '../lib/supabase';

type Property = Database['public']['Tables']['properties']['Row'];

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetail = ({ property, onClose }: PropertyDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const images = Array.isArray(property.images) ? property.images.map(img => String(img)) : [];
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      const { error } = await supabase.from('inquiries').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        property_id: property.id,
        inquiry_type: 'property',
        preferred_date: formData.preferredDate || null,
      }] as never);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', preferredDate: '' });
      setTimeout(() => {
        setShowInquiryForm(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative h-96">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                  <div className="text-4xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8 bg-gray-50 rounded-xl p-6">
                  <div className="text-center">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Maximize className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">{property.area_sqft}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 mx-auto mb-2">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 capitalize">{property.property_type}</div>
                    <div className="text-xs text-gray-600">Type</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {property.description || 'No description available.'}
                  </p>
                </div>

                {amenities.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700">{String(amenity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in this property?</h3>

                  {!showInquiryForm ? (
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowInquiryForm(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center space-x-2"
                      >
                        <Mail className="w-5 h-5" />
                        <span>Send Inquiry</span>
                      </button>
                      <a
                        href="tel:+1234567890"
                        className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:shadow-md transition-shadow flex items-center justify-center space-x-2 border-2 border-blue-600"
                      >
                        <Phone className="w-5 h-5" />
                        <span>Call Now</span>
                      </a>
                      <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:shadow-md transition-shadow flex items-center justify-center space-x-2"
                      >
                        <Phone className="w-5 h-5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitInquiry} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="date"
                        placeholder="Preferred Visit Date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        disabled={submitStatus === 'submitting'}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50"
                      >
                        {submitStatus === 'submitting' ? 'Sending...' :
                         submitStatus === 'success' ? 'Sent!' :
                         'Send Inquiry'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowInquiryForm(false)}
                        className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
