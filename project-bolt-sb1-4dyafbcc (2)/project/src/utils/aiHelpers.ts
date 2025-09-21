import { ParsedResume, TailoredResume, InterviewQuestion } from '../types';

export const parseResume = async (file: File | null, fallbackText?: string): Promise<ParsedResume> => {
  let content = fallbackText || '';
  
  if (file) {
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      content = await file.text();
    } else if (file.type === 'application/pdf') {
      // For demo purposes, we'll use fallback text
      // In a real app, you'd use a PDF parsing library
      content = fallbackText || 'PDF parsing not implemented in demo';
    } else {
      // DOCX or other formats
      content = fallbackText || 'Document parsing not implemented in demo';
    }
  }

  // Simple text parsing (in real app, use more sophisticated NLP)
  const lines = content.split('\n').filter(line => line.trim());
  
  const name = extractName(lines);
  const email = extractEmail(content);
  const phone = extractPhone(content);
  const skills = extractSkills(content);
  const roles = extractRoles(content);
  const education = extractEducation(content);

  return {
    name,
    email,
    phone,
    skills,
    roles,
    education,
    rawContent: content
  };
};

export const generateTailoredContent = async (
  parsedResume: ParsedResume,
  jobDescription: string
) => {
  // Extract keywords from job description
  const jobKeywords = extractJobKeywords(jobDescription);
  const jobRequirements = extractJobRequirements(jobDescription);
  
  // Generate tailored resume
  const tailoredResume = generateTailoredResume(parsedResume, jobKeywords, jobRequirements);
  
  // Generate cover letter
  const coverLetter = generateCoverLetter(parsedResume, jobDescription, jobRequirements);
  
  // Generate interview questions
  const interviewQuestions = generateInterviewQuestions(jobDescription, parsedResume);

  return {
    tailoredResume,
    coverLetter,
    interviewQuestions
  };
};

export const evaluateAnswer = async (
  question: string,
  userAnswer: string,
  modelAnswer: string
): Promise<{
  score: number;
  feedback: string[];
  suggestedAnswer: string;
}> => {
  // Simulate AI evaluation (in real app, use actual AI API)
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
  
  const wordCount = userAnswer.trim().split(/\s+/).length;
  const hasSpecificExample = /example|experience|project|implemented|developed|achieved/i.test(userAnswer);
  const hasQuantifiableResult = /\d+|%|percent|increased|reduced|improved/i.test(userAnswer);
  const answerLength = userAnswer.length;
  
  let score = 5; // Base score
  
  // Scoring logic
  if (wordCount >= 50) score += 1;
  if (hasSpecificExample) score += 2;
  if (hasQuantifiableResult) score += 1;
  if (answerLength > 200 && answerLength < 800) score += 1;
  
  score = Math.min(10, Math.max(1, score));
  
  const feedback: string[] = [];
  
  if (wordCount < 30) {
    feedback.push('Provide more detailed examples and explanations');
  }
  if (!hasSpecificExample) {
    feedback.push('Include specific examples from your experience');
  }
  if (!hasQuantifiableResult) {
    feedback.push('Add quantifiable results or metrics when possible');
  }
  if (answerLength < 100) {
    feedback.push('Expand your answer with more context and details');
  }

  const suggestedAnswer = generateSuggestedAnswer(question, userAnswer, modelAnswer);

  return {
    score,
    feedback,
    suggestedAnswer
  };
};

// Helper functions
const extractName = (lines: string[]): string => {
  // Look for name in first few lines
  for (const line of lines.slice(0, 3)) {
    if (line.length < 50 && !/[@.]/.test(line) && /^[A-Za-z\s]+$/.test(line.trim())) {
      return line.trim();
    }
  }
  return 'Not specified';
};

const extractEmail = (content: string): string => {
  const emailMatch = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return emailMatch ? emailMatch[0] : 'Not specified';
};

const extractPhone = (content: string): string => {
  const phoneMatch = content.match(/[\+]?[\d\-\(\)\s]{10,}/);
  return phoneMatch ? phoneMatch[0].trim() : 'Not specified';
};

const extractSkills = (content: string): string[] => {
  const skillPatterns = [
    /Skills?:?\s*([^\n]+)/i,
    /Technologies?:?\s*([^\n]+)/i,
    /Programming:?\s*([^\n]+)/i
  ];
  
  for (const pattern of skillPatterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].split(/[,\s]+/).filter(skill => skill.length > 1).slice(0, 10);
    }
  }
  
  // Fallback: common tech skills
  const commonSkills = ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Python'];
  return commonSkills.filter(skill => 
    content.toLowerCase().includes(skill.toLowerCase())
  ).slice(0, 5);
};

