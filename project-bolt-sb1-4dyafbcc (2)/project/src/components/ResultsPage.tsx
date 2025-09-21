import React, { useState } from 'react';
import { FileText, Mail, MessageSquare, Download, Copy, Check } from 'lucide-react';
import { AppData, ToastType } from '../types';
import { downloadTailoredResume } from '../utils/downloadHelpers';

interface ResultsPageProps {
  appData: AppData;
  showToast: (message: string, type?: ToastType) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ appData, showToast }) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'cover' | 'interview'>('resume');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      showToast('Copied to clipboard!', 'success');
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (error) {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  const handleDownload = async (type: 'resume' | 'cover') => {
    try {
      if (type === 'resume' && appData.tailoredResume) {
        await downloadTailoredResume(appData.tailoredResume);
        showToast('Resume downloaded successfully!', 'success');
      } else if (type === 'cover' && appData.coverLetter) {
        const blob = new Blob([appData.coverLetter], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tailored_cover_letter.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Cover letter downloaded successfully!', 'success');
      }
    } catch (error) {
      showToast('Failed to download file', 'error');
    }
  };

  if (!appData.tailoredResume && !appData.coverLetter && appData.interviewQuestions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Results Yet</h2>
          <p className="text-gray-500">Upload a resume and job description to see tailored content here.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'resume', label: 'Tailored Resume', icon: FileText },
    { id: 'cover', label: 'Cover Letter', icon: Mail },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generated Content</h1>
        <p className="text-gray-600">Your tailored resume, cover letter, and interview preparation</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === id
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="h-5 w-5 mr-2" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg">
        {activeTab === 'resume' && appData.tailoredResume && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">ATS-Optimized Resume</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(
                    `${appData.tailoredResume!.name}\n${appData.tailoredResume!.contact}\n\nSUMMARY\n${appData.tailoredResume!.summary}\n\nSKILLS\n${appData.tailoredResume!.skills.join(', ')}\n\nEXPERIENCE\n${appData.tailoredResume!.experience.join('\n')}\n\nEDUCATION\n${appData.tailoredResume!.education}`,
                    'resume'
                  )}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                >
                  {copiedStates.resume ? (
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </button>
                <button
                  onClick={() => handleDownload('resume')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{appData.tailoredResume.name}</h3>
                <p className="text-gray-600">{appData.tailoredResume.contact}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">SUMMARY</h4>
                <p className="text-gray-700">{appData.tailoredResume.summary}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">SKILLS</h4>
                <div className="flex flex-wrap gap-2">
                  {appData.tailoredResume.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">EXPERIENCE</h4>
                <ul className="space-y-2">
                  {appData.tailoredResume.experience.map((exp, index) => (
                    <li key={index} className="text-gray-700 pl-4 border-l-2 border-blue-200">
                      {exp}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">EDUCATION</h4>
                <p className="text-gray-700">{appData.tailoredResume.education}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">KEYWORD MATCHES</h4>
                <div className="flex flex-wrap gap-2">
                  {appData.tailoredResume.keywords.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cover' && appData.coverLetter && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Tailored Cover Letter</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(appData.coverLetter!, 'cover')}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                >
                  {copiedStates.cover ? (
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </button>
                <button
                  onClick={() => handleDownload('cover')}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {appData.coverLetter}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interview' && appData.interviewQuestions.length > 0 && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Interview Questions</h2>
              <div className="text-sm text-gray-500">
                {appData.interviewQuestions.length} questions generated
              </div>
            </div>
            
            <div className="space-y-6">
              {appData.interviewQuestions.map((q) => (
                <div key={q.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          q.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {q.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">{q.question}</h3>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Model Answer:</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">{q.modelAnswer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;