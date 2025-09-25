

import React, { useState } from 'react';
// FIX: Switched to named imports for react-router-dom to fix module resolution errors.
import { Link } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../constants';
import { Mail, Phone, MessageSquare, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

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
          
          <div className="lg:col-span-1">
            <JalaLogoFooter />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">Menu</h3>
            <ul className="space-y-3">
              {NAVIGATION_LINKS.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-white transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">Contact</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start">
                <Phone size={18} className="text-secondary mt-1" />
                <a href="tel:0712568957" className="ml-3 hover:text-white">0712568957</a>
              </li>
               <li className="flex items-start">
                <MessageSquare size={18} className="text-secondary mt-1" />
                <a href="https://wa.me/254712568957" target="_blank" rel="noopener noreferrer" className="ml-3 hover:text-white">WhatsApp</a>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-secondary mt-1" />
                <a href="mailto:jalaglobal1@gmail.com" className="ml-3 hover:text-white break-all">jalaglobal1@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">Follow Us</h3>
            <div className="flex flex-col space-y-3">
              <a href="https://facebook.com/jalaeducators" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-white transition-colors duration-300">
                <Facebook size={18} className="text-secondary mr-3" />
                Facebook
              </a>
              <a href="https://twitter.com/jalaeducators" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-white transition-colors duration-300">
                <Twitter size={18} className="text-secondary mr-3" />
                Twitter
              </a>
              <a href="https://instagram.com/jalaeducators" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-white transition-colors duration-300">
                <Instagram size={18} className="text-secondary mr-3" />
                Instagram
              </a>
              <a href="https://linkedin.com/company/jalaeducators" target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-400 hover:text-white transition-colors duration-300">
                <Linkedin size={18} className="text-secondary mr-3" />
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wider uppercase">Newsletter</h3>
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
                        <button type="submit" className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md hover:bg-secondary/90 transition-colors duration-300 font-semibold text-sm">
                            Subscribe
                        </button>
                    </div>
                </form>
            )}
          </div>
        </div>

        <div className="mt-20 border-t border-slate-700 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} JALA Educators. All Rights Reserved. A brighter future, together.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;