const extractRoles = (content: string): string[] => {
  const lines = content.split('\n');
  const roles: string[] = [];
  
  for (const line of lines) {
    if (line.includes('—') || line.includes('–') || line.includes('-')) {
      if (line.length < 100 && line.length > 10) {
        roles.push(line.trim());
        if (roles.length >= 3) break;
      }
    }
  }
  
  return roles.length > 0 ? roles : ['Previous experience details not clearly parsed'];
};

const extractEducation = (content: string): string => {
  const eduMatch = content.match(/Education:?\s*([^\n]+)/i) ||
                   content.match(/(B\.?[AES]\.?|M\.?[AES]\.?|PhD|Bachelor|Master)[^\n]*/i);
  return eduMatch ? eduMatch[0].trim() : 'Education details not specified';
};

const extractJobKeywords = (jobDescription: string): string[] => {
  const keywords = [];
  const techWords = jobDescription.match(/\b(React|JavaScript|Python|Java|Node\.js|CSS|HTML|Git|API|Database|SQL|MongoDB|PostgreSQL|AWS|Docker|Kubernetes|TypeScript|Vue|Angular|Express|Django|Flask)\b/gi);
  const skillWords = jobDescription.match(/\b(experience|years|senior|junior|lead|manager|developer|engineer|architect|analyst|designer|consultant)\b/gi);
  
  if (techWords) keywords.push(...techWords);
  if (skillWords) keywords.push(...skillWords);
  
  return [...new Set(keywords)].slice(0, 15);
};

const extractJobRequirements = (jobDescription: string): string[] => {
  const requirements = [];
  const lines = jobDescription.split(/[.!?]/).filter(line => line.trim().length > 10);
  
  for (const line of lines) {
    if (/required|must|need|should|experience|years|skill/i.test(line)) {
      requirements.push(line.trim());
      if (requirements.length >= 5) break;
    }
  }
  
  return requirements;
};

const generateTailoredResume = (
  parsedResume: ParsedResume,
  keywords: string[],
  requirements: string[]
): TailoredResume => {
  const tailoredSkills = [...parsedResume.skills];
  
  // Add relevant keywords as skills if not already present
  keywords.forEach(keyword => {
    if (!tailoredSkills.some(skill => 
      skill.toLowerCase().includes(keyword.toLowerCase())
    )) {
      tailoredSkills.push(keyword);
    }
  });

  const summary = `Experienced professional with ${parsedResume.skills.length}+ key technologies including ${parsedResume.skills.slice(0, 3).join(', ')}. Proven track record in ${keywords.slice(0, 2).join(' and ')} with focus on delivering scalable solutions and driving business impact.`;

  const tailoredExperience = parsedResume.roles.map(role => 
    `• ${role} - Utilized ${keywords.slice(0, 2).join(' and ')} to deliver high-impact solutions, focusing on ${requirements[0]?.split(' ').slice(0, 8).join(' ') || 'technical excellence'}.`
  );

  return {
    name: parsedResume.name,
    contact: `${parsedResume.email} | ${parsedResume.phone}`,
    summary,
    skills: tailoredSkills.slice(0, 12),
    experience: tailoredExperience,
    education: parsedResume.education,
    keywords: keywords.slice(0, 8)
  };
};

const generateCoverLetter = (
  parsedResume: ParsedResume,
  jobDescription: string,
  requirements: string[]
): string => {
  const companyName = 'the company'; // In real app, extract from job description
  const position = jobDescription.match(/hiring\s+(?:a\s+)?([^.]+?)(?:\s+to|\s+for|\.)/i)?.[1] || 'this role';

  return `Dear Hiring Manager,

I am writing to express my strong interest in the ${position} position at ${companyName}. With my background in ${parsedResume.skills.slice(0, 3).join(', ')}, I am excited about the opportunity to contribute to your team's success.

In my previous roles, I have gained extensive experience with ${parsedResume.skills.slice(0, 2).join(' and ')}, directly aligning with your requirements. My projects have consistently delivered measurable results, including ${parsedResume.roles[0] || 'technical solutions that drive business value'}. I am particularly drawn to this opportunity because of ${requirements[0]?.split(' ').slice(0, 10).join(' ') || 'the technical challenges and growth potential'}.

I would welcome the opportunity to discuss how my experience with ${parsedResume.skills.slice(0, 2).join(' and ')} can help ${companyName} achieve its goals. Thank you for considering my application.

Best regards,
${parsedResume.name}`;
};

