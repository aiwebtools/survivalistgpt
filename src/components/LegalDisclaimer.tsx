
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import useAnimateOnScroll from '@/hooks/useAnimateOnScroll';

const LegalDisclaimer = () => {
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });
  
  return (
    <section className="py-12 relative bg-survival-dark/95 border-t border-survival-accent/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Small disclaimer at the top */}
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-center text-sm text-gray-400 italic">
            Informational, educational, and research purposes only.
          </p>
        </div>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "max-w-4xl mx-auto glass-panel rounded-xl p-6 md:p-8 transition-all duration-700",
            "border border-survival-danger/30",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex items-start space-x-4">
            <div className="mt-1 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-survival-danger" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Legal Disclaimer</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <p>
                  The information provided by Survivalist GPT is for educational and informational purposes only. 
                  While we strive to provide accurate and up-to-date information, we make no representations or warranties 
                  of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability 
                  of the information, products, services, or related graphics contained within Survivalist GPT for any purpose.
                </p>
                <p>
                  Any reliance you place on such information is strictly at your own risk. In no event will we be liable for any 
                  loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage 
                  whatsoever arising from loss of data or profits arising out of, or in connection with, the use of Survivalist GPT.
                </p>
                <p>
                  The content provided by Survivalist GPT should not be used as a substitute for professional advice, medical 
                  treatment, or professional services. Users should always seek the advice of qualified professionals regarding 
                  specific survival situations, medical conditions, or legal matters.
                </p>
                <p>
                  Survivalist GPT does not endorse or encourage any illegal activities, offensive combat, or actions that may 
                  cause harm to oneself or others. All guidance is provided with the intent of ensuring safety and survival in 
                  accordance with legal and ethical standards.
                </p>
                <p>
                  By using Survivalist GPT, you acknowledge and agree to these terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalDisclaimer;
