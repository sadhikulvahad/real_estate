import { Award, Users, TrendingUp, Shield } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Award,
      number: '15+',
      label: 'Years of Excellence',
      description: 'Industry-leading expertise',
    },
    {
      icon: Users,
      number: '1000+',
      label: 'Happy Families',
      description: 'Trust our service',
    },
    {
      icon: TrendingUp,
      number: '$2B+',
      label: 'Properties Sold',
      description: 'Total transaction value',
    },
    {
      icon: Shield,
      number: '100%',
      label: 'Client Satisfaction',
      description: 'Guaranteed service',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-semibold text-sm mb-4">
              About EliteEstates
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transforming Dreams Into Addresses
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              For over 15 years, EliteEstates has been the trusted name in luxury real estate.
              We don't just sell properties; we craft lifestyles and create communities where
              dreams come to life.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our commitment to excellence, combined with deep market knowledge and personalized
              service, ensures that every client finds not just a house, but a home that perfectly
              matches their aspirations.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed & Certified</h3>
                  <p className="text-gray-600">
                    Fully licensed real estate professionals with national certifications
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Award-Winning Service</h3>
                  <p className="text-gray-600">
                    Recognized industry leader with multiple accolades for excellence
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Luxury property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Modern architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Interior design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-64 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Beautiful home"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-2xl p-6 shadow-xl max-w-xs">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg">Properties Successfully Sold</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center group">
              <div className="mb-4 inline-block">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{achievement.number}</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">{achievement.label}</div>
              <div className="text-sm text-gray-600">{achievement.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
