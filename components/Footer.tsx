import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../constants';
import { Mail, MessageSquare } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaTiktok, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter subscription:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const JalaLogoFooter = () => (
    <div>
      <img src="/logo2.png" alt="JALA Educators" className="h-16 w-auto mb-3" />
      <p className="mt-2 text-slate-400">Transforming Minds, Shaping Destinies.</p>
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
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">Menu</h3>
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
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">Contact</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start">
                <span style={{ marginTop: '4px' }}>
                <FaPhoneAlt size={18} color="var(--secondary)"/>
                </span>
                <a href="tel:0712568957" className="ml-3 hover:text-white">
                  0712568957
                </a>
              </li>
              <li className="flex items-start">
                <span style={{ marginTop: '4px' }}>
                <FaWhatsapp size={18} color="var(--secondary)" /></span>
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
                <span style={{ marginTop: '4px' }}>
                <FaEnvelope size={18} color="var(--secondary)"/></span>
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
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">Follow Us</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://facebook.com/profile.php?id=100064536530727"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors duration-300"
              >
                <span className="mr-3"><FaFacebookF size={18} color="var(--secondary)" /></span>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/jalaeducators"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors duration-300"
              >
                <span className="mr-3"><FaInstagram size={18} color="var(--secondary)" /></span>
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/jalaeducators"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors duration-300"
              >
                <span className="mr-3"><FaLinkedinIn size={18} color="var(--secondary)" /></span>
                LinkedIn
              </a>
              <a
                href="https://www.tiktok.com/@jala.educators"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-400 hover:text-white transition-colors duration-300"
              >
                <span className="mr-3"><FaTiktok size={18} color="var(--secondary)" /></span>
                TikTok
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">
              Newsletter
            </h3>
            <p className="text-slate-400 mb-4 text-sm">Get updates on programs.</p>
            {subscribed ? (
              <p className="text-secondary font-semibold">Thank you!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="px-3 py-2 bg-slate-800 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors duration-300 font-semibold text-sm"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 border-t border-slate-700 pt-8 text-center text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} JALA Educators. All Rights Reserved. A brighter
            future, together.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
