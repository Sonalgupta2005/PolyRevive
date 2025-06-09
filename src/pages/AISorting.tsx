
import React from 'react';
import AppNavbar from '@/components/AppNavbar';
import PlasticSorting from '@/components/PlasticSorting';

const AISorting = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <AppNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Plastic Sorting 🤖</h1>
          <p className="text-lg text-gray-600">Use our advanced AI to identify and sort plastic types for proper recycling</p>
        </div>
        
        <PlasticSorting />
      </div>
    </div>
  );
};

export default AISorting;
