import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NAVIGATION_LINKS } from "../constants";
import { Mail, MessageSquare } from "lucide-react";
import { API_BASE_URL } from "../constants";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

      const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);

    if (!email.trim()) {
      setValidationError("Email address is required.");
      return;
    }

    if (!isValidEmail(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(errorData.message || 'Failed to subscribe. Please try again.');
      }

      const result = await response.json();
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 8000);
    } catch (err: any) {
      if (err.message.includes('fetch') || err.name === 'TypeError') {
        setError("Unable to connect to server. Please try again later.");
      } else {
        setError(err.message || "Failed to subscribe. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const JalaLogoFooter = () => (
    <div>
      <img src="/logo2.png" alt="JALA Educators" className="h-16 w-auto mb-3" />
      <p className="mt-2 text-slate-400">
        Transforming Minds, Shaping Destinies.
      </p>
    </div>
  );

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="lg:col-span-1">
            <JalaLogoFooter />
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">
              Menu
            </h3>
            <ul className="space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start">
                <span style={{ marginTop: "4px" }}>
                  <FaPhoneAlt size={18} color="var(--secondary)" />
                </span>
                <a href="tel:0712568957" className="ml-3 hover:text-white">
                  0712568957
                </a>
              </li>
              <li className="flex items-start">
                <span style={{ marginTop: "4px" }}>
                  <FaWhatsapp size={18} color="var(--secondary)" />
                </span>
                <a
                  href="https://wa.me/254712568957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start">
                <span style={{ marginTop: "4px" }}>
                  <FaEnvelope size={18} color="var(--secondary)" />
                </span>
                <a
                  href="mailto:jalaglobal1@gmail.com"
                  className="ml-3 hover:text-white break-all"
                >
                  jalaglobal1@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://facebook.com/profile.php?id=100064536530727"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors duration-300"
              >
                <span className="mr-3">
                  <FaFacebookF size={18} color="var(--secondary)" />
                </span>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/jalaeducators?utm_source=qr&igsh=YXBoMmw5aXRqMDQ1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors duration-300"
              >
                <span className="mr-3">
                  <FaInstagram size={18} color="var(--secondary)" />
                </span>
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/joseph-mutinda-461303217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors duration-300"
              >
                <span className="mr-3">
                  <FaLinkedinIn size={18} color="var(--secondary)" />
                </span>
                LinkedIn
              </a>
              <a
                href="https://www.tiktok.com/@jala.educators?_t=ZM-901JtQa9oPz&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors duration-300"
              >
                <span className="mr-3">
                  <FaTiktok size={18} color="var(--secondary)" />
                </span>
                TikTok
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">
              Newsletter
            </h3>
            <p className="text-slate-400 mb-4 text-sm">
              Get updates on programs.
            </p>
            {subscribed ? (
              <div className="bg-green-900/30 border border-green-600 rounded-md p-3">
                <p className="text-green-400 font-semibold text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Successfully subscribed!
                </p>
                <p className="text-green-300 text-xs mt-1">
                  Check your email for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      // Clear validation error when user starts typing
                      if (validationError) setValidationError(null);
                      if (error) setError(null);
                    }}
                    placeholder="your@email.com"
                    className={`px-3 py-2 bg-slate-800 text-white border rounded-md focus:outline-none focus:ring-2 text-sm transition-colors ${
                      validationError || error 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-slate-600 focus:ring-secondary'
                    }`}
                    disabled={isLoading}
                    required
                  />
                  
                  {/* Validation Error */}
                  {validationError && (
                    <p className="text-red-400 text-xs">{validationError}</p>
                  )}
                  
                  {/* API Error */}
                  {error && (
                    <p className="text-red-400 text-xs">{error}</p>
                  )}
                  
                  <button
                    type="submit"
                    className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors duration-300 font-semibold text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={isLoading || !email.trim()}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 border-t border-slate-700 pt-8 text-center text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} JALA Educators. All Rights
            Reserved. A brighter future, together.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
