import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Properties from './components/Properties';
import PropertyDetail from './components/PropertyDetail';
import About from './components/About';
import Agents from './components/Agents';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import type { Database } from './lib/database.types';

type Property = Database['public']['Tables']['properties']['Row'];

interface SearchFilters {
  location: string;
  type: string;
  budget: string;
}

function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    type: '',
    budget: '',
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero onSearch={setSearchFilters} />
      <Properties
        searchFilters={searchFilters}
        onPropertyClick={setSelectedProperty}
      />
      <About />
      <Agents />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />

      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}

export default App;
