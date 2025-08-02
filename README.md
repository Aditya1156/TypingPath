# TypingPath - Modern Typing Master 🚀

A sophisticated, AI-powered typing practice application built with React, TypeScript, and Vite. TypingPath combines modern web technologies with gamification elements and AI coaching to create an engaging typing improvement experience.

![TypingPath Demo](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

## ✨ Features

### 🎯 Core Typing Experience
- **Real-time WPM & Accuracy Tracking**: Live statistics during typing sessions
- **Multiple Test Modes**: Random words, structured lessons, and AI-generated drills
- **Advanced Error Analysis**: Detailed breakdown of typing mistakes and patterns
- **Live Finger Guidance**: Visual keyboard layout with finger positioning hints
- **Customizable Caret Styles**: Line, block, or underline cursor options
- **Sound Effects**: Optional audio feedback for keystrokes and completion

### 🤖 AI-Powered Features
- **Aether AI Coach**: Intelligent analysis of typing patterns and personalized feedback
- **Custom Drill Generation**: AI creates targeted practice sessions based on weak areas
- **Smart Practice Recommendations**: Adaptive suggestions for improvement areas
- **Error Pattern Recognition**: AI identifies recurring mistakes and provides solutions

### 📊 Advanced Analytics Dashboard
- **Performance Statistics**: Comprehensive WPM, accuracy, and consistency metrics
- **Progress Tracking**: Visual charts showing improvement over time
- **Session History**: Detailed logs of all typing sessions with filterable data
- **Achievement System**: Unlock badges and milestones for motivation
- **Personal Bests**: Track your highest WPM and accuracy records
- **Problem Area Analysis**: Identify and focus on challenging key combinations
- **Streak Tracking**: Monitor daily practice consistency

### ⏱️ Smart Timer System
- **Automatic Session Tracking**: Starts timing when you begin typing, stops when finished
- **Daily Practice Goals**: Set and track daily time targets (customizable from 5 minutes to 8 hours)
- **Progress Visualization**: Color-coded progress bars and percentage indicators
- **Streak Counter**: Track consecutive days of practice for motivation
- **Multi-view Display**: Compact sidebar widget and full dashboard interface
- **Cloud Sync**: Firebase integration for cross-device synchronization
- **Real-time Statistics**: Live session time, daily totals, and goal progress

### 🎨 Customization & Themes
- **6 Beautiful Themes**: 
  - 🌙 Classic Dark
  - ☀️ Clean Light  
  - 💚 Matrix Hacker
  - 🌊 Ocean Blue
  - 🌅 Warm Sunset
  - 🌲 Nature Forest
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Theme-Aware Components**: All UI elements adapt to selected theme
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

### 📚 Structured Learning
- **Progressive Lesson System**: Organized chapters from basic to advanced
- **Skill-Based Drills**: Targeted practice for specific key combinations
- **Custom Text Input**: Practice with your own text content
- **Lesson Progress Tracking**: Monitor completion and performance across lessons

### 🔧 Technical Features
- **Offline Capability**: Works without internet connection for basic features
- **Data Export**: Export your progress and statistics
- **Keyboard Navigation**: Full support for keyboard-only usage
- **Performance Optimized**: Smooth 60fps typing experience
- **Error Recovery**: Robust error handling and state management
- **Smart Timer Integration**: Automatic session tracking with Firebase cloud sync

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Gemini API Key** (for AI features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aditya1156/TypingPath.git
   cd TypingPath
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
TypingPath/
├── src/
│   ├── components/           # React components
│   │   ├── dashboard/       # Analytics dashboard components
│   │   ├── AiCoachFeedback.tsx
│   │   ├── TypingTest.tsx
│   │   ├── Results.tsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services (Gemini AI)
│   ├── utils/               # Utility functions
│   ├── data/                # Lesson data and configurations
│   └── types.ts             # TypeScript type definitions
├── public/                  # Static assets
├── docs/                    # Feature documentation
└── ...
```

## 🎮 How to Use

### Basic Typing Test
1. Launch the application
2. Select "Start Random Test" or choose a specific lesson
3. Begin typing when the text appears
4. View your results and AI analysis after completion

### AI-Powered Practice
1. Complete a typing test with errors
2. Click "Get AI Analysis" in the results
3. Review Aether AI's feedback and recommendations
4. Use "Practice This Drill" for targeted improvement

### Dashboard Analytics
1. Navigate to the Dashboard from the sidebar
2. Explore different tabs: Overview, Analytics, History
3. Track your progress and identify improvement areas
4. Set daily practice time goals and monitor achievement
5. View timer statistics and maintain practice streaks

### Timer & Goal Setting
1. Set your daily practice goal in the dashboard timer widget
2. Timer automatically starts when you begin typing
3. Monitor progress in the compact sidebar widget
4. Track streaks and celebrate goal achievements
5. View detailed time statistics across days, weeks, and months

### Customization
1. Open Settings from the sidebar
2. Choose your preferred theme
3. Adjust caret style and sound preferences
4. Personalize your typing experience

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom theme system
- **AI Integration**: Google Gemini API for intelligent coaching
- **State Management**: React Context and custom hooks
- **Authentication**: Firebase Auth (optional)
- **Storage**: Local Storage with optional cloud sync
- **Timer Tracking**: Firebase Firestore for practice time analytics
- **Charts**: Custom chart components for analytics
- **Icons**: Lucide React icons

## 📈 Performance Metrics

- **Bundle Size**: ~1.4MB (gzipped: ~337KB)
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <2s
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with conventional commits: `git commit -m "feat: add amazing feature"`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent coaching capabilities
- **Tailwind CSS** for the beautiful, responsive design system
- **React Community** for the excellent ecosystem and tools
- **Contributors** who help make TypingPath better

## 👨‍💻 Developer

**Aditya Kumar**  
Full Stack Developer & TypingPath Creator

- 📧 Email: [adityaissc7@gmail.com](mailto:adityaissc7@gmail.com)
- 🐙 GitHub: [@Aditya1156](https://github.com/Aditya1156)
- 💼 LinkedIn: Connect with me for collaboration opportunities

*Passionate about creating modern, user-friendly applications that help people improve their skills.*

## 📞 Support & Feedback

- **Issues**: [GitHub Issues](https://github.com/Aditya1156/TypingPath/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Aditya1156/TypingPath/discussions)
- **Developer**: Aditya Kumar - [adityaissc7@gmail.com](mailto:adityaissc7@gmail.com)

---

**Made with ❤️ for the typing community**

*Transform your typing skills with AI-powered practice and modern design.*
