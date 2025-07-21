import React, { useEffect, useState } from 'react';
import Navigation from '../src/components/Navigation';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const categories = [
    { id: 'all', name: 'All News', icon: '📰' },
    { id: 'agriculture', name: 'Agriculture', icon: '🌾' },
    { id: 'weather', name: 'Weather', icon: '🌤️' },
    { id: 'markets', name: 'Markets', icon: '📊' },
    { id: 'technology', name: 'Technology', icon: '🔬' },
    { id: 'policy', name: 'Policy', icon: '📋' }
  ];

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      agriculture: 'bg-green-100 text-green-800',
      weather: 'bg-blue-100 text-blue-800',
      markets: 'bg-amber-100 text-amber-800',
      technology: 'bg-purple-100 text-purple-800',
      policy: 'bg-red-100 text-red-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.general;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/news');
        const data = await response.json();
        
        if (data.status === 'ok') {
          // Add mock categories and enhance data
          const enhancedArticles = data.articles.map((article, index) => ({
            ...article,
            id: index + 1,
            category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id,
            readTime: Math.floor(Math.random() * 5) + 2,
            likes: Math.floor(Math.random() * 1000) + 50,
            shares: Math.floor(Math.random() * 500) + 20
          }));
          setArticles(enhancedArticles);
        } else {
          // Mock data for demonstration
          const mockArticles = [
            {
              id: 1,
              title: "Government Announces New MSP Hike for Wheat and Rice",
              description: "The central government has increased the Minimum Support Price for wheat by ₹150 per quintal and rice by ₹125 per quintal for the upcoming Rabi season.",
              url: "#",
              urlToImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop",
              publishedAt: new Date().toISOString(),
              category: "policy",
              readTime: 3,
              likes: 1250,
              shares: 340
            },
            {
              id: 2,
              title: "Monsoon Arrives Early in Northern India, Boosting Crop Prospects",
              description: "Early monsoon arrival brings relief to farmers across northern states, with rainfall 15% above normal in key agricultural regions.",
              url: "#",
              urlToImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=400&fit=crop",
              publishedAt: new Date(Date.now() - 3600000).toISOString(),
              category: "weather",
              readTime: 4,
              likes: 890,
              shares: 210
            },
            {
              id: 3,
              title: "Revolutionary Drone Technology Transforms Crop Monitoring",
              description: "New AI-powered agricultural drones are helping farmers monitor crop health, detect diseases early, and optimize irrigation schedules.",
              url: "#",
              urlToImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
              publishedAt: new Date(Date.now() - 7200000).toISOString(),
              category: "technology",
              readTime: 5,
              likes: 2100,
              shares: 560
            },
            {
              id: 4,
              title: "Tomato Prices Surge 40% Due to Supply Chain Disruptions",
              description: "Market analysis reveals significant price increases in tomato markets across major cities, attributed to transportation challenges and reduced supply.",
              url: "#",
              urlToImage: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&h=400&fit=crop",
              publishedAt: new Date(Date.now() - 10800000).toISOString(),
              category: "markets",
              readTime: 3,
              likes: 670,
              shares: 180
            },
            {
              id: 5,
              title: "Organic Farming Certification Process Simplified for Small Farmers",
              description: "New government initiative streamlines organic certification process, making it more accessible and affordable for small and marginal farmers.",
              url: "#",
              urlToImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop",
              publishedAt: new Date(Date.now() - 14400000).toISOString(),
              category: "agriculture",
              readTime: 4,
              likes: 1560,
              shares: 420
            },
            {
              id: 6,
              title: "Climate-Resistant Crop Varieties Show Promising Results",
              description: "Scientists develop new wheat and rice varieties that can withstand extreme weather conditions, potentially securing food production against climate change.",
              url: "#",
              urlToImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop",
              publishedAt: new Date(Date.now() - 18000000).toISOString(),
              category: "agriculture",
              readTime: 6,
              likes: 980,
              shares: 290
            }
          ];
          setArticles(mockArticles);
        }
      } catch (err) {
        console.error('News fetch error:', err);
        setError('Failed to load news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Agricultural News</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Latest updates, insights, and developments in agriculture
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Search News</label>
                <input
                  type="text"
                  placeholder="Search articles, topics, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-slate-700">
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center">
              <i className="fas fa-exclamation-triangle text-red-400 text-2xl mb-2"></i>
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {!loading && !error && currentArticles.length === 0 && (
            <div className="text-center py-20">
              <i className="fas fa-search text-slate-400 text-4xl mb-4"></i>
              <p className="text-slate-400 text-xl">No articles found for your search</p>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArticles.map((article) => (
              <article key={article.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                    <span>{formatRelativeTime(article.publishedAt)}</span>
                    <span>{article.readTime} min read</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-purple-300 transition">
                    {article.title}
                  </h3>

                  <p className="text-slate-300 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-heart text-red-400"></i>
                        <span>{article.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-share text-blue-400"></i>
                        <span>{article.shares}</span>
                      </span>
                    </div>
                  </div>

                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition"
                  >
                    Read More
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === number
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{articles.length}</div>
              <div className="text-slate-400">Total Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{categories.length - 1}</div>
              <div className="text-slate-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{currentArticles.length}</div>
              <div className="text-slate-400">Showing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">Live</div>
              <div className="text-slate-400">Updates</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
