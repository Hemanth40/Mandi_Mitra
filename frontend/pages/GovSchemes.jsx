import React from 'react';

const GovSchemes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Government Schemes</h1>
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <p className="text-gray-600 mb-4">
          Explore various government schemes and subsidies available for farmers.
        </p>
        <div className="space-y-4">
          <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition">
            <h3 className="font-bold text-green-700">PM Kisan Samman Nidhi</h3>
            <p className="text-sm text-gray-600">Income support scheme for farmers</p>
          </div>
          <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition">
            <h3 className="font-bold text-green-700">Soil Health Card Scheme</h3>
            <p className="text-sm text-gray-600">Get soil health reports and recommendations</p>
          </div>
          <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition">
            <h3 className="font-bold text-green-700">Pradhan Mantri Fasal Bima Yojana</h3>
            <p className="text-sm text-gray-600">Crop insurance scheme</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovSchemes;
