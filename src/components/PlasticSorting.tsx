
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Scan, CheckCircle, XCircle, Recycle, Camera } from 'lucide-react';


const PlasticSorting = () => {
   const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle image file selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check if the file size is too large (e.g., > 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size exceeds 5MB. Please upload a smaller image.");
        setImage(null);
        setPrediction(null);
        return;
      }
      setImage(file);
      setPrediction(null); // Clear previous prediction
      setError(null); // Clear previous errors
    }
  };

  // Function to convert image file to Base64 string
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]); // Get base64 part
        } else {
          reject(new Error('FileReader result is not a string.'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to send image to AI for prediction
  const analyzeImage = async () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const base64ImageData = await getBase64(image);
      console.log("Hello1")
      const prompt = `Analyze this image of a plastic item. 
                      1. Identify the type of plastic (e.g., PET bottle, plastic film, HDPE container, Styrofoam, mixed plastic packaging).
                      2. Determine if it is generally accepted for recycling based on common municipal recycling guidelines (where rigid plastics like bottles, jugs, and tubs are often accepted, but flexible films, styrofoam, and multi-material packaging are typically not).
                      3. Provide a brief, clear reason for your assessment (accepted or not accepted).
                      Format your response clearly, stating the plastic type, acceptance status, and reason.`;

      // Construct the payload for the Gemini API call
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: image.type, // Use the actual MIME type of the uploaded image
                  data: base64ImageData
                }
              }
            ]
          }
        ],
      };

      // API key (left empty for Canvas to provide at runtime)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log(apiKey)
      // Gemini API endpoint for gemini-2.0-flash model
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      console.log("Hello")
      // Make the fetch call to the Gemini API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      // Check if the response contains valid content
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setPrediction(text); // Set the prediction text
      } else {
        // Handle cases where the response structure is unexpected or content is missing
        setError("Could not get a valid response from the AI. Please try again.");
        console.error("Unexpected API response structure:", result);
      }
    } catch (err) {
      // Catch and display any errors during the process
      setError(`Failed to analyze image: ${err.message}. Please try again.`);
      console.error("Error during image analysis:", err);
    } finally {
      setLoading(false); // Always stop loading, regardless of success or failure
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex flex-col items-center justify-center p-4 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Tailwind CSS configuration for 'Inter' font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 w-full max-w-2xl transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-green-700 mb-6">
          <span className="block">Plastic Recycling Sorter 🤖</span>
          <span className="text-xl md:text-2xl font-semibold text-blue-600 mt-2">AI-Powered Guidance</span>
        </h1>

        <p className="text-center text-gray-700 mb-8 leading-relaxed">
          Upload an image of your plastic item, and our AI will help you determine if it's generally accepted for recycling.
          Please note that local recycling rules may vary.
        </p>

        {/* Image Upload Section */}
        <div className="mb-8 p-6 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:border-blue-500 transition-colors duration-200">
          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center">
            <svg className="w-12 h-12 text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8"></path>
            </svg>
            <span className="text-lg font-medium text-blue-700">Drag & Drop or Click to Upload Image</span>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {image && (
            <div className="mt-6 text-center">
              <p className="text-gray-800 font-semibold mb-3">Uploaded Image:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded plastic item"
                className="max-w-full h-auto rounded-lg shadow-md mx-auto border border-gray-200"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={analyzeImage}
          disabled={!image || loading}
          className={`w-full py-3 px-6 rounded-lg text-white font-bold text-lg transition-all duration-300
            ${!image || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 active:scale-95'
            }
            flex items-center justify-center
          `}
        >
          {loading ? (
  <div className="space-y-4">
    <div className="animate-spin mx-auto">
      <Scan className="h-16 w-16 text-green-600" />
    </div>
    <p className="text-green-600 font-semibold">Analyzing plastic...</p>
  </div>
)  : (
            'Analyze Plastic'
          )}
        </button>

        {/* Error Message Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center" role="alert">
            {error}
          </div>
        )}

        {/* Prediction Result Display */}
        {prediction && (
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-inner">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4">AI Analysis Result:</h2>
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {prediction}
            </div>
            <p className="mt-4 text-sm text-gray-600 italic">
              Disclaimer: This AI provides general guidance. Always check with your local recycling facility for specific acceptance criteria.
            </p>
          </div>
        )}
      </div>

      {/* Footer for additional tips */}
      <div className="mt-8 text-center text-gray-600 text-sm max-w-xl">
        <p className="mb-2">
          <span className="font-semibold">Tips for best results:</span>
        </p>
        <ul className="list-disc list-inside text-left mx-auto max-w-xs">
          <li>Use clear, well-lit photos.</li>
          <li>Focus on one plastic item at a time.</li>
          <li>Ensure the entire item is visible.</li>
          <li>Include any recycling symbols if present.</li>
        </ul>
      </div>
    </div>
  );
};
export default PlasticSorting;