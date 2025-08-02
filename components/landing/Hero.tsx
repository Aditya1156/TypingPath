

interface HeroProps {
  onStartTyping: () => void;
}

const Hero = ({ onStartTyping }: HeroProps) => (
  <section className="relative min-h-screen flex items-center justify-center text-center text-text-primary bg-primary overflow-hidden">
    <div className="absolute inset-0 bg-grid-slate-800/20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
     <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/50 to-primary"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/10 blur-[150px]"></div>
    </div>
    <div className="relative z-10 p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <span className="inline-flex items-center px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-semibold">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI-Powered • 50,000+ Users • 4.9★ Rating
        </span>
      </div>
      
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
        Master Touch Typing with
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
          TypingPath AI™ Coach
        </span>
      </h1>
      
      <p className="max-w-3xl mx-auto text-lg sm:text-xl text-text-secondary mb-8 leading-relaxed">
        Transform your typing from hunt-and-peck to professional speed with TypingPath. Our AI analyzes your mistakes, 
        creates personalized typing drills, and tracks your progress. Perfect for Vietnam typing practice and Vietnamese learners.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <button
          onClick={onStartTyping}
          className="px-8 py-4 text-lg font-bold text-primary bg-accent rounded-xl shadow-lg shadow-accent/30 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
          Start Typing Practice
          <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        
        <button className="px-8 py-4 text-lg font-semibold text-text-primary border-2 border-border-primary rounded-xl hover:border-accent hover:text-accent transition-all duration-300">
          Watch Demo
          <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-6-8h8m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Feature highlights */}
      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-sm">
        <div className="flex items-center justify-center sm:justify-start">
          <svg className="w-5 h-5 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-text-secondary">No Signup Required</span>
        </div>
        <div className="flex items-center justify-center sm:justify-start">
          <svg className="w-5 h-5 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-text-secondary">Privacy Focused</span>
        </div>
        <div className="flex items-center justify-center sm:justify-start">
          <svg className="w-5 h-5 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-text-secondary">Instant Access</span>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
