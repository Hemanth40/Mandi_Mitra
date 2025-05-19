import React from 'react';

const CropDoctor = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">AI Crop Doctor</h1>
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <p className="text-gray-600 mb-4">
          Upload photos of your crops to detect diseases and get treatment recommendations.
        </p>
        <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center">
          <p className="text-gray-500">Drag and drop crop images here</p>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Select Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropDoctor;