const generateInterviewQuestions = (
  jobDescription: string,
  parsedResume: ParsedResume
): InterviewQuestion[] => {
  const questions: InterviewQuestion[] = [
    {
      id: 1,
      question: "Tell me about yourself and your background.",
      difficulty: 'Easy',
      category: 'General',
      modelAnswer: `I'm a ${parsedResume.skills[0] || 'software'} professional with experience in ${parsedResume.skills.slice(0, 3).join(', ')}. I've worked on projects involving ${parsedResume.roles[0] || 'software development'}, where I've developed strong problem-solving skills and technical expertise. I'm passionate about creating efficient solutions and staying current with technology trends.`
    },
    {
      id: 2,
      question: "What interests you about this role?",
      difficulty: 'Easy',
      category: 'Motivation',
      modelAnswer: `This role aligns perfectly with my experience in ${parsedResume.skills.slice(0, 2).join(' and ')}. I'm excited about the opportunity to work with technologies mentioned in the job description and contribute to projects that make a real impact. The company's focus on innovation and the specific challenges mentioned in the role description really appeal to me.`
    },
    {
      id: 3,
      question: `Describe your experience with ${parsedResume.skills[0] || 'the main technology stack'}.`,
      difficulty: 'Medium',
      category: 'Technical',
      modelAnswer: `I have extensive experience with ${parsedResume.skills[0] || 'this technology'}, including ${parsedResume.roles[0] || 'various projects where I implemented solutions'}. I've used it to build scalable applications, optimize performance, and solve complex problems. I stay updated with best practices and have experience with related tools and frameworks.`
    },
    {
      id: 4,
      question: "Walk me through a challenging project you worked on.",
      difficulty: 'Medium',
      category: 'Experience',
      modelAnswer: `One challenging project involved ${parsedResume.roles[0] || 'building a complex application'}. The main challenges were around scalability and performance optimization. I approached this by breaking down the problem, researching best practices, and implementing a solution using ${parsedResume.skills.slice(0, 2).join(' and ')}. The result was a 30% improvement in performance and positive user feedback.`
    },
    {
      id: 5,
      question: "How do you handle working under tight deadlines?",
      difficulty: 'Medium',
      category: 'Behavioral',
      modelAnswer: `I handle tight deadlines by prioritizing tasks based on impact and urgency, breaking complex work into manageable chunks, and communicating proactively with stakeholders. I use tools like task lists and time-blocking to stay organized. When faced with constraints, I focus on delivering the core functionality first, then iterate on improvements.`
    },
    {
      id: 6,
      question: "Describe a time when you had to learn a new technology quickly.",
      difficulty: 'Medium',
      category: 'Learning',
      modelAnswer: `I recently had to learn ${parsedResume.skills[1] || 'a new framework'} for a project with a tight timeline. I started by going through official documentation, building small practice projects, and joining community forums. I dedicated extra hours outside of work and asked colleagues for guidance. Within two weeks, I was proficient enough to contribute effectively to the project.`
    },
    {
      id: 7,
      question: "What's your approach to debugging complex issues?",
      difficulty: 'Hard',
      category: 'Technical',
      modelAnswer: `My debugging approach involves systematic problem isolation: I reproduce the issue consistently, check logs and error messages, use debugging tools to trace execution, and create minimal test cases. I document my findings and hypotheses. For complex issues, I break them into smaller parts and use techniques like rubber duck debugging or peer review to gain fresh perspectives.`
    },
    {
      id: 8,
      question: "How do you stay current with technology trends?",
      difficulty: 'Easy',
      category: 'Learning',
      modelAnswer: `I stay current through multiple channels: following industry blogs and newsletters, participating in developer communities like Stack Overflow and GitHub, attending webinars and conferences, and working on side projects with new technologies. I also set aside time weekly for learning and try to apply new concepts in my work when appropriate.`
    },
    {
      id: 9,
      question: "Describe your experience working in a team environment.",
      difficulty: 'Medium',
      category: 'Teamwork',
      modelAnswer: `I thrive in collaborative environments and believe in clear communication and shared responsibility. In my previous roles, I've participated in code reviews, pair programming, and team planning sessions. I'm comfortable both leading initiatives and supporting others' work. I value different perspectives and always try to contribute constructively to team discussions and decisions.`
    },
    {
      id: 10,
      question: "Where do you see yourself in 5 years?",
      difficulty: 'Easy',
      category: 'Career',
      modelAnswer: `In 5 years, I see myself having grown both technically and professionally. I'd like to have deepened my expertise in ${parsedResume.skills.slice(0, 2).join(' and ')}, taken on more leadership responsibilities, and contributed to meaningful projects that have business impact. I'm also interested in mentoring junior developers and staying at the forefront of technology innovation.`
    }
  ];

  return questions;
};

const generateSuggestedAnswer = (
  question: string,
  userAnswer: string,
  modelAnswer: string
): string => {
  // Simulate AI improvement suggestions
  const improvements = [
    'Consider adding a specific example from your experience',
    'Include quantifiable results or metrics',
    'Structure your response with a clear beginning, middle, and end',
    'Connect your answer more directly to the role requirements'
  ];
  
  return `Here's how you could improve your answer: ${improvements[Math.floor(Math.random() * improvements.length)]}. ${modelAnswer}`;
};