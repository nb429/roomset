import React, { useState } from 'react';
import { Upload, Sparkles, Download, Eye, Trash2 } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import StylePresets from './components/StylePresets';
import CustomPrompt from './components/CustomPrompt';
import GenerationProgress from './components/GenerationProgress';
import ImageGallery from './components/ImageGallery';
import Header from './components/Header';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [currentStep, setCurrentStep] = useState<'upload' | 'configure' | 'generate' | 'results'>('upload');

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentStep('configure');
  };

  const handleGenerate = async () => {
    if (!uploadedImage || (!selectedPreset && !customPrompt)) return;

    setIsGenerating(true);
    setCurrentStep('generate');

    // Simulate AI generation process
    await new Promise(resolve => setTimeout(resolve, 3000));

    const newImages: GeneratedImage[] = Array.from({ length: 4 }, (_, index) => ({
      id: `generated-${Date.now()}-${index}`,
      url: `https://images.pexels.com/photos/${[1571460, 1571467, 1571463, 1571468][index]}/pexels-photo-${[1571460, 1571467, 1571463, 1571468][index]}.jpeg?auto=compress&cs=tinysrgb&w=800`,
      prompt: selectedPreset || customPrompt,
      timestamp: new Date(),
    }));

    setGeneratedImages(prev => [...newImages, ...prev]);
    setIsGenerating(false);
    setCurrentStep('results');
  };

  const resetFlow = () => {
    setUploadedImage(null);
    setSelectedPreset('');
    setCustomPrompt('');
    setCurrentStep('upload');
  };

  const deleteImage = (id: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Roomset AI Generator</h1>
            {uploadedImage && (
              <button
                onClick={resetFlow}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload New Image
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep !== 'upload' ? 'text-blue-600' : 'text-gray-900'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                currentStep !== 'upload' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-900'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Upload Product</span>
            </div>
            
            <div className={`w-12 h-px ${currentStep !== 'upload' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${
              ['configure', 'generate', 'results'].includes(currentStep) ? 'text-blue-600' : 'text-gray-500'
            }`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                ['configure', 'generate', 'results'].includes(currentStep) 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Configure Style</span>
            </div>
            
            <div className={`w-12 h-px ${
              ['generate', 'results'].includes(currentStep) ? 'bg-blue-600' : 'bg-gray-300'
            }`}></div>
            
            <div className={`flex items-center ${
              ['generate', 'results'].includes(currentStep) ? 'text-blue-600' : 'text-gray-500'
            }`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                ['generate', 'results'].includes(currentStep) 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Generate & Review</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 'upload' && (
              <ImageUpload onImageUpload={handleImageUpload} />
            )}

            {(['configure', 'generate', 'results'].includes(currentStep)) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={uploadedImage!} 
                    alt="Uploaded product" 
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Product Image</h3>
                    <p className="text-sm text-gray-500">Ready for roomset generation</p>
                  </div>
                </div>

                <StylePresets
                  selectedPreset={selectedPreset}
                  onPresetSelect={setSelectedPreset}
                  disabled={isGenerating}
                />

                <CustomPrompt
                  value={customPrompt}
                  onChange={setCustomPrompt}
                  disabled={isGenerating}
                />

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    {selectedPreset || customPrompt ? 'Ready to generate' : 'Select a style or enter custom prompt'}
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={!selectedPreset && !customPrompt || isGenerating}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Roomsets'}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'generate' && (
              <GenerationProgress />
            )}
          </div>

          {/* Right Column - Gallery */}
          <div className="space-y-6">
            {generatedImages.length > 0 && (
              <ImageGallery 
                images={generatedImages}
                onDelete={deleteImage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;