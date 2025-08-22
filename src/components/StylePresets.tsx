import React from 'react';
import { Check } from 'lucide-react';

interface StylePresetsProps {
  selectedPreset: string;
  onPresetSelect: (preset: string) => void;
  disabled?: boolean;
}

const presets = [
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    description: 'Clean lines, natural wood, neutral colors',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-blue-100 to-gray-100'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple, uncluttered, monochromatic',
    image: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-gray-100 to-white'
  },
  {
    id: 'industrial',
    name: 'Industrial',
    description: 'Raw materials, exposed brick, metal accents',
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-orange-100 to-red-100'
  },
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Classic furniture, warm colors, elegant',
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-amber-100 to-yellow-100'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium materials, rich textures, sophisticated',
    image: 'https://images.pexels.com/photos/1571475/pexels-photo-1571475.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-purple-100 to-pink-100'
  }
];

const StylePresets: React.FC<StylePresetsProps> = ({ 
  selectedPreset, 
  onPresetSelect, 
  disabled = false 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Style Preset</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {presets.map((preset) => (
          <div
            key={preset.id}
            className={`relative cursor-pointer rounded-xl border-2 transition-all overflow-hidden group ${
              selectedPreset === preset.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onPresetSelect(preset.id)}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={preset.image}
                alt={preset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${preset.gradient} opacity-20`}></div>
              
              {selectedPreset === preset.id && (
                <div className="absolute inset-0 bg-blue-600 bg-opacity-20 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-1">{preset.name}</h4>
              <p className="text-sm text-gray-600">{preset.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylePresets;