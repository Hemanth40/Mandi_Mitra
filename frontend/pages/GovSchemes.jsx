import React, { useState, useEffect } from 'react';
import Navigation from '../src/components/Navigation';

const GovSchemes = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedScheme, setExpandedScheme] = useState(null);

  const categories = [
    { id: 'all', name: 'All Schemes', icon: '🏛️' },
    { id: 'subsidy', name: 'Direct Income & Subsidies', icon: '💰' },
    { id: 'insurance', name: 'Crop Risk & Insurance', icon: '🛡️' },
    { id: 'infrastructure', name: 'Farm Infrastructure & Loans', icon: '🏗️' },
    { id: 'technology', name: 'Soil & Modern Tech', icon: '🔬' },
    { id: 'training', name: 'Farmer Training & Organic', icon: '🎓' }
  ];

  const schemesData = [
    {
      id: 1,
      name: "PM-Kisan Samman Nidhi",
      shortName: "PM-Kisan",
      description: "Direct income support of ₹6,000 per year transferred directly to bank accounts in 3 equal installments of ₹2,000.",
      fullDescription: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme launched to supplement the financial needs of landholding farmers. The benefit is transferred directly via DBT into farmers' Aadhaar-linked bank accounts.",
      category: "subsidy",
      amount: "₹6,000 / Year (Direct DBT)",
      eligibility: "All landholding farmer families across India",
      applicationProcess: "Online through PM-Kisan portal or nearest Common Service Center (CSC)",
      documents: ["Aadhaar Card", "Bank Passbook", "Land Ownership Record (Khata/Khesra)"],
      deadline: "Ongoing - Open Registration",
      url: "https://pmkisan.gov.in/",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
      benefits: ["Direct cash transfer without middlemen", "100% digital transparent payment", "Beneficiary status tracking on mobile"],
      status: "Active"
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana",
      shortName: "PMFBY",
      description: "Comprehensive risk insurance for crop loss due to drought, floods, hailstorms, pests, and unseasonal rains.",
      fullDescription: "PMFBY provides comprehensive crop loss protection from pre-sowing to post-harvest stages. Farmers pay minimal premiums (1.5% for Rabi, 2% for Kharif, 5% for commercial crops) with up to 98% government subsidy.",
      category: "insurance",
      amount: "Up to 98% Premium Subsidy",
      eligibility: "All farmers including tenant farmers and sharecroppers",
      applicationProcess: "Through local commercial banks, CSCs, or national PMFBY portal",
      documents: ["Aadhaar Card", "Bank Account", "Land Possession Certificate", "Sowing Declaration"],
      deadline: "Before announced seasonal cut-off date",
      url: "https://pmfby.gov.in/",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&auto=format&fit=crop&q=80",
      benefits: ["Lowest premium rates in Asia", "Satellite and drone crop damage assessment", "Direct claim settlement to bank"],
      status: "Active"
    },
    {
      id: 3,
      name: "Agriculture Infrastructure Fund",
      shortName: "AIF",
      description: "₹1 Lakh Crore medium-to-long term debt financing for cold chains, warehouses, and post-harvest management units.",
      fullDescription: "AIF provides interest subvention of 3% per annum up to a limit of ₹2 Crore and credit guarantee coverage under CGTMSE for setting up modern post-harvest agro-infrastructure.",
      category: "infrastructure",
      amount: "3% Interest Subvention (₹2 Cr)",
      eligibility: "Farmers, FPOs, PACS, SHGs, Agri-Entrepreneurs, Startups",
      applicationProcess: "Apply online through the AIF National Portal",
      documents: ["Detailed Project Report (DPR)", "Land Documents", "KYC & PAN", "Bank Details"],
      deadline: "Scheme active till 2032-33",
      url: "https://agriinfra.dac.gov.in/",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80",
      benefits: ["3% interest subvention for 7 years", "Credit guarantee fee paid by government", "Empowers local FPO storage capacity"],
      status: "Active"
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      shortName: "SHC",
      description: "Free comprehensive soil nutrient profiling providing crop-specific fertilizer and organic manure dosage recommendations.",
      fullDescription: "Issues Soil Health Cards every 3 years containing status of 12 parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) to prevent fertilizer over-spending and boost soil fertility.",
      category: "technology",
      amount: "100% Free Soil Testing",
      eligibility: "All farmers in all states",
      applicationProcess: "Sample collection by local village agriculture extension officer or soil lab",
      documents: ["Aadhaar Card", "Land Khata/Survey Number"],
      deadline: "Ongoing Cycle",
      url: "https://soilhealth.dac.gov.in/",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80",
      benefits: ["Cuts unnecessary fertilizer costs by 15-20%", "Custom recommendations for 12 nutrients", "Improves long-term crop yield"],
      status: "Active"
    },
    {
      id: 5,
      name: "National Agriculture Market (e-NAM)",
      shortName: "e-NAM",
      description: "Pan-India electronic trading portal networking APMC mandis to create a unified national market for transparent price discovery.",
      fullDescription: "e-NAM integrates over 1,300 mandis across 23 states, allowing farmers to showcase produce digitally, receive bids from buyers across India, and receive direct digital payments.",
      category: "technology",
      amount: "Free Trader/Farmer Registration",
      eligibility: "All farmers and licensed APMC commission agents",
      applicationProcess: "Register at local e-NAM APMC mandi kiosk or mobile app",
      documents: ["Aadhaar Card", "Bank Passbook", "Mobile Number"],
      deadline: "Ongoing Network",
      url: "https://enam.gov.in/",
      image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
      benefits: ["Access to nationwide buyers", "Transparent electronic bidding", "Instant digital payment to bank"],
      status: "Active"
    },
    {
      id: 6,
      name: "PM Kusum Solar Pump Scheme",
      shortName: "PM-KUSUM",
      description: "Up to 60% subsidy for installing standalone off-grid and grid-connected solar agricultural irrigation pumps.",
      fullDescription: "Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM) enables farmers to replace expensive diesel pumps with solar pumps and sell surplus solar power back to the electricity grid.",
      category: "subsidy",
      amount: "Up to 60% Solar Pump Subsidy",
      eligibility: "Individual farmers, Water User Associations, Cooperatives",
      applicationProcess: "Through State Renewable Energy Development Agencies",
      documents: ["Aadhaar Card", "Land Documents", "Electricity Bill (if applicable)", "Bank Account"],
      deadline: "Ongoing State Batches",
      url: "https://pmkusum.mnre.gov.in/",
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
      benefits: ["Zero diesel fuel expenses", "Reliable daytime irrigation power", "Additional income from surplus solar electricity"],
      status: "Active"
    }
  ];

  const filteredSchemes = schemesData.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-rose-500 selection:text-white">
      <Navigation />

      {/* Hero Section with Rural Community Photography */}
      <section className="relative py-16 px-4 overflow-hidden border-b border-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1600&auto=format&fit=crop&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/85 to-[#090d16]/60"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            <span>🏛️ Central & State Government Welfare Directory</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Government Schemes & Subsidies for Farmers
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Verified information on financial assistance, crop insurance, solar pumps, and low-interest infrastructure loans with document checklists and direct application links.
          </p>

          {/* Search Input */}
          <div className="max-w-xl mx-auto relative">
            <i className="fas fa-search absolute left-4 top-3.5 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search scheme (PM-Kisan, Fasal Bima, Solar Pump, AIF...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="py-6 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 border ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Schemes Grid */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        {filteredSchemes.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/60 rounded-3xl border border-slate-800 max-w-md mx-auto">
            <i className="fas fa-search text-slate-500 text-3xl mb-3"></i>
            <h3 className="text-lg font-bold text-white mb-1">No Schemes Found</h3>
            <p className="text-slate-400 text-xs">Try clearing your search query or selecting "All Schemes".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((sc) => {
              const isExpanded = expandedScheme === sc.id;

              return (
                <div
                  key={sc.id}
                  className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
                >
                  {/* Card Thumbnail Photography */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={sc.image} 
                      alt={sc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-bold text-rose-300 border border-rose-500/30">
                        {sc.shortName}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <span className="text-xs font-extrabold text-emerald-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-700">
                        {sc.amount}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 leading-tight">{sc.name}</h3>
                      <p className="text-slate-300 text-xs leading-relaxed mb-4">{sc.description}</p>

                      <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-1.5 text-xs text-slate-400 mb-4">
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-users text-rose-400"></i>
                          <span>Eligibility: <b className="text-slate-200">{sc.eligibility}</b></span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-calendar text-amber-400"></i>
                          <span>Deadline: <b className="text-slate-200">{sc.deadline}</b></span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details Drawer */}
                    {isExpanded && (
                      <div className="pt-4 border-t border-slate-800 space-y-4 text-xs animate-fadeIn mb-4">
                        <div>
                          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[10px] mb-1">Detailed Overview:</h4>
                          <p className="text-slate-300 leading-relaxed">{sc.fullDescription}</p>
                        </div>

                        <div>
                          <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] mb-1.5">Key Farmer Benefits:</h4>
                          <ul className="space-y-1">
                            {sc.benefits.map((b, bi) => (
                              <li key={bi} className="flex items-center space-x-1.5 text-slate-300">
                                <i className="fas fa-check text-emerald-400 text-[10px]"></i>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[10px] mb-1.5">Required Documents:</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {sc.documents.map((d, di) => (
                              <span key={di} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                                📄 {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => setExpandedScheme(isExpanded ? null : sc.id)}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-semibold transition"
                      >
                        {isExpanded ? 'Hide Checklist' : 'View Requirements'}
                      </button>

                      <a
                        href={sc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md"
                      >
                        <span>Apply Portal</span>
                        <i className="fas fa-external-link-alt text-[10px]"></i>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default GovSchemes;
