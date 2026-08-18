import React, { useEffect, useState } from 'react';
import Navigation from '../src/components/Navigation';
import { API_BASE_URL } from '../src/config';

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
    { id: 'agriculture', name: 'Crop & Sowing', icon: '🌾' },
    { id: 'weather', name: 'Monsoon & Climate', icon: '🌤️' },
    { id: 'markets', name: 'Mandi Rates & MSP', icon: '📊' },
    { id: 'technology', name: 'Agri-Tech & Drones', icon: '🔬' },
    { id: 'policy', name: 'Government Policy', icon: '📋' }
  ];

  const defaultNewsImages = [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&auto=format&fit=crop&q=80"
  ];

  const formatRelativeTime = (dateString) => {
    if (!dateString) return 'Today';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/news`);
        const data = await response.json();

        if (data.status === 'ok' && Array.isArray(data.articles)) {
          const enhanced = data.articles.map((art, idx) => ({
            ...art,
            id: idx + 1,
            category: categories[(idx % (categories.length - 1)) + 1].id,
            readTime: (idx % 3) + 3,
            urlToImage: art.urlToImage || defaultNewsImages[idx % defaultNewsImages.length]
          }));
          setArticles(enhanced);
        } else {
          // Fallback mock news articles
          setArticles([
            {
              id: 1,
              title: "Government Hikes MSP for Kharif & Rabi Crops to Boost Farm Incomes",
              description: "The Cabinet Committee on Economic Affairs has approved increased Minimum Support Prices for major agricultural commodities including wheat, pulses, and oilseeds.",
              url: "https://pib.gov.in/",
              urlToImage: defaultNewsImages[0],
              publishedAt: new Date().toISOString(),
              category: "policy",
              readTime: 3
            },
            {
              id: 2,
              title: "Favorable Monsoon Distribution Accelerates Sowing Across Northern & Central States",
              description: "IMD reports widespread rainfall across major river basins, accelerating paddy transplanting and pulses acreage by 8% year-on-year.",
              url: "https://pib.gov.in/",
              urlToImage: defaultNewsImages[1],
              publishedAt: new Date(Date.now() - 7200000).toISOString(),
              category: "weather",
              readTime: 4
            },
            {
              id: 3,
              title: "Kisan Drones for Precision Pesticide Spraying Witness Surge in Adoption",
              description: "Subsidies under the Sub-Mission on Agricultural Mechanization (SMAM) enable FPOs to deploy automated drone spraying, cutting chemical wastage by 40%.",
              url: "https://pib.gov.in/",
              urlToImage: defaultNewsImages[2],
              publishedAt: new Date(Date.now() - 18000000).toISOString(),
              category: "technology",
              readTime: 3
            }
          ]);
        }
      } catch (err) {
        console.error('News fetch error:', err);
        setError('Failed to fetch agricultural news feed.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = (art.title && art.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (art.description && art.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-purple-500 selection:text-white">
      <Navigation />

      {/* Hero Section with High-Res Photography */}
      <section className="relative py-16 px-4 overflow-hidden border-b border-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=1600&auto=format&fit=crop&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/85 to-[#090d16]/60"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
            <span>📰 National Agricultural News & Insights</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Agricultural News & Market Insights
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Curated daily updates on MSP decisions, weather patterns, Agri-Tech innovations, and rural farming policies.
          </p>

          {/* Search Input */}
          <div className="max-w-xl mx-auto relative">
            <i className="fas fa-search absolute left-4 top-3.5 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search news topics, policy, MSP, monsoon..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-6 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 border ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* News Articles Grid */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        {loading && (
          <div className="text-center py-24 bg-slate-900/60 rounded-3xl border border-slate-800">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
            <p className="text-slate-300 text-lg font-medium">Aggregating live agricultural news feeds...</p>
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-20 bg-slate-900/60 rounded-3xl border border-slate-800 max-w-md mx-auto">
            <i className="fas fa-newspaper text-slate-500 text-3xl mb-3"></i>
            <h3 className="text-lg font-bold text-white mb-1">No News Articles Found</h3>
            <p className="text-slate-400 text-xs">Try clearing your search query or selecting "All News".</p>
          </div>
        )}

        {!loading && currentArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((art) => (
              <article
                key={art.id}
                className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={art.urlToImage}
                    alt={art.title}
                    onError={(e) => {
                      e.target.src = defaultNewsImages[0];
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-bold text-purple-300 border border-purple-500/30">
                      {categories.find(c => c.id === art.category)?.name || 'Agriculture'}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span>📅 {formatRelativeTime(art.publishedAt)}</span>
                      <span>⏱️ {art.readTime} min read</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                      {art.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Source: {art.source?.name || 'Agri Press'}
                    </span>

                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 font-bold text-xs space-x-1.5"
                    >
                      <span>Read Story</span>
                      <i className="fas fa-external-link-alt text-[10px]"></i>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition"
            >
              <i className="fas fa-chevron-left mr-1"></i> Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => paginate(num)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                  currentPage === num
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition"
            >
              Next <i className="fas fa-chevron-right ml-1"></i>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default News;
