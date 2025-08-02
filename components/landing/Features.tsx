import React from 'react';

const Feature = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="flex flex-col items-center text-center p-8 bg-secondary rounded-xl border border-border-primary transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent/50">
    <div className="mb-6 text-accent p-4 bg-accent/10 rounded-full">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-text-primary">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{children}</p>
  </div>
);

const Features = () => (
  <section id="features" className="py-24 bg-primary text-text-primary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Choose TypingPath?</h2>
        <p className="text-xl text-text-secondary mt-2 max-w-3xl mx-auto">
          More than just a speed test. A complete AI-powered typing mastery platform designed for modern learners.
        </p>
      </div>
      
      {/* Main Features Grid */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        <Feature
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>}
          title="TypingPath AI™ Coach"
        >
          Advanced AI analyzes your typing patterns, identifies weak spots, and generates personalized typing practice drills for targeted improvement.
        </Feature>
        <Feature
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="8" x2="8" y1="12" y2="16"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="16" x2="16" y1="12" y2="16"/></svg>}
          title="Advanced Analytics"
        >
          Comprehensive dashboard with WPM trends, accuracy analysis, streak tracking, and detailed performance insights.
        </Feature>
        <Feature
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          title="Smart Timer System"
        >
          Automatic session tracking with daily goals, practice streaks, and safety limits for healthy typing habits.
        </Feature>
      </div>

      {/* Additional Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <div className="flex items-start space-x-3 p-6 bg-secondary/50 rounded-lg border border-border-primary">
          <div className="text-accent mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-1">200+ Lessons</h4>
            <p className="text-sm text-text-secondary">Structured curriculum from basics to advanced coding patterns</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-6 bg-secondary/50 rounded-lg border border-border-primary">
          <div className="text-accent mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v6.5"/><path d="M15.72 6.64 8.36 9.96"/><path d="M12 22v-6.5"/><path d="M8.28 17.36l7.36-3.32"/><path d="M6.64 8.28l3.32 7.36"/><path d="M17.36 15.72l-3.32-7.36"/>
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-1">6 Beautiful Themes</h4>
            <p className="text-sm text-text-secondary">Dark, light, hacker, ocean, sunset, and forest themes</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-6 bg-secondary/50 rounded-lg border border-border-primary">
          <div className="text-accent mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-1">Real-time Metrics</h4>
            <p className="text-sm text-text-secondary">Live WPM, accuracy, and consistency tracking</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-6 bg-secondary/50 rounded-lg border border-border-primary">
          <div className="text-accent mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10c0-5.93-5.13-10.7-11-10"/><path d="m5 5 14 14"/>
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-1">Cross-Device Sync</h4>
            <p className="text-sm text-text-secondary">Firebase cloud storage for seamless progress tracking</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-20 text-center">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6">
            <div className="text-4xl font-bold text-accent mb-2">50,000+</div>
            <div className="text-text-secondary">Active Users</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-accent mb-2">2M+</div>
            <div className="text-text-secondary">Tests Completed</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-accent mb-2">95%</div>
            <div className="text-text-secondary">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
