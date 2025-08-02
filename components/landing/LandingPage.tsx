import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Pricing from './Pricing';
import Footer from './Footer';
import type { ModalType } from '../../types';

interface LandingPageProps {
  onStartTyping: () => void;
  onShowModal: (modal: ModalType) => void;
  onShowSignIn?: () => void;
}

const LandingPage = ({ onStartTyping, onShowModal, onShowSignIn }: LandingPageProps) => {
  return (
    <div className="font-sans bg-primary">
      <Header onShowModal={onShowModal} onShowSignIn={onShowSignIn} />
      <main>
        <Hero onStartTyping={onStartTyping} />
        <Features />
        <Testimonials />
        <CallToAction onStartTyping={onStartTyping} />
        <Pricing onStartTyping={onStartTyping} />
      </main>
      <Footer onStartTyping={onStartTyping} />
    </div>
  );
};

export default LandingPage;
