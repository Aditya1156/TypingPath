const TestimonialCard = ({ 
  name, 
  role, 
  company, 
  content, 
  avatar, 
  rating 
}: {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}) => (
  <div className="bg-secondary p-8 rounded-xl border border-border-primary hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-warning' : 'text-border-primary'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <blockquote className="text-text-secondary mb-6 italic leading-relaxed">
      "{content}"
    </blockquote>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center text-primary font-bold text-lg mr-4">
        {avatar}
      </div>
      <div>
        <div className="font-semibold text-text-primary">{name}</div>
        <div className="text-sm text-text-secondary">{role} at {company}</div>
      </div>
    </div>
  </div>
);

const Testimonials = () => (
  <section className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          Loved by Typists Worldwide
        </h2>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Join thousands of users who have improved their typing speed and accuracy with TypingPath.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <TestimonialCard
          name="Sarah Chen"
          role="Software Developer"
          company="TechCorp"
          content="TypingPath's AI coach is incredible! It identified my weak spots and created custom drills that improved my coding speed by 40% in just 3 weeks. The analytics dashboard keeps me motivated."
          avatar="SC"
          rating={5}
        />
        
        <TestimonialCard
          name="Marcus Johnson"
          role="Content Writer"
          company="Digital Agency"
          content="As a professional writer, typing speed is crucial. TypingPath helped me go from 45 WPM to 75 WPM. The structured lessons and beautiful themes make practice enjoyable."
          avatar="MJ"
          rating={5}
        />
        
        <TestimonialCard
          name="Dr. Emily Rodriguez"
          role="Medical Transcriptionist"
          company="Regional Hospital"
          content="The accuracy improvements have been game-changing for my medical transcription work. The AI analysis helps me avoid repetitive errors, and the timer feature keeps me accountable."
          avatar="ER"
          rating={5}
        />
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-6 text-text-secondary">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center text-primary text-sm font-bold border-2 border-primary">
                  {letter}
                </div>
              ))}
            </div>
            <span className="ml-3 text-sm">50,000+ active users</span>
          </div>
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm">4.9/5 rating</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
