const CallToAction = ({ onStartTyping }: { onStartTyping: () => void }) => (
  <section className="py-20 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10">
    <div className="container mx-auto px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
          Ready to Transform Your Typing?
        </h2>
        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Join over 50,000 users who have already improved their typing speed and accuracy with TypingPath's AI-powered training.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStartTyping}
            className="px-8 py-4 text-lg font-bold text-primary bg-accent rounded-xl shadow-lg shadow-accent/30 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 transform hover:scale-105"
          >
            Start Practicing Now
            <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <div className="text-sm text-text-secondary">
            <p>✓ No signup required  ✓ Sign up for progress tracking  ✓ AI analysis included</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">200+</div>
            <div className="text-sm text-text-secondary">Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">50K+</div>
            <div className="text-sm text-text-secondary">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">2M+</div>
            <div className="text-sm text-text-secondary">Tests Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">4.9★</div>
            <div className="text-sm text-text-secondary">User Rating</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CallToAction;
