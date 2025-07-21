import React, { useState } from 'react';
import Navigation from '../src/components/Navigation';

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
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to analyze image');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'An error occurred while analyzing the image');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetImage(file);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetImage(file);
    }
  };

  const validateAndSetImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPG, PNG, or WebP)');
      return;
    }

    if (file.size > maxSize) {
      const sizeInMB = Math.round(file.size / 1024 / 1024 * 100) / 100;
      setError(`Image file too large (${sizeInMB}MB). Maximum size is 5MB`);
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const formatTreatment = (treatment) => {
    if (!treatment) return 'No treatment information available';
    
    if (typeof treatment === 'string') {
      return treatment.split('\n').map((line, index) => (
        <span key={index} className="block mb-2">{line}</span>
      ));
    }
    
    return treatment;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">AI Crop Doctor</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Advanced AI-powered crop health analysis, disease detection, and treatment recommendations
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm">🤖 AI Powered</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm">⚡ Instant Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 text-center">
                <i className="fas fa-exclamation-triangle text-red-400 mr-2"></i>
                <span className="text-red-300">{error}</span>
              </div>
            )}
            
            <div 
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                previewUrl ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 hover:border-emerald-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {previewUrl ? (
                <div className="space-y-6">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-80 mx-auto rounded-xl shadow-lg"
                  />
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setPreviewUrl(null);
                        setResult(null);
                      }}
                      className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
                    >
                      <i className="fas fa-times mr-2"></i>Remove
                    </button>
                    <button
                      onClick={() => {
                        if (selectedImage) {
                          analyzeImage(selectedImage);
                        }
                      }}
                      disabled={loading}
                      className={`bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-microscope mr-2"></i>
                          Analyze Image
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-6xl">📸</div>
                  <h3 className="text-2xl font-bold text-white">Upload Your Crop Image</h3>
                  <p className="text-slate-300 text-lg">
                    Drag and drop your crop image here or click to browse
                  </p>
                  <label className="inline-block cursor-pointer">
                    <span className="bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition shadow-lg text-lg">
                      <i className="fas fa-upload mr-2"></i>Choose File
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="text-slate-400 text-sm">
                    Supports JPG, PNG, WebP formats up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-6">Analysis Results</h2>
              
              {/* Health Status */}
              <div className={`p-6 rounded-xl mb-6 ${
                result.isHealthy 
                  ? 'bg-green-500/20 border border-green-500/50' 
                  : 'bg-amber-500/20 border border-amber-500/50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl ${result.isHealthy ? 'text-green-400' : 'text-amber-400'}`}>
                    {result.isHealthy ? '✅' : '⚠️'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {result.isHealthy ? 'Healthy' : 'Issues Detected'}
                    </h3>
                    <p className="text-slate-300">
                      {result.isHealthy 
                        ? 'Your crop appears to be healthy!' 
                        : 'Potential issues have been identified'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Plant Identification */}
              {result.plant && (
                <div className="bg-slate-700/50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    <i className="fas fa-seedling text-emerald-400 mr-2"></i>
                    Plant Identification
                  </h3>
                  <p className="text-slate-300">
                    {result.plant.name} ({Math.round(result.plant.probability * 100)}% confidence)
                  </p>
                </div>
              )}

              {/* Diseases */}
              {!result.isHealthy && result.diseases && result.diseases.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    <i className="fas fa-bug text-red-400 mr-2"></i>
                    Detected Issues
                  </h3>
                  {result.diseases.map((disease, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold text-white">{disease.name}</h4>
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                          {disease.probability}%
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-lg font-semibold text-emerald-400 mb-2">Description</h5>
                          <p className="text-slate-300">{disease.description}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-lg font-semibold text-emerald-400 mb-2">Treatment</h5>
                          <div className="text-slate-300 whitespace-pre-wrap">
                            {formatTreatment(disease.treatment)}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-slate-400">
                          <i className="fas fa-info-circle mr-2"></i>
                          Source: {disease.source}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setPreviewUrl(null);
                    setResult(null);
                  }}
                  className="bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
                >
                  <i className="fas fa-redo mr-2"></i>Analyze Another
                </button>
                <button
                  onClick={() => window.open('/api/crop-doctor/health', '_blank')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
                >
                  <i className="fas fa-heartbeat mr-2"></i>System Health
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI Powered</h3>
              <p className="text-slate-300">Advanced machine learning models for accurate diagnosis</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Results</h3>
              <p className="text-slate-300">Get analysis results within seconds of upload</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Analysis</h3>
              <p className="text-slate-300">Automatic detection of crops, diseases, and pests</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CropDoctor;
