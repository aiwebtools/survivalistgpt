
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';
import useAnimateOnScroll from '@/hooks/useAnimateOnScroll';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, delay }) => {
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "glass-panel rounded-xl p-6 transition-all duration-700",
        "border border-survival-accent/20",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16",
        `delay-[${delay}ms]`
      )}
    >
      <Quote className="w-10 h-10 text-survival-accent/60 mb-4" />
      <p className="text-gray-300 mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-survival-accent/30 flex items-center justify-center">
          <span className="text-white font-medium text-sm">{name.charAt(0)}</span>
        </div>
        <div className="ml-3">
          <p className="text-white font-medium">{name}</p>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });

  return (
    <section className="section-padding relative bg-gradient-to-b from-survival-dark/90 to-survival-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "max-w-3xl mx-auto text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="chip inline-flex mb-4">
            <Quote className="w-3 h-3 mr-1" />
            <span>User Experiences</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">What Users Are Saying</h2>
          <p className="text-gray-300">
            Hear from those who've relied on Survivalist GPT for expert guidance and survival knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Survivalist GPT provided me with detailed step-by-step instructions that were easy to follow. The tactical advice was comprehensive and helped me prepare for situations I hadn't even considered."
            name="Michael R."
            title="Wilderness Instructor"
            delay={100}
          />
          <TestimonialCard 
            quote="I was impressed by the depth of knowledge and the practical nature of the advice. The image analysis feature helped me correctly identify edible plants during my hiking trip."
            name="Sarah J."
            title="Outdoor Enthusiast"
            delay={200}
          />
          <TestimonialCard 
            quote="As someone with military experience, I found the battlefield guidance to be accurate and well-researched. The strategic planning capabilities are particularly valuable for training scenarios."
            name="James T."
            title="Former Military Personnel"
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
