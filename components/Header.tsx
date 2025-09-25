
import React, { useState } from 'react';
// FIX: Use namespace import for react-router-dom to fix module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { NAVIGATION_LINKS } from '../constants';
import Button from './Button';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const JalaLogo = () => (
    <div className="flex items-center">
        <img src="/logo2.png" alt="JALA Educators" className="h-16 sm:h-20 lg:h-24 w-auto transition-all duration-300" />
    </div>
);


interface HeaderProps {
    onBookNowClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBookNowClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = "relative text-gray-800 hover:text-gray-900 transition-colors duration-300 py-2 group text-base font-medium drop-shadow-sm";
    const activeNavLinkClasses = "text-primary !font-semibold";
    
    const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 bg-white/20 backdrop-blur-md shadow-sm`;


    return (
        <header className={headerClasses}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    <div className="flex-shrink-0">
                        <ReactRouterDOM.Link to="/" aria-label="JALA Educators Home">
                            <JalaLogo />
                        </ReactRouterDOM.Link>
                    </div>
                    <nav className="hidden md:flex md:items-center md:space-x-10">
                        {NAVIGATION_LINKS.map((link) => (
                            <ReactRouterDOM.NavLink
                                key={link.label}
                                to={link.path}
                                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                            >
                                {link.label}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100`} />
                            </ReactRouterDOM.NavLink>
                        ))}
                    </nav>
                    <div className="hidden md:block">
                        <Button onClick={onBookNowClick} variant="primary" size="sm">
                            Book Now
                        </Button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-800 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg" id="mobile-menu">
                    <div className="px-6 pt-6 pb-8 space-y-6">
                        {/* Navigation Links */}
                        <div className="space-y-2">
                            {NAVIGATION_LINKS.map((link) => (
                                <ReactRouterDOM.NavLink
                                    key={link.label}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) => `block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                                >
                                    {link.label}
                                </ReactRouterDOM.NavLink>
                            ))}
                        </div>

                        {/* Book Now Button */}
                        <div className="pt-4 border-t border-gray-200">
                            <Button onClick={() => { onBookNowClick(); setIsMenuOpen(false); }} variant="primary" className="w-full py-3 text-lg font-semibold shadow-lg">
                                Book Now
                            </Button>
                        </div>

                        {/* Social Media Icons */}
                        <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Follow Us</h4>
                            <div className="flex justify-center space-x-6">
                                <a href="https://facebook.com/jalaeducators" target="_blank" rel="noopener noreferrer" 
                                   className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                                    <Facebook size={20} className="text-primary" />
                                </a>
                                <a href="https://twitter.com/jalaeducators" target="_blank" rel="noopener noreferrer" 
                                   className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                                    <Twitter size={20} className="text-primary" />
                                </a>
                                <a href="https://instagram.com/jalaeducators" target="_blank" rel="noopener noreferrer" 
                                   className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                                    <Instagram size={20} className="text-primary" />
                                </a>
                                <a href="https://linkedin.com/company/jalaeducators" target="_blank" rel="noopener noreferrer" 
                                   className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300">
                                    <Linkedin size={20} className="text-primary" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
