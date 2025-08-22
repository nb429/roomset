import React from 'react';
import { MessageSquare } from 'lucide-react';

interface CustomPromptProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CustomPrompt: React.FC<CustomPromptProps> = ({ 
  value, 
  onChange, 
  disabled = false 
}) => {
  const examplePrompts = [
    "Modern loft apartment with natural sunlight and wooden floors",
    "Cozy bedroom with warm lighting and soft textures",
    "Bright kitchen with marble countertops and pendant lights",
    "Elegant dining room with chandelier and hardwood floors"
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <MessageSquare className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Or Describe Your Own Style</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="Describe the room setting you want... (e.g., Modern minimalist living room with large windows, natural light, and indoor plants)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            rows={4}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">
              Be specific about lighting, materials, colors, and room type for best results.
            </p>
            <span className="text-sm text-gray-400">{value.length}/200</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Example prompts:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => !disabled && onChange(prompt)}
                disabled={disabled}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPrompt;