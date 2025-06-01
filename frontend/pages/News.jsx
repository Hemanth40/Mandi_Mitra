import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../src/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        if (data.status === 'ok') {
          setArticles(data.articles);
        } else {
          setError('Failed to fetch news');
        }
      } catch (err) {
        setError('Error fetching news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen w-full bg-amber-100 m-0 p-0">
      {/* Sticky Navigation Bar */}
      <header className="bg-white/30 backdrop-blur-lg rounded-full p-2 shadow-lg sticky top-0 z-50 max-w-5xl mx-auto px-2 mt-2">
        <div className="px-2 sm:px-4 lg:px-6 flex justify-between items-center min-h-0">
          <div className="flex items-center space-x-1">
            <i className="fas fa-handshake text-amber-700 h-8 w-8 text-2xl"></i>
            <h1 className="text-2xl font-bold font-serif text-amber-900">Mandi Mitra</h1>
          </div>
          <nav className="flex space-x-5 items-center">
            <Link to="/prices" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-chart-line mr-1"></i> Market Prices
            </Link>
            <Link to="/weather" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-cloud-sun mr-1"></i> Weather
            </Link>
            <Link to="/crop-doctor" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-seedling mr-1"></i> Crop Doctor
            </Link>
            <Link to="/news" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-newspaper mr-1"></i> News
            </Link>
            <Link to="/schemes" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-gavel mr-1"></i> Schemes
            </Link>
            <Link to="/login" className="flex items-center bg-amber-600 text-white px-4 py-1.5 rounded-full hover:bg-amber-700 transition font-medium shadow-md text-base">
              <i className="fas fa-sign-in-alt mr-1"></i> Login
            </Link>
          </nav>
        </div>
      </header>

      {/* News Content */}
      <div className="min-h-screen bg-white p-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 font-serif">Agricultural News for Farmers</h1>
        {loading && <p className="text-amber-700 text-lg">Loading news...</p>}
        {error && <p className="text-red-600 text-lg">{error}</p>}
        <div className="space-y-8">
          {articles.map((article, index) => (
            <div key={index} className="border-b border-amber-300 pb-6">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover rounded-lg mb-4" />
              )}
              <h3 className="text-2xl font-semibold text-amber-800 mb-2">{article.title}</h3>
              <p className="text-sm text-amber-600 mb-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
              <p className="text-amber-700 mb-4">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">Read more →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;