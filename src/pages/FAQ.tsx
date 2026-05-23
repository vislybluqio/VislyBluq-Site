import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What industries do you specialize in?',
      answer:
        'Healthcare, e-commerce, manufacturing, and fintech — though our core technologies are industry-agnostic.',
    },
    {
      question: 'Do you offer consulting without a build?',
      answer:
        'Yes. Many clients start with technology consulting — discovery, audits, roadmaps, or fractional leadership — before committing to development. We can advise only, or stay on as your build partner.',
    },
    {
      question: 'Do you build mobile and web applications?',
      answer:
        'Yes. After consultation and planning, we build web apps (React, Next.js), mobile apps (iOS, Android, React Native), and the backends that power them.',
    },
    {
      question: 'How does your engagement model work?',
      answer:
        'Fixed-price projects, time & materials, or dedicated teams — tailored to your scope and timeline.',
    },
    {
      question: 'What is your typical project timeline?',
      answer:
        'MVPs often take 3–4 months; enterprise data platforms or AI integrations may take 6–12 months.',
    },
    {
      question: 'How do you handle data security?',
      answer:
        'Encryption at rest and in transit, strict access controls, and NDAs available before any discussion.',
    },
    {
      question: 'Do you offer post-launch support?',
      answer:
        'Yes — maintenance packages, SLA-backed support, and managed services after launch.',
    },
  ];

  return (
    <div className="pt-16 bg-white">
      <PageHero
        eyebrow="Support"
        title="Frequently asked questions"
        subtitle="Everything you need to know about our services and process."
        compact
      />

      <Section bg="white" narrow>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl transition-colors ${
                openIndex === index ? 'border-visly-blue bg-blue-50/30' : 'border-gray-200'
              }`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span
                  className={`text-sm font-semibold pr-4 ${
                    openIndex === index ? 'text-visly-dark' : 'text-gray-700'
                  }`}
                >
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-4 w-4 text-visly-blue shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-visly-navy rounded-2xl p-8 text-center text-white">
          <MessageCircle className="h-8 w-8 text-visly-cyan mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-white mb-2">Still have questions?</h2>
          <p className="text-sm text-blue-100 mb-5 max-w-md mx-auto">
            Contact our team — we&apos;re happy to help.
          </p>
          <Button to="/contact" variant="white" size="sm">
            Get in touch
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default FAQ;
