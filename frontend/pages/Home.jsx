
import React from 'react';
import { Link } from 'react-router-dom';
import "../src/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
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

        {/* Hero Section with Background Image */}
        <section className="relative h-screen w-full flex items-center">
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="A vast agricultural field with a beautiful sunset in the background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10"></div>
          <div className="w-full text-center px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-5xl font-bold text-white mb-6 font-serif drop-shadow-lg">Empowering India's Farmers</h2>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8 drop-shadow-md">Advanced tools and real-time data to maximize your agricultural productivity and profits</p>
            <div className="flex justify-center space-x-4">
              <Link to="/register" className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transition">Get Started</Link>
              <Link to="/features" className="bg-white hover:bg-amber-50 text-amber-800 px-8 py-3 rounded-full text-lg font-medium shadow-lg transition">Learn More</Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="w-full py-12 px-0">
          {/* Features Section */}
          <section className="py-12">
            <div className="w-full">
              <h3 className="text-3xl font-bold text-center text-amber-900 mb-12 font-serif">Our Premium Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4"> {/* Adjusted gap */}
                {/* Feature 1 - Market Prices */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="A bustling market with various agricultural products" className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-amber-800 mb-3">Real-time Market Prices</h4>
                    <p className="text-gray-600 mb-4">Access live commodity prices from markets across India with historical trends and analysis.</p>
                    <Link to="/prices" className="text-amber-700 font-medium hover:underline">Explore Prices →</Link>
                  </div>
                </div>

                {/* Feature 2 - Crop Doctor */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1597328290880-65b3b129f380?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="A farmer inspecting crops in a field" className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-amber-800 mb-3">AI Crop Doctor</h4>
                    <p className="text-gray-600 mb-4">Upload photos of your crops to get instant disease diagnosis and treatment recommendations.</p>
                    <Link to="/crop-doctor" className="text-amber-700 font-medium hover:underline">Try Crop Doctor →</Link>
                  </div>
                </div>

                {/* Feature 3 - Weather */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="A clear sky with a few clouds over a green field" className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-amber-800 mb-3">Weather Forecast</h4>
                    <p className="text-gray-600 mb-4">Get accurate weather predictions and alerts for your farming region.</p>
                    <Link to="/weather" className="text-amber-700 font-medium hover:underline">Check Weather →</Link>
                  </div>
                </div>

                {/* Feature 4 - News */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="A person reading a newspaper with agricultural news" className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-amber-800 mb-3">Agricultural News</h4>
                    <p className="text-gray-600 mb-4">Latest updates on farming techniques, market trends, and government policies.</p>
                    <Link to="/news" className="text-amber-700 font-medium hover:underline">Read News →</Link>
                  </div>
                </div>

                {/* Feature 5 - Schemes */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" alt="A farmer holding a document with government schemes" className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-amber-800 mb-3">Government Schemes</h4>
                    <p className="text-gray-600 mb-4">Information about subsidies, loans, and other government agricultural schemes.</p>
                    <Link to="/schemes" className="text-amber-700 font-medium hover:underline">View Schemes →</Link>
                  </div>
                </div>

                {/* Feature 6 - Advisor */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1">
                  <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="An agricultural expert giving advice to a farmer" className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-amber-800 mb-3">Expert Advisor</h4>
                    <p className="text-gray-600 mb-4">Get personalized farming advice from agricultural experts.</p>
                    <Link to="/advisor" className="text-amber-700 font-medium hover:underline">Consult Now →</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-white/30 backdrop-blur-md">
            <div className="w-full">
              <h3 className="text-3xl font-bold text-center text-amber-900 mb-12 font-serif">What Farmers Say About Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4"> {/* Adjusted gap */}
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="flex items-center mb-4">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Portrait of Rajesh Kumar" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-bold text-amber-800">Rajesh Kumar</h4>
                      <p className="text-sm text-gray-500">Punjab</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"Mandi Mitra helped me get 20% better prices for my wheat crop by showing me the best markets to sell in."</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="flex items-center mb-4">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Portrait of Priya Sharma" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-bold text-amber-800">Priya Sharma</h4>
                      <p className="text-sm text-gray-500">Maharashtra</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"The crop doctor feature saved my entire tomato harvest from a fungal infection I didn't even know about."</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition">
                  <div className="flex items-center mb-4">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Portrait of Amit Patel" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h4 className="font-bold text-amber-800">Amit Patel</h4>
                      <p className="text-sm text-gray-500">Gujarat</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"The weather forecasts are incredibly accurate and have helped me plan my irrigation perfectly."</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 text-center">
            <div className="w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-xl p-8 mx-auto">
              <h3 className="text-3xl font-bold text-amber-900 mb-6 font-serif">Ready to Transform Your Farming Experience?</h3>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">Join thousands of farmers who are already benefiting from Mandi Mitra's premium features.</p>
              <Link to="/register" className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl transition">Register Now - It's Free!</Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-amber-900/90 backdrop-blur-lg text-white py-12 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
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

export default Home;