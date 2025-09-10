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
            <span className="mr-2 text-3xl drop-shadow-lg">🌾</span>
            <span className="text-shadow-lg">Odia Agro Connect</span>
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
                href="#roles"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("roles");
                }}
                className="px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-200 hover:text-white hover:bg-white/20 backdrop-blur-sm drop-shadow-lg"
              >
                Roles
              </a>
            </li>
            <li>
              <a
                href="#market"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("market");
                }}
                className="px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-200 hover:text-white hover:bg-white/20 backdrop-blur-sm drop-shadow-lg"
              >
                Market
              </a>
            </li>
            <li>
              <a
                href="#hubs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("hubs");
                }}
                className="px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-200 hover:text-white hover:bg-white/20 backdrop-blur-sm drop-shadow-lg"
              >
                Hubs
              </a>
            </li>
            <li>
              <a
                href="#docs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("docs");
                }}
                className="px-4 py-2 rounded-lg text-white/90 font-medium transition-all duration-200 hover:text-white hover:bg-white/20 backdrop-blur-sm drop-shadow-lg"
              >
                Docs
              </a>
            </li>
          </ul>
          <button
            onClick={handleInstall}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2.5 rounded-lg backdrop-blur-sm border border-white/30 hover:border-white/40 transition-all duration-300 hover:transform hover:-translate-y-0.5 shadow-lg drop-shadow-lg"
          >
            ▶ Install
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero min-h-screen flex items-center px-5 py-20 relative overflow-hidden">
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
      <section id="features" className="py-20 bg-gray-50">
        <h2 className="text-4xl text-green-700 text-center mb-12 font-bold">
          Key Features
        </h2>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card bg-white p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl">
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
          <div className="feature-card bg-white p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl">
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
          <div className="feature-card bg-white p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl">
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
          <div className="feature-card bg-white p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl">
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
      <section id="workflow" className="py-20 bg-white">
        <h2 className="text-4xl text-green-700 text-center mb-12 font-bold">
          Workflow Overview
        </h2>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-10">
          <div className="workflow-card bg-gradient-to-br from-green-50 to-green-100 p-10 rounded-3xl relative overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-green-700/15">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-700 to-green-600"></div>
            <h3 className="text-green-700 mb-4 text-xl font-semibold">
              📈 Live GT Monitoring
            </h3>
            <div className="workflow-content text-gray-600">
              <p className="mb-4">
                Track gate terminal operations in real-time
              </p>
              <div className="chart-placeholder w-full h-24 bg-gradient-to-r from-green-200 via-green-300 to-green-200 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-[-100%] w-full h-0.5 bg-green-700 animate-wave"></div>
              </div>
              <p className="mb-4">
                <strong>Temp + 12°C</strong> | 🌾 In Quality
              </p>
              <button
                onClick={() => handleActionButton("Live GT Monitoring")}
                className="w-full bg-green-700 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 hover:bg-green-600 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-700/30"
              >
                Learn More →
              </button>
            </div>
          </div>

          <div className="workflow-card bg-gradient-to-br from-green-50 to-green-100 p-10 rounded-3xl relative overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-green-700/15">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-700 to-green-600"></div>
            <h3 className="text-green-700 mb-4 text-xl font-semibold">
              🛡️ ASI Spoilage
            </h3>
            <div className="workflow-content text-gray-600">
              <p className="mb-4">
                Protecting storage quality with advanced monitoring systems
              </p>
              <div className="text-center mb-4">
                <div className="inline-block bg-green-100 p-4 rounded-lg">
                  <div className="text-3xl text-green-700 mb-2">📊</div>
                  <div>
                    <span className="text-green-700 font-bold">Hold</span>
                    <br />
                    <span className="text-green-600">Sell</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleActionButton("ASI Spoilage")}
                className="w-full bg-green-600 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 hover:bg-green-500 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-600/30 mb-4"
              >
                Hold 3 May
              </button>
              <div className="profile-section flex items-center gap-4 p-4 bg-white/50 rounded-lg">
                <div className="profile-avatar w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="profile-info">
                  <h4 className="text-green-700 font-semibold m-0">
                    ସୁରେଶ କୁ.
                  </h4>
                  <p className="text-sm text-gray-600 m-0">Farmer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-card bg-gradient-to-br from-green-50 to-green-100 p-10 rounded-3xl relative overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-green-700/15">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-700 to-green-600"></div>
            <h3 className="text-green-700 mb-4 text-xl font-semibold">
              📋 QR Booking
            </h3>
            <div className="workflow-content text-gray-600">
              <p className="mb-4">Quick booking system with QR verification</p>
              <div className="qr-placeholder w-36 h-36 bg-gray-800 mx-auto mb-4 rounded-lg flex items-center justify-center text-white text-4xl relative overflow-hidden">
                <span className="text-base">QR</span>
                <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse"></div>
              </div>
              <div className="price-tag bg-green-700 text-white py-2 px-4 rounded-full font-bold inline-block mb-4">
                $154 Perishables
              </div>
              <button
                onClick={() => handleActionButton("QR Booking")}
                className="w-full bg-green-700 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 hover:bg-green-600 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-700/30"
              >
                View Tenders
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-5">
          <div className="quote text-2xl italic mb-8 relative px-12">
            <span className="absolute -top-5 left-0 text-5xl opacity-30">
              "
            </span>
            <span className="absolute -bottom-10 right-0 text-5xl opacity-30">
              "
            </span>
            Odia Agro Connect has transformed how we manage our produce and
            reach buyers.
          </div>
          <div className="author font-semibold text-xl">Suresh K.</div>
          <div className="author-role opacity-90 mt-2">Farmer</div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
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
              className={`faq-item bg-white mb-4 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg ${
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-4 gap-12">
          <div className="footer-section">
            <div className="flex items-center text-2xl font-bold mb-4">
              <span className="mr-2 text-3xl">🌾</span>
              Odia Agro Connect
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
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; 2024 Odia Agro Connect. All rights reserved. Made with ❤️ for
            Odisha's farmers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
