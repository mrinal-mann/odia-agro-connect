import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    // Header background change on scroll
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 100) {
          header.style.background = "rgba(255, 255, 255, 0.25)";
          header.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
          header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.4)";
        } else {
          header.style.background = "rgba(255, 255, 255, 0.2)";
          header.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
          header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.3)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRoleClick = (role: string) => {
    console.log(`Navigating to ${role} dashboard`);
    // Navigate to role selection or auth
    navigate("/auth");
  };

  const handleGetStarted = () => {
    console.log("Get Started clicked");
    navigate("/auth");
  };

  const handleInstall = () => {
    console.log("Install PWA");
    // Add PWA install logic here
  };

  const handleActionButton = (cardTitle: string) => {
    console.log(`Action button clicked in: ${cardTitle}`);
    // Add specific action logic here
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/20 backdrop-blur-lg border-b border-white/30 shadow-xl z-50 transition-all duration-300">
        <nav className="flex justify-between items-center px-5 py-4 max-w-7xl mx-auto">
          <div className="flex items-center text-2xl font-bold text-white drop-shadow-2xl">
            <span className="mr-2 text-3xl drop-shadow-lg">O</span>
            <span className="text-shadow-lg">fresh</span>
          </div>
          <ul className="hidden md:flex list-none gap-2">
            <li>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("features");
                }}
                className="px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-200 hover:text-white hover:bg-white/20 backdrop-blur-sm drop-shadow-lg"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#workflow"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("workflow");
                }}
                className="px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-200 hover:text-white hover:bg-white/20 backdrop-blur-sm drop-shadow-lg"
              >
                Workflows
              </a>
            </li>
            <li>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("faq");
                }}
                className="px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-200 hover:text-white hover:bg-white/20 backdrop-blur-sm drop-shadow-lg"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
                className="px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-200 hover:text-white hover:bg-white/20 backdrop-blur-sm drop-shadow-lg"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="hero min-h-screen flex items-center px-5 py-20 relative overflow-hidden"
        style={{
          backgroundImage: "url(/bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-content max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="hero-text animate-slide-in-left">
            <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight drop-shadow-lg">
              Complete Agricultural Supply Chain Digitization
            </h1>
            <p className="text-xl text-white/95 mb-10">
              Progressive web app for farmers, buyers and hubs
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-block bg-white text-green-700 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:transform hover:-translate-y-1 hover:shadow-xl hover:bg-green-50"
            >
              Get Started
            </button>
          </div>
          <div className="role-cards flex flex-col gap-6 animate-slide-in-right">
            <div
              onClick={() => handleRoleClick("FARMER")}
              className="role-card bg-white/95 p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 shadow-lg hover:transform hover:translate-x-2 hover:shadow-xl"
            >
              <div className="role-info flex items-center gap-6">
                <div className="role-icon w-12 h-12 bg-gradient-to-r from-green-700 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                  👨‍🌾
                </div>
                <h3 className="text-green-700 text-xl font-semibold">FARMER</h3>
              </div>
              <span className="text-green-700 text-2xl">→</span>
            </div>
            <div
              onClick={() => handleRoleClick("HUB")}
              className="role-card bg-white/95 p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 shadow-lg hover:transform hover:translate-x-2 hover:shadow-xl"
            >
              <div className="role-info flex items-center gap-6">
                <div className="role-icon w-12 h-12 bg-gradient-to-r from-green-700 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                  🏛️
                </div>
                <h3 className="text-green-700 text-xl font-semibold">HUB</h3>
              </div>
              <span className="text-green-700 text-2xl">→</span>
            </div>
            <div
              onClick={() => handleRoleClick("BUYER")}
              className="role-card bg-white/95 p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 shadow-lg hover:transform hover:translate-x-2 hover:shadow-xl"
            >
              <div className="role-info flex items-center gap-6">
                <div className="role-icon w-12 h-12 bg-gradient-to-r from-green-700 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                  🛒
                </div>
                <h3 className="text-green-700 text-xl font-semibold">BUYER</h3>
              </div>
              <span className="text-green-700 text-2xl">→</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-green-50/80 to-green-100/60 backdrop-blur-sm"
      >
        <h2 className="text-4xl text-green-700 text-center mb-12 font-bold">
          Key Features
        </h2>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card bg-white/90 backdrop-blur-sm p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl border border-green-100/50">
            <div className="feature-icon w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
              👥
            </div>
            <h3 className="text-green-700 mb-2 text-xl font-semibold">
              Role-based Access
            </h3>
            <p className="text-gray-600 text-sm">
              Customized interfaces for farmers, buyers, and hub operators
            </p>
          </div>
          <div className="feature-card bg-white/90 backdrop-blur-sm p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl border border-green-100/50">
            <div className="feature-icon w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
              📊
            </div>
            <h3 className="text-green-700 mb-2 text-xl font-semibold">
              AI-powered Analytics
            </h3>
            <p className="text-gray-600 text-sm">
              Smart insights and predictions for better decision making
            </p>
          </div>
          <div className="feature-card bg-white/90 backdrop-blur-sm p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl border border-green-100/50">
            <div className="feature-icon w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
              🌡️
            </div>
            <h3 className="text-green-700 mb-2 text-xl font-semibold">
              IoT Integration
            </h3>
            <p className="text-gray-600 text-sm">
              Real-time monitoring of storage conditions and quality
            </p>
          </div>
          <div className="feature-card bg-white/90 backdrop-blur-sm p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl border border-green-100/50">
            <div className="feature-icon w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl">
              📱
            </div>
            <h3 className="text-green-700 mb-2 text-xl font-semibold">
              QR Code Bookings
            </h3>
            <p className="text-gray-600 text-sm">
              Quick and easy booking system with QR code verification
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section
        id="workflow"
        className="py-20 bg-gradient-to-b from-green-100/60 to-green-200/40 backdrop-blur-sm"
      >
        <h2 className="text-4xl text-green-700 text-center mb-12 font-bold">
          Workflow Overview
        </h2>
        <div className="max-w-7xl mx-auto px-5">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-auto">
            {/* Live GT Monitoring - Takes 2 columns */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">📈</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-700">
                    Live GT Monitoring
                  </h3>
                  <p className="text-gray-600">Real-time operations tracking</p>
                </div>
              </div>

              <div className="chart-placeholder w-full h-32 bg-gradient-to-r from-green-100 via-green-200 to-green-100 rounded-xl mb-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-[-100%] w-full h-1 bg-green-600 animate-wave shadow-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <span className="text-green-700 font-semibold">
                      Live Data Stream
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl">
                  <span className="text-2xl">🌡️</span>
                  <div>
                    <span className="text-green-700 font-bold text-lg">
                      +12°C
                    </span>
                    <p className="text-sm text-green-600">Temperature</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl">
                  <span className="text-2xl">🌾</span>
                  <div>
                    <span className="text-green-700 font-bold">Quality</span>
                    <p className="text-sm text-green-600">Excellent</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleActionButton("Live GT Monitoring")}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:transform hover:-translate-y-1 hover:shadow-lg"
              >
                View Dashboard →
              </button>
            </div>

            {/* ASI Spoilage Section - Takes 1 column but split into 2 separate grids */}
            <div className="space-y-6">
              {/* ASI Spoilage Control */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-lg">🛡️</span>
                  </div>
                  <h3 className="text-lg font-bold text-green-700">
                    ASI Spoilage
                  </h3>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  Advanced quality monitoring
                </p>

                <div className="text-center mb-4">
                  <div className="inline-block bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl">
                    <div className="text-2xl text-green-700 mb-2">📊</div>
                    <div className="space-y-1">
                      <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                        Hold
                      </div>
                      <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-sm">
                        Sell
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleActionButton("ASI Spoilage")}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Hold 3 May
                </button>
              </div>

              {/* Farmer Profile - Separate card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-sm">👤</span>
                  </div>
                  <h4 className="text-sm font-bold text-green-700">
                    Active Farmer
                  </h4>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shadow-sm">
                    S
                  </div>
                  <div>
                    <h4 className="text-green-700 font-semibold text-sm">
                      ସୁରେଶ କୁ.
                    </h4>
                    <p className="text-xs text-gray-600">Active Farmer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Booking - Takes 1 column */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-bold text-green-700">QR Booking</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Quick booking with instant QR verification
              </p>

              <div className="qr-placeholder w-28 h-28 bg-gradient-to-br from-gray-800 to-gray-900 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white shadow-lg relative overflow-hidden">
                <span className="text-lg font-bold">QR</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl text-center font-bold mb-6 shadow-md">
                $154 Perishables
              </div>

              <button
                onClick={() => handleActionButton("QR Booking")}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:transform hover:-translate-y-1 hover:shadow-lg"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-green-800/90 to-green-700/90 backdrop-blur-sm text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-green-800/20"></div>
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <div className="quote text-2xl italic mb-8 relative px-12">
            <span className="absolute -top-5 left-0 text-5xl opacity-30">
              "
            </span>
            <span className="absolute -bottom-10 right-0 text-5xl opacity-30">
              "
            </span>
            O-fresh has transformed how we manage our produce and reach buyers.
          </div>
          <div className="author font-semibold text-xl">Suresh K.</div>
          <div className="author-role opacity-90 mt-2">Farmer</div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-20 bg-gradient-to-b from-green-200/40 to-green-300/30 backdrop-blur-sm"
      >
        <h2 className="text-4xl text-green-700 text-center mb-12 font-bold">
          FAQ
        </h2>
        <div className="max-w-4xl mx-auto px-5">
          {[
            {
              question: "How do I get started?",
              answer:
                "Simply download our progressive web app, create your profile based on your role (Farmer, Hub, or Buyer), and start exploring the features designed for your needs.",
            },
            {
              question: "Is my data secure?",
              answer:
                "Yes, we use enterprise-grade encryption and security measures to protect all your data. Your information is stored securely and never shared without your consent.",
            },
            {
              question: "What languages are supported?",
              answer:
                "We support Odia, Hindi, and English to ensure accessibility for all users in the agricultural supply chain across Odisha and neighboring regions.",
            },
            {
              question: "How can I contact support?",
              answer:
                "You can reach our support team through the in-app chat, email us at support@odiaagroconnect.com, or call our helpline available 24/7.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className={`faq-item bg-white/90 backdrop-blur-sm mb-4 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg border border-green-100/50 ${
                activeFaq === index ? "active" : ""
              }`}
            >
              <div
                className="faq-question p-6 cursor-pointer flex justify-between items-center font-semibold text-gray-700 transition-all duration-300 hover:text-green-700 hover:bg-green-50"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span
                  className={`faq-arrow transition-transform duration-300 text-xl ${
                    activeFaq === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              <div
                className={`faq-answer overflow-hidden transition-all duration-300 ${
                  activeFaq === index ? "max-h-48 p-0 px-6 pb-6" : "max-h-0 p-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-green-900/95 to-green-950/95 backdrop-blur-sm text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-800/30 to-green-900/50"></div>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-4 gap-12 relative z-10">
          <div className="footer-section">
            <div className="flex items-center text-2xl font-bold mb-4">
              <span className="mr-2 text-3xl">🌾</span>
              O-fresh
            </div>
            <p>
              Revolutionizing agriculture through technology, connecting
              farmers, hubs, and buyers for a sustainable future.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="mb-4 text-green-400 text-lg font-semibold">
              Features
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Role-based Access
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  AI Analytics
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  IoT Integration
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  QR Bookings
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="mb-4 text-green-400 text-lg font-semibold">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="mb-4 text-green-400 text-lg font-semibold">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#help"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700/50 text-center text-green-200 relative z-10">
          <p>
            &copy; 2024 O-fresh. All rights reserved. Made with ❤️ for Odisha's
            farmers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
