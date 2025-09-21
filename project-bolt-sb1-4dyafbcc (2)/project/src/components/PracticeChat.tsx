import React, { useState } from 'react';
import { Send, RotateCcw, Target, Star, MessageCircle, TrendingUp } from 'lucide-react';
import { AppData, ToastType, PracticeSession } from '../types';
import { evaluateAnswer } from '../utils/aiHelpers';

interface PracticeChatProps {
  appData: AppData;
  showToast: (message: string, type?: ToastType) => void;
}

const PracticeChat: React.FC<PracticeChatProps> = ({ appData, showToast }) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [practiceSession, setPracticeSession] = useState<PracticeSession | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const selectedQuestion = appData.interviewQuestions.find(q => q.id === selectedQuestionId);

  const handleSubmitAnswer = async () => {
    if (!selectedQuestion || !userAnswer.trim()) {
      showToast('Please select a question and provide an answer', 'warning');
      return;
    }

    setIsEvaluating(true);
    
    try {
      const evaluation = await evaluateAnswer(selectedQuestion.question, userAnswer, selectedQuestion.modelAnswer);
      
      setPracticeSession({
        questionId: selectedQuestion.id,
        userAnswer,
        score: evaluation.score,
        feedback: evaluation.feedback,
        suggestedAnswer: evaluation.suggestedAnswer
      });
      
      showToast(`Answer evaluated! Score: ${evaluation.score}/10`, 'success');
    } catch (error) {
      showToast('Failed to evaluate answer. Please try again.', 'error');
    } finally {
      setIsEvaluating(false);
    }
  };

  const resetPractice = () => {
    setSelectedQuestionId(null);
    setUserAnswer('');
    setPracticeSession(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (appData.interviewQuestions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Interview Questions Available</h2>
          <p className="text-gray-500">Generate interview questions first by uploading a resume and job description.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Practice</h1>
        <p className="text-gray-600">Practice answering interview questions and get AI-powered feedback</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Question Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Question</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {appData.interviewQuestions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => {
                    setSelectedQuestionId(question.id);
                    setUserAnswer('');
                    setPracticeSession(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedQuestionId === question.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {question.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">#{question.id}</span>
                  </div>
                  <p className="text-sm text-gray-800 leading-snug">{question.question}</p>
                  <p className="text-xs text-gray-500 mt-1">{question.category}</p>
                </button>
              ))}
            </div>
            
            {selectedQuestionId && (
              <button
                onClick={resetPractice}
                className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Practice
              </button>
            )}
          </div>
        </div>

        {/* Practice Area */}
        <div className="lg:col-span-2">
          {selectedQuestion ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                      selectedQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      selectedQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedQuestion.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {selectedQuestion.category}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">Question #{selectedQuestion.id}</span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {selectedQuestion.question}
                </h2>
              </div>

              {!practiceSession ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Answer
                  </label>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here... Speak as if you're in a real interview."
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">
                      {userAnswer.length} characters
                    </p>
                    
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={isEvaluating || !userAnswer.trim()}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        isEvaluating || !userAnswer.trim()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isEvaluating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Evaluating...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          Get Feedback
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Score */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Your Score</h3>
                      <div className={`px-4 py-2 rounded-lg font-bold text-2xl ${getScoreColor(practiceSession.score)}`}>
                        {practiceSession.score}/10
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          practiceSession.score >= 8 ? 'bg-green-500' :
                          practiceSession.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(practiceSession.score / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-600" />
                      Improvement Points
                    </h3>
                    <ul className="space-y-2">
                      {practiceSession.feedback.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <TrendingUp className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggested Answer */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Star className="h-5 w-5 mr-2 text-green-600" />
                      Suggested Improvement
                    </h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-800">{practiceSession.suggestedAnswer}</p>
                    </div>
                  </div>

                  {/* Your Original Answer */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Answer</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{practiceSession.userAnswer}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUserAnswer('');
                      setPracticeSession(null);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Practice Another Answer
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Select a Question</h2>
              <p className="text-gray-500">Choose an interview question from the left to start practicing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeChat;