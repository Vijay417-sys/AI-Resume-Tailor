import React, { useState } from 'react';
import { FileText, MessageCircle, Info, Upload, Download, Star } from 'lucide-react';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import PracticeChat from './components/PracticeChat';
import AboutPage from './components/AboutPage';
import Toast from './components/Toast';
import { AppData, ToastType } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'results' | 'practice' | 'about'>('home');
  const [appData, setAppData] = useState<AppData>({
    resume: null,
    jobDescription: '',
    parsedResume: null,
    tailoredResume: null,
    coverLetter: null,
    interviewQuestions: []
  });
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const NavigationBar = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Star className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TailorCoach</h1>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Upload className="h-4 w-4 inline mr-2" />
              Upload
            </button>
            
            <button
              onClick={() => setCurrentPage('results')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 'results'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Results
            </button>
            
            <button
              onClick={() => setCurrentPage('practice')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 'practice'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Practice
            </button>
            
            <button
              onClick={() => setCurrentPage('about')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 'about'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Info className="h-4 w-4 inline mr-2" />
              About
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            appData={appData} 
            setAppData={setAppData} 
            showToast={showToast}
            onNavigate={() => setCurrentPage('results')}
          />
        );
      case 'results':
        return (
          <ResultsPage 
            appData={appData} 
            showToast={showToast}
          />
        );
      case 'practice':
        return (
          <PracticeChat 
            appData={appData} 
            showToast={showToast}
          />
        );
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage appData={appData} setAppData={setAppData} showToast={showToast} onNavigate={() => setCurrentPage('results')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <main>
        {renderCurrentPage()}
      </main>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default App;