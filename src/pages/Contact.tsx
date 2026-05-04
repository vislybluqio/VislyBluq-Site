import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Users, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Using FormSubmit.co for direct email delivery (No API key needed)
      const response = await fetch("https://formsubmit.co/ajax/vislybluq5@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _subject: `New VislyBluq Contact: ${formData.name}`,
          _template: "table" // Elegant email table format
        }),
      });

      if (response.ok) {
        // Clear all fields IMMEDIATELY
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        });

        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong. Please check your connection or email vislybluq5@gmail.com directly.");
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-visly-blue" />,
      title: "Email Us",
      details: "vislybluq5@gmail.com",
      description: "Get in touch for project inquiries"
    },
    {
      icon: <Phone className="h-6 w-6 text-visly-blue" />,
      title: "Call Us",
      details: "+234 (0) 800 VISLY",
      description: "Mon-Fri 9AM-6PM WAT"
    },
    {
      icon: <MapPin className="h-6 w-6 text-visly-blue" />,
      title: "Visit Us",
      details: "11 apaola street, ketu ikosi, lagos, nigeria",
      description: "Our headquarters"
    }
  ];

  const features = [
    {
      icon: <Clock className="h-8 w-8 text-visly-blue" />,
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours"
    },
    {
      icon: <Users className="h-8 w-8 text-visly-blue" />,
      title: "Expert Team",
      description: "Work directly with our senior technology consultants"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-visly-blue" />,
      title: "Expert Consultation",
      description: "Get expert advice to grow your business"
    }
  ];

  return (
    <div className="pt-16 bg-white">
      {/* Hero Section */}
      <section className="bg-visly-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-visly-navy opacity-50 transform skew-x-12 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-visly-blue opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Let's Build Something <span className="text-visly-cyan">Amazing</span> Together
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Ready to grow your business with thoughtful technology? Our experts are here to help you
              design and implement solutions that drive sustainable results.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-black text-visly-dark mb-6">
                Get Started Today
              </h2>
              <p className="text-gray-600 mb-8 font-medium">
                Fill out the form below and we'll get back to you within 24 hours with a
                customized proposal for your project.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-visly-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue bg-visly-gray transition-all placeholder-gray-400 text-visly-dark"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-visly-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue bg-visly-gray transition-all placeholder-gray-400 text-visly-dark"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-bold text-visly-dark mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue bg-visly-gray transition-all placeholder-gray-400 text-visly-dark"
                      placeholder="Company Ltd."
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-visly-dark mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue bg-visly-gray transition-all placeholder-gray-400 text-visly-dark"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-bold text-visly-dark mb-2">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue bg-visly-gray transition-all text-visly-dark font-semibold"
                  >
                    <option value="">Select a service</option>
                    <option value="digital-product">Web & Mobile Development</option>
                    <option value="data-strategy">Data Strategy & Architecture</option>
                    <option value="ml-ai">Machine Learning & AI</option>
                    <option value="business-intelligence">Business Intelligence</option>
                    <option value="data-engineering">Data Engineering</option>
                    <option value="consultation">General Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-visly-dark mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-visly-blue focus:border-visly-blue bg-visly-gray transition-all placeholder-gray-400 text-visly-dark resize-none"
                  />
                </div>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center animate-bounce">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Thank you! Your message has been sent successfully. We'll be in touch soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full bg-visly-navy text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 inline-flex items-center justify-center transform hover:scale-[1.02] shadow-lg ${isSending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-visly-blue'}`}
                >
                  {isSending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-visly-dark mb-6">
                Get In Touch
              </h2>
              <p className="text-gray-600 mb-8 font-medium">
                We're here to help you succeed. Reach out through any of these channels
                and we'll respond promptly.
              </p>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 group p-4 rounded-2xl hover:bg-visly-gray transition-colors border border-transparent hover:border-gray-100">
                    <div className="p-3 bg-white shadow-md rounded-xl group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-visly-dark">{info.title}</h3>
                      <p className="text-visly-blue font-semibold mb-1">{info.details}</p>
                      <p className="text-gray-500 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-visly-navy to-visly-blue rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-6">Why Choose Us?</h3>
                  <div className="space-y-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-1 bg-white/10 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-visly-cyan" />
                        </div>
                        <div>
                          <h4 className="font-bold mb-1">{feature.title}</h4>
                          <p className="text-white/80 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-visly-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-visly-dark mb-4">
              Visit Our Office
            </h2>
            <p className="text-gray-600 font-medium">
              Located in Lagos, Nigeria
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-2 border border-gray-100">
            <div className="aspect-w-16 aspect-h-9 bg-visly-gray rounded-2xl flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MapPin className="h-10 w-10 text-visly-blue block" />
                </div>
                <h3 className="text-2xl font-bold text-visly-dark mb-2">
                  11 apaola street, ketu ikosi, lagos, nigeria
                </h3>
                <p className="text-gray-600 text-lg">Lagos, Nigeria</p>
                <div className="mt-8">
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center text-visly-blue font-bold hover:text-visly-navy transition-colors">
                    View on Google Maps <Send className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;