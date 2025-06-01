import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../src/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const CropDoctor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const analyzeImage = async (file) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/crop-doctor/analyze', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      console.log('Frontend received data:', JSON.stringify(data, null, 2));
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError(null);
      } else {
        setError('Please select an image file');
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError(null);
      } else {
        setError('Please drop an image file');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full bg-amber-100 m-0 p-0">
      {/* Sticky Navigation Bar */}
      <header className="bg-white/30 backdrop-blur-lg rounded-full p-2 shadow-lg sticky top-0 z-50 max-w-5xl mx-auto px-2 mt-2">
        <div className="px-2 sm:px-4 lg:px-6 flex justify-between items-center min-h-0">
          <Link to="/" className="flex items-center space-x-1">
            <i className="fas fa-handshake text-amber-700 h-8 w-8 text-2xl"></i>
            <h1 className="text-2xl font-bold font-serif text-amber-900">Mandi Mitra</h1>
          </Link>
          <nav className="flex space-x-5 items-center">
            <Link to="/prices" className="flex items-center hover:text-amber-700 transition font-medium text-base text-amber-900">
              <i className="fas fa-chart-line mr-1"></i> Market Prices
            </Link>
            <Link to="/weather" className="flex items-center hover:text-amber-700 transition font-medium text-base text-amber-900">
              <i className="fas fa-cloud-sun mr-1"></i> Weather
            </Link>
            <Link to="/crop-doctor" className="flex items-center text-amber-700 font-semibold text-base">
              <i className="fas fa-seedling mr-1"></i> Crop Doctor
            </Link>
            <Link to="/news" className="flex items-center hover:text-amber-700 transition font-medium text-base text-amber-900">
              <i className="fas fa-newspaper mr-1"></i> News
            </Link>
            <Link to="/schemes" className="flex items-center hover:text-amber-700 transition font-medium text-base text-amber-900">
              <i className="fas fa-gavel mr-1"></i> Schemes
            </Link>
            <Link to="/login" className="flex items-center bg-amber-600 text-white px-4 py-1.5 rounded-full hover:bg-amber-700 transition font-medium shadow-md text-base">
              <i className="fas fa-sign-in-alt mr-1"></i> Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[40vh] w-full flex items-center mb-8">
        <img 
          src="https://images.unsplash.com/photo-1597328290880-65b3b129f380?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
          alt="Crop field" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
          <h1 className="text-5xl font-bold text-white mb-4 font-serif">AI Crop Doctor</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Upload photos of your crops to get instant disease diagnosis and treatment recommendations powered by advanced AI technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Crop Disease Detection</h2>
            <p className="text-amber-100">Get instant analysis and treatment recommendations for your crops</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="fas fa-exclamation-circle text-red-500"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 hover:scale-[1.01] ${
                previewUrl ? 'border-amber-500 bg-amber-50/50' : 'border-amber-200 hover:border-amber-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {previewUrl ? (
                <div className="space-y-4">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-96 mx-auto rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewUrl(null);
                      setResult(null);
                    }}
                    className="text-amber-600 hover:text-amber-700 transition"
                  >
                    <i className="fas fa-times mr-2"></i>Remove Image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <i className="fas fa-cloud-upload-alt text-6xl text-amber-400"></i>
                  <p className="text-gray-500 text-lg">Drag and drop your crop image here or</p>
                  <label className="inline-block cursor-pointer">
                    <span className="bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition shadow-md text-lg">
                      <i className="fas fa-image mr-2"></i>Select Image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
            </div>

            {selectedImage && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    if (selectedImage) {
                      analyzeImage(selectedImage);
                    }
                  }}
                  disabled={loading}
                  className={`bg-amber-600 text-white px-10 py-4 rounded-full hover:bg-amber-700 transition shadow-xl text-lg ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-microscope mr-2"></i>
                      Analyze Image
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Analysis Results */}
            {result && (
              <div className="mt-8 space-y-6">
                {/* Health Status */}
                <div className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
                  result.isHealthy ? 'bg-green-50 hover:bg-green-100' : 'bg-amber-50 hover:bg-amber-100'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`rounded-full p-3 ${
                      result.isHealthy ? 'bg-green-100' : 'bg-amber-100'
                    }`}>
                      <i className={`fas fa-${result.isHealthy ? 'check-circle text-green-500' : 'exclamation-circle text-amber-500'} text-3xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {result.isHealthy ? 'Plant appears healthy' : 'Potential issues detected'}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {result.isHealthy 
                          ? 'No significant disease symptoms were detected in the image.'
                          : 'The following issues were identified:'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Results by Category */}
                {!result.isHealthy && (
                  <div className="space-y-8">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <h3 className="text-2xl font-semibold text-amber-900 mb-6">
                        <i className="fas fa-leaf text-amber-500 mr-3"></i>
                        Detected Issues
                      </h3>
                      <div className="space-y-6">
                        {result.diseases.map((disease, index) => (
                          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="p-6 border-b border-gray-100">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-xl font-semibold text-amber-900">{disease.name}</h4>
                                  <div className="mt-2 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                                    <i className="fas fa-percentage mr-2"></i>
                                    {disease.probability}% probability
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="p-6 space-y-4 bg-gradient-to-b from-white to-amber-50/30">
                              <div>
                                <h5 className="text-lg font-medium text-gray-900 mb-3">
                                  <i className="fas fa-info-circle text-amber-500 mr-2"></i>
                                  Description
                                </h5>
                                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                  {disease.description}
                                </p>
                              </div>
                              <div>
                                <h5 className="text-lg font-medium text-gray-900 mb-3">
                                  <i className="fas fa-prescription-bottle-alt text-amber-500 mr-2"></i>
                                  Treatment
                                </h5>
                                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                  {disease.treatment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* New Analysis Button */}
                <div className="text-center py-8">
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewUrl(null);
                      setResult(null);
                    }}
                    className="bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition shadow-xl text-lg"
                  >
                    <i className="fas fa-redo mr-2"></i>
                    Analyze Another Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropDoctor;