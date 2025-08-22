import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      await processImage(imageFile);
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processImage(file);
    }
  }, []);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate background removal process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      onImageUpload(imageUrl);
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDemoImage = () => {
    // Use a demo product image
    onImageUpload('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Product</h2>
        <p className="text-gray-600 mb-6">
          Upload a high-quality image of your product. PNG with transparent background works best.
        </p>

        <div
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isProcessing ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Image</h3>
              <p className="text-sm text-gray-600">Removing background and optimizing...</p>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Upload className="w-8 h-8 text-gray-600" />
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drag & drop your product image
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Or click to browse files
              </p>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Choose File
              </label>
            </>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            Want to try it out first? Use our demo product:
          </p>
          <button
            onClick={handleDemoImage}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Use Demo Image
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Automatic background removal
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            High-quality optimization
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Multiple format support
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;