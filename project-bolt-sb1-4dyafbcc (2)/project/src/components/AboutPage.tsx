import React from 'react';
import { Shield, Zap, Target, CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About TailorCoach</h1>
        <p className="text-xl text-gray-600">
          AI-powered resume optimization and interview preparation platform
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              1. AI Resume Analysis
            </h3>
            <p className="text-gray-600">
              Upload your resume and job description. Our AI analyzes both documents to identify key skills, requirements, and optimization opportunities.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Target className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              2. Content Generation
            </h3>
            <p className="text-gray-600">
              Generate ATS-optimized resume content, personalized cover letters, and relevant interview questions tailored to your target role.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              3. Interview Practice
            </h3>
            <p className="text-gray-600">
              Practice with AI-generated interview questions, receive instant feedback with scoring, and get actionable improvement suggestions.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">ATS Optimization</h3>
                <p className="text-gray-600 text-sm">Resume content optimized for Applicant Tracking Systems with keyword matching</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Personalized Cover Letters</h3>
                <p className="text-gray-600 text-sm">Tailored cover letters that highlight relevant experience for each role</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Interview Preparation</h3>
                <p className="text-gray-600 text-sm">Role-specific interview questions with model answers and difficulty ratings</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">AI-Powered Feedback</h3>
                <p className="text-gray-600 text-sm">Instant scoring and improvement suggestions for interview answers</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Multiple File Formats</h3>
                <p className="text-gray-600 text-sm">Support for PDF, DOCX, and text file uploads with smart parsing</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Export & Download</h3>
                <p className="text-gray-600 text-sm">Download optimized resumes and cover letters in multiple formats</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <div className="flex items-start">
          <Shield className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Privacy & Security</h3>
            <div className="text-blue-800 space-y-2">
              <p>
                <strong>Your privacy is our priority:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Files are processed locally and not stored permanently on our servers</li>
                <li>All uploaded content is automatically deleted after processing</li>
                <li>No personal information is retained or shared with third parties</li>
                <li>Generated content is only accessible during your current session</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to optimize your job search?</h2>
        <p className="text-gray-600 mb-6">
          Upload your resume and start creating tailored content that gets results.
        </p>
        <button
          onClick={() => window.location.hash = '#upload'}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default AboutPage;