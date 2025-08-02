

const PricingCard = ({ 
  title, 
  price, 
  period, 
  description, 
  features, 
  buttonText, 
  isPopular = false,
  onGetStarted 
}: {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  onGetStarted: () => void;
}) => (
  <div className={`relative flex flex-col p-8 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
    isPopular 
      ? 'border-accent bg-gradient-to-br from-secondary to-tertiary/50 shadow-lg' 
      : 'border-border-primary bg-secondary hover:border-accent/50'
  }`}>
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span className="bg-accent text-primary px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </span>
      </div>
    )}
    
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary mb-4">{description}</p>
      <div className="flex items-baseline justify-center">
        <span className="text-4xl font-bold text-accent">${price}</span>
        <span className="text-text-secondary ml-1">/{period}</span>
      </div>
    </div>

    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg className="w-5 h-5 text-success mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-text-secondary">{feature}</span>
        </li>
      ))}
    </ul>

    <button
      onClick={onGetStarted}
      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
        isPopular
          ? 'bg-accent text-primary hover:bg-accent/90 hover:shadow-lg'
          : 'bg-tertiary text-text-primary hover:bg-accent hover:text-primary border border-border-primary hover:border-accent'
      }`}
    >
      {buttonText}
    </button>
  </div>
);

const Pricing = ({ onStartTyping }: { onStartTyping: () => void }) => (
  <section id="pricing" className="py-20 bg-primary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          Choose Your Learning Path
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          From free practice to professional mastery. TypingPath grows with your typing journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingCard
          title="Free Starter"
          price="0"
          period="forever"
          description="Perfect for beginners getting started"
          features={[
            "Basic typing tests (30 words)",
            "Real-time WPM & accuracy tracking",
            "3 beautiful themes",
            "Basic progress tracking",
            "Mobile responsive design",
            "Sound effects & customization"
          ]}
          buttonText="Start Free"
          onGetStarted={onStartTyping}
        />

        <PricingCard
          title="Pro Typist"
          price="9.99"
          period="month"
          description="For serious learners and professionals"
          features={[
            "Everything in Free Starter",
            "🤖 Aether AI™ Coach & Analysis",
            "200+ structured lessons & drills",
            "Advanced analytics dashboard",
            "Custom practice sessions",
            "Session history & export",
            "Daily goals & streak tracking",
            "Priority support"
          ]}
          buttonText="Upgrade to Pro"
          isPopular={true}
          onGetStarted={onStartTyping}
        />

        <PricingCard
          title="Team Enterprise"
          price="49.99"
          period="month"
          description="For organizations and typing schools"
          features={[
            "Everything in Pro Typist",
            "Team management dashboard",
            "Advanced reporting & analytics",
            "Custom lesson creation",
            "White-label branding",
            "SSO integration",
            "Dedicated account manager",
            "24/7 priority support"
          ]}
          buttonText="Contact Sales"
          onGetStarted={() => window.open('mailto:adityaissc7@gmail.com?subject=TypingPath Enterprise Inquiry', '_blank')}
        />
      </div>

      <div className="text-center mt-12">
        <p className="text-text-secondary mb-4">
          All plans include a 14-day money-back guarantee
        </p>
        <div className="flex justify-center items-center space-x-6 text-sm text-text-secondary">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure payments
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Cancel anytime
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instant access
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;
