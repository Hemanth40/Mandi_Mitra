import React, { useState, useEffect } from 'react';
import Navigation from '../src/components/Navigation';

const GovSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedScheme, setExpandedScheme] = useState(null);

  const categories = [
    { id: 'all', name: 'All Schemes', icon: '🏛️', color: 'bg-gray-100 text-gray-800' },
    { id: 'subsidy', name: 'Subsidies', icon: '💰', color: 'bg-green-100 text-green-800' },
    { id: 'insurance', name: 'Insurance', icon: '🛡️', color: 'bg-blue-100 text-blue-800' },
    { id: 'infrastructure', name: 'Infrastructure', icon: '🏗️', color: 'bg-orange-100 text-orange-800' },
    { id: 'technology', name: 'Technology', icon: '🔬', color: 'bg-purple-100 text-purple-800' },
    { id: 'training', name: 'Training', icon: '🎓', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const schemesData = [
    {
      id: 1,
      name: "PM-Kisan Samman Nidhi",
      shortName: "PM-Kisan",
      description: "Income support of ₹6,000 per year to all farmer families across the country in three equal installments of ₹2,000 each.",
      fullDescription: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme launched on 24th February, 2019 to supplement the financial needs of land holding farmers. Under the scheme, financial benefit of ₹6,000/- per year is transferred in three 4-monthly installments of ₹2,000/- directly into the bank accounts of farmers' families.",
      category: "subsidy",
      amount: "₹6,000/year",
      eligibility: "All landholding farmer families",
      applicationProcess: "Online through PM-Kisan portal or Common Service Centers",
      documents: ["Aadhaar Card", "Bank Account Details", "Land Ownership Documents"],
      deadline: "No deadline - ongoing scheme",
      url: "https://pmkisan.gov.in/",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop",
      benefits: ["Direct cash transfer", "No middlemen", "Digital payment", "All farmers eligible"],
      status: "Active"
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana",
      shortName: "PMFBY",
      description: "Comprehensive crop insurance scheme to provide financial support to farmers in case of crop failure due to natural calamities.",
      fullDescription: "PMFBY provides comprehensive risk insurance for yield losses due to natural calamities, pest attacks and diseases. The scheme covers all food & oilseeds crops and annual commercial/horticultural crops for which past yield data is available. Farmers pay very low premium rates.",
      category: "insurance",
      amount: "Premium subsidy up to 98%",
      eligibility: "All farmers including sharecroppers and tenant farmers",
      applicationProcess: "Through banks, Common Service Centers, or online portal",
      documents: ["Aadhaar Card", "Bank Account Details", "Land Documents", "Crop Sowing Certificate"],
      deadline: "Before crop sowing",
      url: "https://pmfby.gov.in/",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&h=400&fit=crop",
      benefits: ["Low premium rates", "Comprehensive coverage", "Quick claim settlement", "Digital process"],
      status: "Active"
    },
    {
      id: 3,
      name: "Agriculture Infrastructure Fund",
      shortName: "AIF",
      description: "Financing facility for creation of post-harvest management infrastructure and community farming assets.",
      fullDescription: "AIF provides medium to long term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets through interest subvention and credit guarantee.",
      category: "infrastructure",
      amount: "₹1 Lakh Crore Fund",
      eligibility: "Farmers, FPOs, PACS, Cooperatives, SHGs, Startups",
      applicationProcess: "Through lending institutions and online portal",
      documents: ["Project Report", "Land Documents", "KYC Documents", "Bank Account"],
      deadline: "Ongoing",
      url: "https://agriinfra.dac.gov.in/",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
      benefits: ["Interest subvention", "Credit guarantee", "Long term loans", "Wide coverage"],
      status: "Active"
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      shortName: "SHC",
      description: "Provides soil health cards to farmers with crop-wise recommendations for nutrients and fertilizers.",
      fullDescription: "The scheme aims to promote Integrated Nutrient Management through judicious use of chemical fertilizers including secondary and micro nutrients in conjunction with organic manures and bio-fertilizers for improving soil health and its productivity.",
      category: "technology",
      amount: "Free soil testing",
      eligibility: "All farmers",
      applicationProcess: "Through soil testing labs and online portal",
      documents: ["Aadhaar Card", "Land Documents", "Application Form"],
      deadline: "Ongoing",
      url: "https://soilhealth.dac.gov.in/",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
      benefits: ["Free soil testing", "Personalized recommendations", "Improved yields", "Cost savings"],
      status: "Active"
    },
    {
      id: 5,
      name: "e-NAM (National Agriculture Market)",
      shortName: "e-NAM",
      description: "Online trading platform for agricultural commodities to create unified national market for farmers.",
      fullDescription: "e-NAM is a pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities. It provides real-time price discovery and promotes transparency in trading.",
      category: "technology",
      amount: "Free registration",
      eligibility: "All farmers, traders, commission agents",
      applicationProcess: "Through APMC mandis and online portal",
      documents: ["Aadhaar Card", "Bank Account", "Trade License", "PAN Card"],
      deadline: "Ongoing",
      url: "https://enam.gov.in/",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
      benefits: ["Better prices", "Transparent trading", "Wider market access", "Real-time information"],
      status: "Active"
    },
    {
      id: 6,
      name: "Pradhan Mantri Krishi Sinchayee Yojana",
      shortName: "PMKSY",
      description: "Scheme to expand cultivable area under assured irrigation and improve water use efficiency.",
      fullDescription: "PMKSY aims to enhance physical access of water on farm and expand cultivable area under assured irrigation, improve on-farm water use efficiency, introduce sustainable water conservation practices, and enhance adoption of precision-irrigation technologies.",
      category: "infrastructure",
      amount: "Varies by component",
      eligibility: "Farmers, States, ULBs, FPOs",
      applicationProcess: "Through state departments and online portal",
      documents: ["Project Proposal", "Land Documents", "Technical Feasibility Report", "Cost Estimates"],
      deadline: "Ongoing",
      url: "https://pmksy.gov.in/",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
      benefits: ["Irrigation expansion", "Water efficiency", "Technology adoption", "Sustainability"],
      status: "Active"
    },
    {
      id: 7,
      name: "National Mission on Sustainable Agriculture",
      shortName: "NMSA",
      description: "Mission to promote sustainable agriculture practices and climate-resilient farming.",
      fullDescription: "NMSA aims to transform Indian agriculture into a climate-resilient production system through suitable adaptation and mitigation measures in domains of both crops and animal husbandry.",
      category: "technology",
      amount: "Central assistance",
      eligibility: "Farmers, States, Research Institutions",
      applicationProcess: "Through state departments",
      documents: ["Project Proposal", "Technical Details", "Cost Estimates", "Implementation Plan"],
      deadline: "Ongoing",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop",
      benefits: ["Climate resilience", "Sustainability", "Technology adoption", "Capacity building"],
      status: "Active"
    },
    {
      id: 8,
      name: "Mission for Integrated Development of Horticulture",
      shortName: "MIDH",
      description: "Holistic development of horticulture sector covering fruits, vegetables, and flowers.",
      fullDescription: "MIDH aims to promote holistic growth of horticulture sector including fruits, vegetables, root & tuber crops, mushrooms, spices, flowers, aromatic plants, coconut, cashew, cocoa and bamboo through area based regionally differentiated strategies.",
      category: "subsidy",
      amount: "50-60% subsidy",
      eligibility: "Farmers, FPOs, Cooperatives, SHGs",
      applicationProcess: "Through state horticulture departments",
      documents: ["Project Report", "Land Documents", "Technical Details", "Cost Estimates"],
      deadline: "Ongoing",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
      benefits: ["High subsidy rates", "Technology support", "Market linkage", "Capacity building"],
      status: "Active"
    },
    {
      id: 9,
      name: "National Food Security Mission",
      shortName: "NFSM",
      description: "Mission to increase production of rice, wheat, pulses, and coarse cereals.",
      fullDescription: "NFSM aims to increase production of rice, wheat, pulses, and coarse cereals through area expansion and productivity enhancement in a sustainable manner.",
      category: "subsidy",
      amount: "Input subsidies and support",
      eligibility: "Farmers in identified districts",
      applicationProcess: "Through state agriculture departments",
      documents: ["Farmer Registration", "Land Documents", "Crop Details", "Bank Account"],
      deadline: "Seasonal",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&h=400&fit=crop",
      benefits: ["Input subsidies", "Technology support", "Extension services", "Market support"],
      status: "Active"
    },
    {
      id: 10,
      name: "Sub-Mission on Agricultural Mechanization",
      shortName: "SMAM",
      description: "Promoting farm mechanization among small and marginal farmers.",
      fullDescription: "SMAM aims to promote farm mechanization among small and marginal farmers through subsidies for purchase of agricultural machinery and equipment.",
      category: "subsidy",
      amount: "40-50% subsidy",
      eligibility: "Small & marginal farmers, FPOs, Cooperatives",
      applicationProcess: "Through state agriculture departments",
      documents: ["Farmer Registration", "Quotation", "Bank Details", "Land Documents"],
      deadline: "Ongoing",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
      benefits: ["Machinery subsidy", "Technology access", "Time saving", "Productivity enhancement"],
      status: "Active"
    },
    {
      id: 11,
      name: "Rashtriya Krishi Vikas Yojana",
      shortName: "RKVY",
      description: "State-specific strategies for agriculture development.",
      fullDescription: "RKVY aims to incentivize states to increase public investment in agriculture and allied sectors through state-specific strategies.",
      category: "infrastructure",
      amount: "Central assistance",
      eligibility: "States and farmers",
      applicationProcess: "Through state agriculture departments",
      documents: ["State Plan", "Project Proposal", "Implementation Details"],
      deadline: "Annual",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
      benefits: ["State support", "Flexibility", "Comprehensive development", "Innovation"],
      status: "Active"
    },
    {
      id: 12,
      name: "Paramparagat Krishi Vikas Yojana",
      shortName: "PKVY",
      description: "Promoting organic farming through cluster approach.",
      fullDescription: "PKVY aims to promote organic farming through adoption of organic village by cluster approach and PGS certification.",
      category: "technology",
      amount: "₹50,000/hectare",
      eligibility: "Farmers groups, FPOs, Cooperatives",
      applicationProcess: "Through state organic farming departments",
      documents: ["Group Registration", "Organic Plan", "Land Documents", "PGS Certification"],
      deadline: "Ongoing",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
      benefits: ["Organic premium", "Health benefits", "Environmental benefits", "Certification support"],
      status: "Active"
    }
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  // Filter schemes based on search and category
  const filteredSchemes = schemesData.filter(scheme => {
    const matchesSearch = searchQuery === '' || 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleSchemeDetails = (id) => {
    setExpandedScheme(expandedScheme === id ? null : id);
  };

  const getCategoryColor = (category) => {
    const colors = {
      subsidy: 'bg-green-100 text-green-800 border-green-200',
      insurance: 'bg-blue-100 text-blue-800 border-blue-200',
      infrastructure: 'bg-orange-100 text-orange-800 border-orange-200',
      technology: 'bg-purple-100 text-purple-800 border-purple-200',
      training: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Government Schemes</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover and apply for government schemes designed for farmers
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm">🏛️ {schemesData.length} Active Schemes</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm">💰 ₹10L+ Crore Allocated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Search Schemes</label>
                <input
                  type="text"
                  placeholder="Search schemes, benefits, eligibility..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500"
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

      {/* Schemes Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          )}

          {!loading && filteredSchemes.length === 0 && (
            <div className="text-center py-20">
              <i className="fas fa-search text-slate-400 text-4xl mb-4"></i>
              <p className="text-slate-400 text-xl">No schemes found for your search</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:shadow-xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={scheme.image} 
                    alt={scheme.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
                      {categories.find(c => c.id === scheme.category)?.name}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      scheme.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {scheme.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{scheme.name}</h3>
                  <p className="text-sm text-emerald-400 font-semibold mb-2">{scheme.amount}</p>
                  <p className="text-slate-300 mb-4 line-clamp-2">{scheme.description}</p>

                  {/* Key Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-400">
                      <i className="fas fa-users mr-2"></i>
                      <span>{scheme.eligibility}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-400">
                      <i className="fas fa-calendar mr-2"></i>
                      <span>{scheme.deadline}</span>
                    </div>
                  </div>

                  {/* Expand/Collapse Details */}
                  <button
                    onClick={() => toggleSchemeDetails(scheme.id)}
                    className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-medium mb-4"
                  >
                    {expandedScheme === scheme.id ? 'Hide Details' : 'View Details'}
                  </button>

                  {/* Expanded Details */}
                  {expandedScheme === scheme.id && (
                    <div className="border-t border-slate-600 pt-4 space-y-4">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Full Description</h4>
                        <p className="text-slate-300 text-sm">{scheme.fullDescription}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-2">Benefits</h4>
                        <ul className="text-slate-300 text-sm space-y-1">
                          {scheme.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center">
                              <i className="fas fa-check text-emerald-400 mr-2"></i>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-white font-semibold mb-2">Required Documents</h4>
                        <div className="flex flex-wrap gap-2">
                          {scheme.documents.map((doc, idx) => (
                            <span key={idx} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <a
                          href={scheme.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-center text-sm font-medium"
                        >
                          Apply Now
                        </a>
                        <button className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition text-sm">
                          <i className="fas fa-share-alt"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{filteredSchemes.length}</div>
              <div className="text-slate-400">Available Schemes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{categories.length - 1}</div>
              <div className="text-slate-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">₹10L+</div>
              <div className="text-slate-400">Crore Allocated</div>
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

export default GovSchemes;
