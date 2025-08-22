import React from 'react';
import { Download, Eye, Trash2, Clock } from 'lucide-react';
import { GeneratedImage } from '../App';

interface ImageGalleryProps {
  images: GeneratedImage[];
  onDelete: (id: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onDelete }) => {
  const handleDownload = (image: GeneratedImage) => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `roomset-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (image: GeneratedImage) => {
    window.open(image.url, '_blank');
  };

  if (images.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Images Yet</h3>
        <p className="text-sm text-gray-600">
          Generated roomsets will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Generated Roomsets</h3>
          <span className="text-sm text-gray-600">{images.length} images</span>
        </div>
        
        <div className="space-y-4">
          {images.map((image, index) => (
            <div key={image.id} className="group relative bg-gray-50 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={image.url}
                  alt={`Generated roomset ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(image)}
                      className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      title="View full size"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(image)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(image.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {image.prompt}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {image.timestamp.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex space-x-1 ml-4">
                    <button
                      onClick={() => handleDownload(image)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(image.id)}
                      className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>All images are high-resolution (1920x1080)</span>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Download All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;