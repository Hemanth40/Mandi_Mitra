import React from 'react';
import { Link } from 'react-router-dom';
import "../src/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const schemes = [
  {
    name: "Agriculture Infrastructure Fund",
    url: "https://agriinfra.dac.gov.in/",
    description: "Financial support for building agriculture infrastructure.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "PM-Kisan Samman Nidhi",
    url: "https://pmkisan.gov.in/",
    description: "Income support scheme for farmers.",
    image: "https://images.unsplash.com/photo-1581093588401-1a7a7a7a7a7a?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "ATMA",
    url: "https://extensionreforms.da.gov.in/DashBoard_Statusatma.aspx",
    description: "Agricultural Technology Management Agency for extension reforms.",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "AGMARKNET",
    url: "https://agmarknet.gov.in/PriceAndArrivals/arrivals1.aspx",
    description: "Agricultural marketing information network.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Horticulture",
    url: "https://midh.gov.in/Notfound.aspx?aspxerrorpath=/nhmapplication/feedback/midhKPI.aspx",
    description: "Support for horticulture development.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Plant Quarantine Clearance",
    url: "https://pqms.cgg.gov.in/pqms-angular/home",
    description: "Clearance for plant quarantine to prevent pest spread.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "DBT in Agriculture",
    url: "https://www.dbtdacfw.gov.in/",
    description: "Direct Benefit Transfer for agriculture subsidies.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Pradhanmantri Krishi Sinchayee Yojana",
    url: "https://pmksy.gov.in/mis/frmDashboard.aspx",
    description: "Irrigation scheme to improve water use efficiency.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Kisan Call Center",
    url: "https://mkisan.gov.in/Home/KCCDashboard",
    description: "Helpline for farmers to get agricultural advice.",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "mKisan",
    url: "https://mkisan.gov.in/",
    description: "Mobile-based agricultural advisory services.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Jaivik Kheti",
    url: "https://pgsindia-ncof.gov.in/home.aspx",
    description: "Organic farming promotion and certification.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "e-Nam",
    url: "https://enam.gov.in/web/",
    description: "National Agriculture Market for transparent trading.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Soil Health Card",
    url: "https://soilhealth.dac.gov.in/home",
    description: "Soil testing and health recommendations.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    url: "https://pmfby.gov.in/ext/rpt/ssfr_17",
    description: "Crop insurance scheme for farmers.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80"
  }
];

const GovSchemes = () => {
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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-amber-900 mb-6 font-serif">Government Schemes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme, index) => (
            <a
              key={index}
              href={scheme.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-xl p-4 transition-all hover:shadow-2xl hover:-translate-y-1 block"
            >
              <div className="text-amber-700 text-3xl mb-2 flex justify-center items-center">
                <i className="fas fa-gavel"></i>
              </div>
              <h3 className="font-bold text-amber-800 mb-2">{scheme.name}</h3>
              <p className="text-gray-600">{scheme.description}</p>
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900/90 backdrop-blur-lg text-white py-12 w-full mt-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <i className="fas fa-handshake text-amber-300 h-8 w-8 text-2xl"></i>
                <h4 className="text-xl font-bold">Mandi Mitra</h4>
              </div>
              <p className="mt-2 text-amber-200">Empowering Farmers Since 2023</p>
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="hover:text-amber-300">About Us</Link>
              <Link to="#" className="hover:text-amber-300">Contact</Link>
              <Link to="#" className="hover:text-amber-300">Privacy Policy</Link>
              <Link to="#" className="hover:text-amber-300">Terms</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-amber-800 text-center text-amber-300">
            <p>© 2025 Mandi Mitra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GovSchemes;
