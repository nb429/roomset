import React, { useState, useEffect } from 'react';
import { Sparkles, Cpu, Palette, Camera } from 'lucide-react';

const GenerationProgress: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      icon: Cpu,
      title: 'Analyzing Product',
      description: 'AI is understanding your product details...'
    },
    {
      icon: Palette,
      title: 'Designing Room',
      description: 'Creating the perfect room setting...'
    },
    {
      icon: Camera,
      title: 'Rendering Images',
      description: 'Generating high-quality variations...'
    },
    {
      icon: Sparkles,
      title: 'Final Touches',
      description: 'Adding professional finishing touches...'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 750);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Generating Your Roomsets
        </h3>
        <p className="text-gray-600">
          Our AI is creating professional lifestyle photography for your product
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div key={index} className="flex items-center">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                isActive 
                  ? 'border-blue-500 bg-blue-50 text-blue-600' 
                  : isCompleted 
                    ? 'border-green-500 bg-green-50 text-green-600'
                    : 'border-gray-300 bg-gray-50 text-gray-400'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
              </div>
              
              <div className="flex-1">
                <h4 className={`font-medium ${
                  isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </h4>
                <p className={`text-sm ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.description}
                </p>
              </div>
              
              {isActive && (
                <div className="flex-shrink-0 ml-4">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Estimated completion:</span> 30-45 seconds
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Generating 4 unique variations for your product
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationProgress;