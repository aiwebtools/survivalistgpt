
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, HelpCircle } from 'lucide-react';
import useAnimateOnScroll from '@/hooks/useAnimateOnScroll';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-survival-accent/20">
      <button
        className="w-full text-left py-5 flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-survival-accent transition-transform duration-300",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useAnimateOnScroll({ threshold: 0.1 });

  const faqItems = [
    {
      question: "What is Survivalist GPT?",
      answer: "Survivalist GPT is an advanced AI assistant specialized in providing comprehensive survival advice, with a special focus on battlefield guidance. It offers evidence-based strategies, techniques, and resources to support users in developing essential survival skills, situational awareness, and safety measures."
    },
    {
      question: "What capabilities does Survivalist GPT have?",
      answer: "Survivalist GPT is equipped with advanced capabilities including image processing and web search. This allows it to analyze visual data and access current research, best practices, and resources related to survival and battlefield tactics, providing you with the most accurate and up-to-date information."
    },
    {
      question: "How does Survivalist GPT approach battlefield scenarios?",
      answer: "For battlefield scenarios, Survivalist GPT offers step-by-step instructions on tactics, situational awareness, and safety measures, emphasizing the importance of adhering to legal and ethical standards. It provides clear explanations, practical examples, and guidelines for decision-making in high-stress environments."
    },
    {
      question: "Can Survivalist GPT analyze images?",
      answer: "Yes, Survivalist GPT can process and analyze images to provide context-specific guidance. When you upload photos of your environment, equipment, or situation, it can interpret this visual data to offer more tailored and relevant advice for your specific circumstances."
    },
    {
      question: "Is Survivalist GPT's advice based on credible sources?",
      answer: "Absolutely. Survivalist GPT bases its guidance on a foundation of historical knowledge, modern strategies, and a deep understanding of survival in hostile environments. It draws upon a wide range of credible sources and expert insights to ensure the accuracy and reliability of its advice."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding relative bg-survival-dark/90">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "max-w-3xl mx-auto text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="chip inline-flex mb-4">
            <HelpCircle className="w-3 h-3 mr-1" />
            <span>Questions & Answers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
          <p className="text-gray-300">
            Find answers to common questions about Survivalist GPT's capabilities and approach.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-panel rounded-xl p-6 md:p-8">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
