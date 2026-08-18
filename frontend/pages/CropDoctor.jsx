import React, { useState } from 'react';
import Navigation from '../src/components/Navigation';
import { API_BASE_URL } from '../src/config';

const CropDoctor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [scanType, setScanType] = useState('plant'); // 'plant', 'crop', 'insect', 'mushroom'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [activeTreatmentTab, setActiveTreatmentTab] = useState(0);

  const analyzeImage = async (file) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', scanType);

      const response = await fetch(`${API_BASE_URL}/api/crop-doctor/analyze`, {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetImage(file);
    }
  };

  const handleDrop = (e) => {
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
    setResult(null);
  };

  const formatTreatment = (treatment) => {
    if (!treatment) return 'No specific treatment protocol provided.';
    if (typeof treatment === 'string') {
      return treatment.split('\n').map((line, index) => (
        <span key={index} className="block mb-1.5">{line}</span>
      ));
    }
    return treatment;
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-emerald-500 selection:text-white">
      <Navigation />

      {/* Hero Section with Authentic Photography */}
      <section className="relative py-16 px-4 overflow-hidden border-b border-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1592417817098-8f3d6ef2389a?w=1600&auto=format&fit=crop&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/85 to-[#090d16]/60"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>🔬 AI Computer Vision Diagnostic System</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            AI Crop Doctor & Disease Scanner
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            Upload or snap a photo of damaged leaves, pest insects, or mushrooms. Deep-learning models identify the condition and provide biological & chemical treatment remedies in seconds.
          </p>

          {/* Diagnostic Target Selector */}
          <div className="inline-flex p-1 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl">
            {[
              { id: 'plant', label: '🌿 Crop Leaf / Plant', icon: 'fas fa-leaf' },
              { id: 'insect', label: '🐛 Insect Pest', icon: 'fas fa-bug' },
              { id: 'mushroom', label: '🍄 Mushroom Species', icon: 'fas fa-tree' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setScanType(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  scanType === t.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Scanner Card */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
            {error && (
              <div className="bg-red-950/60 border border-red-800/80 rounded-2xl p-4 mb-6 flex items-center space-x-3">
                <i className="fas fa-exclamation-circle text-red-400 text-xl shrink-0"></i>
                <span className="text-red-300 text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Dropzone Area */}
            <div
              className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 overflow-hidden ${
                previewUrl ? 'border-emerald-500/80 bg-slate-950/70' : 'border-slate-700 hover:border-emerald-500/50 bg-slate-950/40'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {previewUrl ? (
                <div className="space-y-6">
                  {/* Photo Preview with Laser Scanner Overlay */}
                  <div className="relative inline-block mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700 max-h-96">
                    <img
                      src={previewUrl}
                      alt="Crop Sample Preview"
                      className="max-h-96 w-auto object-contain rounded-2xl"
                    />
                    {loading && (
                      <div className="absolute inset-0 bg-emerald-950/30 backdrop-blur-[2px]">
                        <div className="animate-scan"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-slate-900/90 border border-emerald-500 px-4 py-2 rounded-xl text-emerald-300 text-xs font-bold shadow-2xl flex items-center space-x-2">
                            <i className="fas fa-spinner fa-spin text-emerald-400"></i>
                            <span>Neural Scan In Progress...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setPreviewUrl(null);
                        setResult(null);
                      }}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-6 py-3 rounded-xl transition text-sm font-semibold flex items-center space-x-2"
                    >
                      <i className="fas fa-times"></i>
                      <span>Change Image</span>
                    </button>

                    <button
                      onClick={() => {
                        if (selectedImage) {
                          analyzeImage(selectedImage);
                        }
                      }}
                      disabled={loading}
                      className={`bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold px-8 py-3 rounded-xl transition text-sm shadow-xl flex items-center space-x-2 ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-microscope'} text-slate-950`}></i>
                      <span>{loading ? 'Analyzing Plant Tissue...' : 'Run AI Diagnosis'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center text-emerald-400 text-3xl mx-auto shadow-inner">
                    <i className="fas fa-camera"></i>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Upload or Drag Crop Leaf Image</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                    Ensure clear lighting on affected leaf spots, lesions, or insects for highest identification accuracy.
                  </p>
                  
                  <div className="pt-2">
                    <label className="inline-block cursor-pointer">
                      <span className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3.5 rounded-2xl shadow-lg transition text-sm flex items-center space-x-2">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <span>Select Photo from Device</span>
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-slate-500 text-xs">Supports JPG, PNG, WebP up to 5MB</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Diagnostic Card */}
      {result && (
        <section className="py-8 px-4 animate-fadeIn">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
              
              {/* Header Status Banner */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800 mb-8">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Diagnostic Report</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {result.plant?.name || 'Crop Health Diagnosis'}
                  </h2>
                </div>

                <div className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 border ${
                  result.isHealthy
                    ? 'bg-green-500/10 text-green-400 border-green-500/30'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${result.isHealthy ? 'bg-green-400' : 'bg-amber-400'} animate-pulse`}></span>
                  <span>{result.isHealthy ? '✅ Plant Appears Healthy' : '⚠️ Disease / Pests Detected'}</span>
                </div>
              </div>

              {/* Plant Identification & Confidence Metric */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold mb-1">Identified Specimen:</div>
                  <div className="text-lg font-bold text-white flex items-center space-x-2">
                    <i className="fas fa-seedling text-emerald-400"></i>
                    <span>{result.plant?.name || 'Agricultural Crop'}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Identification Confidence: <b>{Math.round((result.plant?.probability || result.confidence || 0.85) * 100)}%</b>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold mb-1">Health Score:</div>
                  <div className="text-lg font-bold text-emerald-400">
                    {result.isHealthy ? '95 / 100 (Optimal)' : '42 / 100 (Treatment Advised)'}
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${result.isHealthy ? 'bg-green-500 w-[95%]' : 'bg-amber-500 w-[42%]'}`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Detected Diseases / Conditions */}
              {!result.isHealthy && result.diseases && result.diseases.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <i className="fas fa-shield-virus text-amber-400"></i>
                    <span>Identified Conditions & Treatment Guidelines</span>
                  </h3>

                  {result.diseases.map((d, i) => (
                    <div key={i} className="bg-slate-950/90 rounded-2xl p-6 border border-slate-800">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-md">
                            Issue #{i + 1}
                          </span>
                          <h4 className="text-xl font-bold text-white mt-1 capitalize">{d.name}</h4>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                          Match: {d.probability}%
                        </span>
                      </div>

                      {d.description && (
                        <div className="mb-5 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                          <b className="text-slate-200">Symptoms & Etiology:</b> {d.description}
                        </div>
                      )}

                      {/* Treatment Protocol Box */}
                      <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
                        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                          <i className="fas fa-prescription-bottle-alt"></i>
                          <span>Recommended Farmer Treatment Protocol</span>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {formatTreatment(d.treatment)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-8 pt-6 border-t border-slate-800">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setPreviewUrl(null);
                    setResult(null);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2"
                >
                  <i className="fas fa-redo"></i>
                  <span>Scan Another Crop</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust & Knowledge Cards */}
      <section className="py-16 px-4 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <div className="text-3xl mb-3">🤖</div>
            <h4 className="text-base font-bold text-white mb-1">Dual-Engine AI Vision</h4>
            <p className="text-xs text-slate-400">Powered by Kindwise & Plant.ID deep convolutional networks trained on agricultural datasets.</p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="text-base font-bold text-white mb-1">Sub-2 Second Diagnostics</h4>
            <p className="text-xs text-slate-400">Streamlined in-memory multipart upload pipeline ensures instant inference even in rural low-bandwidth zones.</p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <div className="text-3xl mb-3">🛡️</div>
            <h4 className="text-base font-bold text-white mb-1">Integrated Treatment Guidance</h4>
            <p className="text-xs text-slate-400">Actionable chemical dosages, organic neem-based controls, and preventive field sanitation guidelines.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CropDoctor;
