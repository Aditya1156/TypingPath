
interface FooterProps {
  onStartTyping: () => void;
}

const Footer = ({ onStartTyping }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
  <footer id="contact" className="bg-secondary text-text-secondary py-12 border-t border-border-primary">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        {/* Brand Section */}
        <div className="md:col-span-2">
          <button 
            onClick={scrollToTop}
            className="text-2xl font-bold text-accent mb-3 hover:scale-110 transition-transform cursor-pointer"
          >
            TypingPath
          </button>
          <p className="text-text-secondary mb-4 max-w-md">
            The most advanced AI-powered typing practice platform. Master touch typing with personalized coaching and comprehensive analytics.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/Aditya1156/TypingPath" className="text-text-secondary hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://twitter.com/typingpath" className="text-text-secondary hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-text-primary mb-4">Product</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-accent transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-accent transition-colors">Pricing</a></li>
            <li>
              <button 
                onClick={onStartTyping} 
                className="hover:text-accent transition-colors text-left"
              >
                Dashboard
              </button>
            </li>
            <li><a href="#lessons" className="hover:text-accent transition-colors">Lessons</a></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="font-semibold text-text-primary mb-4">Contact & Support</h4>
          <ul className="space-y-2">
            <li>
              <a href="mailto:adityaissc7@gmail.com" className="hover:text-accent transition-colors flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Support
              </a>
            </li>
            <li><a href="#help" className="hover:text-accent transition-colors">Help Center</a></li>
            <li><a href="#privacy" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-accent transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border-primary pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} TypingPath. All rights reserved.</p>
            <p className="text-sm mt-1">
              Created by <span className="font-semibold text-accent">Aditya</span> • 
              <a href="mailto:adityaissc7@gmail.com" className="text-accent hover:text-accent/80 transition-colors ml-1">
                adityaissc7@gmail.com
              </a>
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              99.9% Uptime
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure & Private
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;