import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, Briefcase } from 'lucide-react';

const Apply = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const jobTitle = queryParams.get('job') || 'General Application';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        resume: null as File | null,
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        try {
            // Using FormSubmit.co for direct email delivery
            const response = await fetch("https://formsubmit.co/ajax/vislybluq5@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    job_title: jobTitle,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    linkedin: formData.linkedin,
                    message: formData.message,
                    _subject: `New Job Application: ${jobTitle} from ${formData.name}`,
                    _template: "table"
                }),
            });

            if (response.ok) {
                // Clear all fields IMMEDIATELY
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    linkedin: '',
                    resume: null,
                    message: ''
                });
                setIsSubmitted(true);
            } else {
                throw new Error("Application failed");
            }
        } catch (error) {
            console.error("Error sending application:", error);
            alert("Something went wrong. Please check your connection or email vislybluq5@gmail.com directly.");
        } finally {
            setIsSending(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="pt-24 pb-20 bg-visly-gray min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/careers" className="inline-flex items-center text-visly-blue font-bold mb-8 hover:translate-x-1 transition-transform">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Careers
                </Link>

                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden border border-gray-100">
                    <div className="mb-10">
                        <span className="text-visly-blue font-black uppercase tracking-widest text-sm bg-blue-50 px-3 py-1 rounded-full mb-4 inline-block">
                            Application Form
                        </span>
                        <h1 className="text-3xl md:text-4xl font-black text-visly-dark mb-4">
                            Apply for <span className="text-visly-blue">{jobTitle}</span>
                        </h1>
                        <p className="text-gray-600 font-medium">
                            Join VislyBluq and help us build the next generation of digital products.
                        </p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center py-16 animate-fade-in">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle className="h-12 w-12" />
                            </div>
                            <h2 className="text-3xl font-black text-visly-dark mb-4">Application Received!</h2>
                            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                                Thank you for applying to VislyBluq. Our team will review your application and get back to you soon at <strong>vislybluq5@gmail.com</strong>.
                            </p>
                            <Link to="/careers" className="bg-visly-navy text-white px-8 py-4 rounded-full font-bold hover:bg-visly-blue transition-all">
                                View Other Openings
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-visly-dark mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue bg-visly-gray transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-visly-dark mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue bg-visly-gray transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-visly-dark mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue bg-visly-gray transition-all"
                                        placeholder="+234..."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="linkedin" className="block text-sm font-bold text-visly-dark mb-2">LinkedIn Profile URL</label>
                                    <input
                                        type="url"
                                        id="linkedin"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue bg-visly-gray transition-all"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-visly-dark mb-2">Cover Letter / Why VislyBluq? *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue bg-visly-gray transition-all resize-none"
                                    placeholder="Tell us about yourself and why you're a good fit..."
                                />
                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start space-x-4 mb-8">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Briefcase className="h-6 w-6 text-visly-blue" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-visly-dark">Note:</p>
                                    <p className="text-xs text-gray-600">Your application will be sent directly to our hiring team at vislybluq5@gmail.com. We'll review your details and reach out within 3-5 business days.</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSending}
                                className={`w-full bg-visly-navy text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center transform hover:scale-[1.02] shadow-xl ${isSending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-visly-blue'}`}
                            >
                                {isSending ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Submit Application
                                        <Send className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Apply;
