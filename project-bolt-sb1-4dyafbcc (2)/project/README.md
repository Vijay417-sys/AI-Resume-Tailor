# TailorCoach - AI Resume Tailor & Interview Coach

An AI-powered web application that helps job seekers optimize their resumes for specific roles and practice interview skills with instant feedback.

## Features

- **Resume Upload & Parsing**: Support for PDF, DOCX, and text files
- **ATS Optimization**: Generate keyword-optimized resume content
- **Cover Letter Generation**: Create personalized cover letters for each role
- **Interview Preparation**: Get role-specific interview questions with model answers
- **Practice Mode**: Interactive chat with AI scoring and feedback
- **Download Support**: Export tailored resumes and cover letters

## Quick Start

### Running Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to the provided localhost URL

### Using Sample Data

1. Click "Use Sample Data" on the home page to load example content
2. Or manually upload your own resume and paste a job description
3. Click "Generate Tailored Content" to process

## Demo Script (60-90 seconds)

### 0-10s: Introduction
"This is TailorCoach - an AI-powered platform that optimizes resumes for specific job applications and provides interview coaching."

### 10-30s: Upload & Generate
1. Show the home page
2. Click "Use Sample Data" to load example resume and job description
3. Click "Generate Tailored Content"
4. Navigate to Results page automatically

### 30-60s: Show Results
1. **Tailored Resume tab**: Highlight ATS-optimized bullet points and keyword matches
2. **Cover Letter tab**: Show personalized cover letter
3. **Interview Prep tab**: Display generated questions with difficulty levels

### 60-90s: Practice Demo
1. Navigate to Practice tab
2. Select a medium-difficulty question
3. Type a sample answer (e.g., "I have 3 years of React experience and built several projects")
4. Show AI scoring (6/10) and improvement suggestions
5. End with: "Live at [your-deployment-url]"

## File Structure

```
src/
├── components/          # React components
│   ├── HomePage.tsx     # Upload & generation interface
│   ├── ResultsPage.tsx  # Tabbed results view
│   ├── PracticeChat.tsx # Interactive interview practice
│   ├── AboutPage.tsx    # How it works & privacy info
│   └── Toast.tsx        # Notification component
├── utils/               # Helper functions
│   ├── aiHelpers.ts     # AI content generation logic
│   └── downloadHelpers.ts # File export functionality
├── types.ts             # TypeScript interfaces
└── App.tsx              # Main application component
```

## Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system
- **File Processing**: Browser APIs (FileReader, Blob)

## Key Components

### HomePage
- Drag & drop resume upload
- Job description input
- Sample data loading
- AI content generation trigger

### ResultsPage
- Tabbed interface (Resume/Cover Letter/Interview Prep)
- Copy to clipboard functionality
- Download buttons for generated content
- Keyword highlighting and optimization display

### PracticeChat
- Interactive interview question selection
- Real-time answer evaluation
- Scoring system (1-10) with detailed feedback
- Improvement suggestions and model answers

## AI Features

### Resume Optimization
- Keyword extraction from job descriptions
- ATS-friendly formatting and content rewriting
- Skills matching and enhancement
- Experience bullet point optimization

### Interview Preparation
- Role-specific question generation
- Difficulty-based categorization (Easy/Medium/Hard)
- Model answer creation
- Answer evaluation with scoring and feedback

## Privacy & Security

- **No server storage**: All processing happens client-side
- **Temporary processing**: Files are not permanently stored
- **No data retention**: Generated content exists only during the session
- **Local processing**: Resume parsing and AI generation run in the browser

## Deployment

### Production Build
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

## Sample Data

### Sample Resume (included)
```
Vijay Hosapeti
Email: vijay@example.com | Phone: +91-XXXXXXXXXX
Frontend Developer — React, Vite, Tailwind.

Experience:
• Deepfake-Detector UI — Built React UI for live detection demo (React, Firebase).
• Portfolio Generator — Created an automated portfolio generator using Vite.

Education: B.E. in Engineering — Acharya Institute of Technology
Skills: React, JavaScript, HTML, CSS, Tailwind, Firebase
```

### Sample Job Description (included)
```
We are hiring a Frontend Engineer (React) to build scalable, responsive web apps. 
Required: 3+ years React, strong JS, experience with Vite or similar tooling, 
CSS/Tailwind, REST APIs, and Git. Responsibilities: build UI components, 
collaborate with backend, ensure accessibility, and ship features quickly.
```

## Acceptance Criteria

✅ Upload + generate flow works without errors  
✅ Tailored resume returns ATS-optimized content with keyword matching  
✅ Cover letter is coherent and personalized to the job  
✅ Interview practice provides scoring and actionable feedback  
✅ Clean, responsive UI with modern design  
✅ Download functionality for generated content  
✅ Privacy-focused approach with no permanent storage  

## Future Enhancements

- [ ] PDF parsing integration (currently uses fallback text)
- [ ] Voice recording for interview practice
- [ ] More sophisticated NLP for content generation
- [ ] Integration with job board APIs
- [ ] Multi-language support
- [ ] Advanced analytics and progress tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

**Hackathon Pitch**: TailorCoach solves the #1 job search problem - generic resumes that don't match job requirements. Our AI instantly optimizes resumes for ATS systems, generates personalized cover letters, and provides interactive interview coaching with real-time feedback. Built for immediate impact and scalable across industries.

**Live Demo**: [Your deployed URL here]