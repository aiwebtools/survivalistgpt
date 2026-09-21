import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConsentPopup from '@/components/ConsentPopup';
import WaveBackground from '@/components/WaveBackground';
import SurvivalistChat from '@/components/SurvivalistChat';

const Chat = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-survival-dark text-foreground">
      <WaveBackground />
      <Navbar />
      <main className="relative z-10 px-3 pb-8 pt-28 md:px-6 md:pt-28">
        <SurvivalistChat />
      </main>
      <Footer />
      <ConsentPopup />
    </div>
  );
};

export default Chat;
