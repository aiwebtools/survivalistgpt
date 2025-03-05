
import { AlertTriangle, Shield, Brain, Map, Target, Trees, Umbrella } from 'lucide-react';
import { cn } from '@/lib/utils';
import useAnimateOnScroll from '@/hooks/useAnimateOnScroll';
import { useEffect, useState } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "card-3d glass-panel rounded-xl p-4 md:p-6 transition-all duration-500 md:duration-700 h-full",
        "border border-survival-accent/20 hover:border-survival-accent/50",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 md:translate-y-16",
        // Apply reduced delay on mobile
        { "transition-delay-0": isMobile },
        { "transition-delay-100": !isMobile && delay === 100 },
        { "transition-delay-200": !isMobile && delay === 200 },
        { "transition-delay-300": !isMobile && delay === 300 },
        { "transition-delay-400": !isMobile && delay === 400 },
        { "transition-delay-500": !isMobile && delay === 500 },
        { "transition-delay-600": !isMobile && delay === 600 },
        { "transition-delay-700": !isMobile && delay === 700 }
      )}
      style={{ transitionDelay: isMobile ? '0ms' : `${delay}ms` }}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 rounded-lg bg-survival-accent/20 flex items-center justify-center">
        <div className="text-survival-brightAccent">{icon}</div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{title}</h3>
      <p className="text-sm md:text-base text-gray-300">{description}</p>
    </div>
  );
};

const Features = () => {
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });
  
  return (
    <section className="section-padding relative bg-gradient-to-b from-survival-dark to-survival-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "max-w-3xl mx-auto text-center mb-8 md:mb-16 transition-all duration-500 md:duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="chip inline-flex mb-4">
            <AlertTriangle className="w-3 h-3 mr-1" />
            <span>Expert Capabilities</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 gradient-text">Comprehensive Survival Intelligence</h2>
          <p className="text-sm md:text-base text-gray-300">
            Survivalist GPT offers detailed, evidence-based strategies and resources to help you develop essential survival skills, 
            situational awareness, and safety measures for any scenario.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <FeatureCard 
            title="Battlefield Guidance"
            description="Step-by-step instructions on tactics, situational awareness, and safety measures for high-risk environments."
            icon={<Shield className="w-5 h-5 md:w-6 md:h-6" />}
            delay={100}
          />
          <FeatureCard 
            title="Strategic Planning"
            description="Create detailed outlines for each survival topic or scenario, ensuring a structured approach to complex situations."
            icon={<Brain className="w-5 h-5 md:w-6 md:h-6" />}
            delay={200}
          />
          <FeatureCard 
            title="Image Analysis"
            description="Upload images for analysis and receive contextual advice based on visual information and environmental factors."
            icon={<Target className="w-5 h-5 md:w-6 md:h-6" />}
            delay={300}
          />
          <FeatureCard 
            title="Web Intelligence"
            description="Access to current research, best practices, and resources related to survival and battlefield tactics."
            icon={<Map className="w-5 h-5 md:w-6 md:h-6" />}
            delay={400}
          />
          <FeatureCard 
            title="Wilderness Skills"
            description="Learn essential skills for surviving in natural environments, from shelter building to water purification."
            icon={<Trees className="w-5 h-5 md:w-6 md:h-6" />}
            delay={500}
          />
          <FeatureCard 
            title="Tactical Decision-Making"
            description="Develop decision-making frameworks for high-stress situations based on historical knowledge and modern strategies."
            icon={<AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />}
            delay={600}
          />
          <FeatureCard 
            title="Disaster Preparedness"
            description="Comprehensive training on preparing for natural disasters, emergency response protocols, and creating family safety plans."
            icon={<Umbrella className="w-5 h-5 md:w-6 md:h-6" />}
            delay={700}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
