import { useState, useEffect } from 'react';
import { Phone, Mail, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Agent = Database['public']['Tables']['agents']['Row'];

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('experience_years', { ascending: false });

      if (error) throw error;
      setAgents(data || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="agents" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mb-4">
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Expert Agents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals committed to finding your perfect property
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-80 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No agents available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={agent.photo || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600`}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{agent.name}</h3>
                    <p className="text-blue-300 font-medium">{agent.specialization || 'Real Estate Agent'}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">
                      {agent.experience_years} Years Experience
                    </span>
                  </div>

                  {agent.bio && (
                    <p className="text-gray-600 mb-6 line-clamp-3">{agent.bio}</p>
                  )}

                  <div className="space-y-3">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center justify-center space-x-2 w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Email</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Agents;
