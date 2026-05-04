
import { FileCheck, AlertCircle, HelpCircle } from 'lucide-react';

const Terms = () => {
    return (
        <div className="pt-20 bg-white">
            {/* Header */}
            <section className="bg-visly-dark py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-visly-blue/10 text-visly-cyan px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-visly-blue/20">
                        <FileCheck className="h-4 w-4" />
                        <span>LEGAL</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-xl text-gray-300 font-light">
                        Please read these terms carefully before using our services.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                        <p className="lead text-xl text-visly-dark font-medium mb-8">
                            Effective Date: December 19, 2025
                        </p>

                        <div className="space-y-12">
                            <section>
                                <h2 className="text-2xl font-bold text-visly-dark mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing or using the services provided by VislyBluq Consulting ("Company", "we", "us", or "our"),
                                    you agree to be bound by these Terms of Service. If you disagree with any part of the terms,
                                    you may not access the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-visly-dark mb-4">2. Services</h2>
                                <p>
                                    VislyBluq provides technology consulting, software development, and data strategy services.
                                    The specific scope of services for each client will be defined in a separate Statement of Work (SOW)
                                    or Service Agreement.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-visly-dark mb-4">3. Intellectual Property</h2>
                                <p>
                                    Unless otherwise stated in a specific SOW, all intellectual property rights in the
                                    custom code, designs, and strategies developed for the client shall be transferred to the client
                                    upon full payment. VislyBluq retains rights to its pre-existing frameworks, tools, and methodologies.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-start space-x-4 bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                                    <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h2 className="text-xl font-bold text-visly-dark mb-2 mt-0">4. Limitation of Liability</h2>
                                        <p className="text-sm m-0">
                                            In no event shall VislyBluq, its directors, employees, partners, agents, suppliers, or affiliates,
                                            be liable for any indirect, incidental, special, consequential or punitive damages, including without
                                            limitation, loss of profits, data, use, goodwill, or other intangible losses.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-visly-dark mb-4">5. Governing Law</h2>
                                <p>
                                    These Terms shall be governed and construed in accordance with the laws of the United States,
                                    without regard to its conflict of law provisions.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-visly-dark mb-4 pl-0">Contact</h2>
                                <div className="flex items-center space-x-3 text-visly-blue font-medium">
                                    <HelpCircle className="h-5 w-5" />
                                    <a href="mailto:legal@vislybluq.com" className="hover:underline">legal@vislybluq.com</a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Terms;
