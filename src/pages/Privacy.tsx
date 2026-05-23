
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
    return (
        <div className="pt-16 bg-white">
            {/* Header */}
            <section className="bg-visly-dark py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-visly-blue/10 text-visly-cyan px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border border-visly-blue/20">
                        <Shield className="h-4 w-4" />
                        <span>LEGAL</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-base text-gray-300">
                        We value your trust and are committed to protecting your personal information.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                        <p className="lead text-xl text-visly-dark font-medium mb-8">
                            Last updated: December May 20, 2026
                        </p>

                        <div className="space-y-12">
                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-visly-blue/10 rounded-lg">
                                        <Eye className="h-6 w-6 text-visly-blue" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-visly-dark m-0">1. Information We Collect</h2>
                                </div>
                                <p>
                                    We collect information that you provide directly to us, including:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Contact information (name, email address, phone number)</li>
                                    <li>Business information (company name, job title)</li>
                                    <li>Project requirements and technical specifications</li>
                                    <li>Communications you send to us</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-visly-teal/10 rounded-lg">
                                        <FileText className="h-6 w-6 text-visly-teal" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-visly-dark m-0">2. How We Use Information</h2>
                                </div>
                                <p>
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Provide, maintain, and improve our services</li>
                                    <li>Respond to your comments, questions, and requests</li>
                                    <li>Send you technical notices, updates, and administrative messages</li>
                                    <li>Communicate with you about products, services, and events</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-visly-navy/10 rounded-lg">
                                        <Lock className="h-6 w-6 text-visly-navy" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-visly-dark m-0">3. Data Security</h2>
                                </div>
                                <p>
                                    We use appropriate technical and organizational measures to protect the personal information that we collect and process about you. The measures we use are designed to provide a level of security appropriate to the risk of processing your personal information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-visly-dark mb-4">4. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at:
                                    <span className="block mt-2 font-bold text-visly-blue">privacy@vislybluq.com</span>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Privacy;
