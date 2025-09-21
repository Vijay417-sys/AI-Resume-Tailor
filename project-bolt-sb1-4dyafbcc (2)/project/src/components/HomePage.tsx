import React, { useState } from 'react';
import { Upload, FileText, Briefcase, Sparkles } from 'lucide-react';
import { AppData, ToastType, ParsedResume } from '../types';
import { parseResume, generateTailoredContent } from '../utils/aiHelpers';

interface HomePageProps {
  appData: AppData;
  setAppData: React.Dispatch<React.SetStateAction<AppData>>;
  showToast: (message: string, type?: ToastType) => void;
  onNavigate: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ appData, setAppData, showToast, onNavigate }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const sampleResume = `Vijay Hosapeti
Email: vijay@example.com | Phone: +91-XXXXXXXXXX
Frontend Developer — React, Vite, Tailwind.

Experience:
• Deepfake-Detector UI — Built React UI for live detection demo (React, Firebase).
• Portfolio Generator — Created an automated portfolio generator using Vite.

Education: B.E. in Engineering — Acharya Institute of Technology

Skills: React, JavaScript, HTML, CSS, Tailwind, Firebase`;

  const sampleJobDescription = `We are hiring a Frontend Engineer (React) to build scalable, responsive web apps. Required: 3+ years React, strong JS, experience with Vite or similar tooling, CSS/Tailwind, REST APIs, and Git. Responsibilities: build UI components, collaborate with backend, ensure accessibility, and ship features quickly.`;

  const handleFileUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      showToast('File size must be less than 10MB', 'error');
      return;
    }
    
    const allowedTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.txt')) {
      showToast('Please upload a PDF, DOCX, or text file', 'error');
      return;
    }

    setAppData(prev => ({ ...prev, resume: file }));
    showToast('Resume uploaded successfully!', 'success');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleGenerate = async () => {
    if (!appData.resume && !appData.jobDescription) {
      showToast('Please upload a resume and enter a job description', 'warning');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Parse resume
      let parsedResume: ParsedResume;
      if (appData.resume) {
        parsedResume = await parseResume(appData.resume);
      } else {
        // Use sample resume as fallback
        parsedResume = await parseResume(null, sampleResume);
      }

      // Generate tailored content
      const jobDesc = appData.jobDescription || sampleJobDescription;
      const tailoredContent = await generateTailoredContent(parsedResume, jobDesc);

      setAppData(prev => ({
        ...prev,
        parsedResume,
        tailoredResume: tailoredContent.tailoredResume,
        coverLetter: tailoredContent.coverLetter,
        interviewQuestions: tailoredContent.interviewQuestions
      }));

      showToast('Content generated successfully!', 'success');
      onNavigate();
    } catch (error) {
      showToast('Failed to generate content. Please try again.', 'error');
      console.error('Generation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const useSampleData = () => {
    setAppData(prev => ({
      ...prev,
      jobDescription: sampleJobDescription
    }));
    
    // Create a mock file for sample resume
    const blob = new Blob([sampleResume], { type: 'text/plain' });
    const file = new File([blob], 'sample_resume.txt', { type: 'text/plain' });
    
    setAppData(prev => ({ ...prev, resume: file }));
    showToast('Sample data loaded!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Resume Tailor & Interview Coach
        </h1>
        <p className="text-xl text-gray-600">
          Upload your resume, paste a job description, and get instantly optimized content
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Resume Upload */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Upload Resume</h2>
          </div>
          
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Drag and drop your resume here, or click to browse
            </p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              Choose File
            </label>
            <p className="text-xs text-gray-500 mt-2">
              PDF, DOCX, or TXT (max 10MB)
            </p>
          </div>
          
          {appData.resume && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">
                  {appData.resume.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Briefcase className="h-6 w-6 text-teal-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Job Description</h2>
          </div>
          
          <textarea
            value={appData.jobDescription}
            onChange={(e) => setAppData(prev => ({ ...prev, jobDescription: e.target.value }))}
            placeholder="Paste the job description here..."
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <p className="text-sm text-gray-500 mt-2">
            Include requirements, responsibilities, and key skills
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
        <button
          onClick={useSampleData}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Use Sample Data
        </button>
        
        <button
          onClick={handleGenerate}
          disabled={isProcessing}
          className={`px-8 py-3 rounded-lg text-white font-semibold transition-all ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating...
            </div>
          ) : (
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Tailored Content
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomePage;