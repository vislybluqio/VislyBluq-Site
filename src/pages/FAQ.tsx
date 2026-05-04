import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What industries do you specialize in?",
            answer: "We have extensive experience across Healthcare, E-commerce, Manufacturing, and Fintech. However, our core technologies (Web/Mobile Apps, Data Engineering, AI) are industry-agnostic, allowing us to deliver value to almost any sector."
        },
        {
            question: "Do you build mobile and web applications?",
            answer: "Yes, absolutely. We are a full-service digital product company. We build high-performance web applications (React, Next.js), mobile apps (React Native, iOS, Android), and robust backend systems to power them."
        },
        {
            question: "How does your engagement model work?",
            answer: "We offer flexible engagement models tailored to your needs: Project-based (Fixed Price) for well-defined scopes, Time & Materials for evolving projects, and Dedicated Teams for long-term partnerships."
        },
        {
            question: "What is your typical project timeline?",
            answer: "Timelines vary by complexity. A typical MVP (Minimum Viable Product) takes 3-4 months, while enterprise-grade data platforms or complex AI integrations may take 6-12 months. We provide detailed roadmaps during our Discovery phase."
        },
        {
            question: "How do you handle data security and privacy?",
            answer: "Security is built-in, not bolted on. We follow industry best practices including encryption at rest and in transit, SOC2 compliant workflows, and strict access controls. We are happy to sign NDAs before any initial discussions."
        },
        {
            question: "Do you offer post-launch support?",
            answer: "Yes. We don't just launch and leave. We offer maintenance packages, SLA-backed support, and managed services to ensure your applications and data infrastructure continue to operate smoothly."
        }
    ];

    return (
        <div className="pt-20 bg-white">
            {/* Header */}
            <section className="bg-visly-dark py-20 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-visly-blue opacity-10 transform skew-y-12"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 bg-visly-blue/10 text-visly-cyan px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-visly-blue/20">
                        <HelpCircle className="h-4 w-4" />
                        <span>SUPPORT</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        Everything you need to know about our services, process, and methodology.
                    </p>
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`border rounded-2xl transition-all duration-300 ${openIndex === index
                                    ? 'border-visly-blue bg-blue-50/50 shadow-md'
                                    : 'border-gray-200 hover:border-visly-blue/50'
                                    }`}
                            >
                                <button
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span className={`text-lg font-bold ${openIndex === index ? 'text-visly-dark' : 'text-gray-700'}`}>
                                        {faq.question}
                                    </span>
                                    {openIndex === index ? (
                                        <ChevronUp className="h-5 w-5 text-visly-blue" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>

                                <div
                                    className={`px-6 pb-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-visly-navy rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="relative z-10">
                            <MessageCircle className="h-12 w-12 text-visly-cyan mx-auto mb-6" />
                            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                            <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                                Can't find the answer you're looking for? Please contact our friendly team.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-block bg-white text-visly-navy px-8 py-3 rounded-full font-bold hover:bg-visly-cyan hover:text-white transition-colors"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
