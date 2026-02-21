import { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      tips: 'bg-green-100 text-green-600',
      'market-trends': 'bg-blue-100 text-blue-600',
      investment: 'bg-orange-100 text-orange-600',
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  const categories = [
    { key: 'all', label: 'All Posts' },
    { key: 'tips', label: 'Tips & Guides' },
    { key: 'market-trends', label: 'Market Trends' },
    { key: 'investment', label: 'Investment' },
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-semibold text-sm mb-4">
            Insights & Updates
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Market Insights & Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest real estate trends and expert advice
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === category.key
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-56 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      post.featured_image ||
                      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600'
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-2 rounded-full font-semibold text-sm ${getCategoryColor(
                        post.category
                      )}`}
                    >
                      {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}

                  <button className="flex items-center space-x-2 text-blue-600 font-semibold group-hover:space-x-3 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
