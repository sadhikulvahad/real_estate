import { useState } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  location: string;
  type: string;
  budget: string;
}

const Hero = ({ onSearch }: HeroProps) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    type: '',
    budget: '',
  });

  const handleSearch = () => {
    onSearch(searchFilters);
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Dream
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Property Today
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Discover luxury living spaces that perfectly match your lifestyle and aspirations
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={searchFilters.location}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, location: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={searchFilters.type}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, type: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="studio">Studio</option>
                </select>
              </div>

              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={searchFilters.budget}
                  onChange={(e) =>
                    setSearchFilters({ ...searchFilters, budget: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Budget Range</option>
                  <option value="0-500000">Under $500K</option>
                  <option value="500000-1000000">$500K - $1M</option>
                  <option value="1000000-2000000">$1M - $2M</option>
                  <option value="2000000-5000000">$2M - $5M</option>
                  <option value="5000000-999999999">$5M+</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Search Properties</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: '500+', label: 'Properties Sold' },
              { number: '1000+', label: 'Happy Clients' },
              { number: '15+', label: 'Years Experience' },
              { number: '50+', label: 'Expert Agents' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
