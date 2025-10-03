import React from 'react';
import type { NavLink, Value, Program, Testimonial } from './types';
import { Lightbulb, ShieldCheck, Users, HeartHandshake, Leaf } from 'lucide-react';

// API Configuration - Environment-based URL
export const API_BASE_URL = 'https://jala-backend-production.up.railway.app'

export const NAVIGATION_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Programs', path: '/programs' },
  { label: 'Get Involved', path: '/get-involved' },
];

export const CORE_VALUES: Value[] = [
    {
        icon: React.createElement(Lightbulb, { className: "w-8 h-8 text-primary" }),
        title: "Innovation",
        description: "Fostering creativity and embracing technology to solve challenges."
    },
    {
        icon: React.createElement(ShieldCheck, { className: "w-8 h-8 text-primary" }),
        title: "Integrity",
        description: "Upholding the highest standards of honesty and ethical behavior."
    },
    {
        icon: React.createElement(Users, { className: "w-8 h-8 text-primary" }),
        title: "Collaboration",
        description: "Working with partners and communities to achieve shared goals."
    },
    {
        icon: React.createElement(HeartHandshake, { className: "w-8 h-8 text-primary" }),
        title: "Inclusion",
        description: "Ensuring equitable access to opportunities for all youth."
    },
    {
        icon: React.createElement(Leaf, { className: "w-8 h-8 text-primary" }),
        title: "Sustainability",
        description: "Creating lasting impact for generations to come."
    }
];

export const PROGRAMS_DATA: Program[] = [
    {
        title: "Education & Mentorship",
        description: "Knowledge for All",
        items: [
            "Holiday Tuition Programs (September - December)",
            "JALA Mentorship Program (Connecting youth with industry professionals)",
            "Reading & Research Clubs (Fostering a culture of lifelong learning)",
            "Career Guidance & University Placement Support",
        ],
    },
    {
        title: "Innovation, Entrepreneurship & Digital Skills",
        description: "Skills for the Future",
        items: [
            "Innovation & Entrepreneurship Hub (From idea to enterprise)",
            "Digital Skills & Tech Program (Coding, Digital Marketing, Graphic Design)",
            "STEM & Robotics Innovation Club",
            "Financial Literacy & Management Workshops",
        ],
    },
    {
        title: "Leadership, SDGs & Community Impact",
        description: "Values for Change",
        items: [
            "Leadership & Public Speaking Academy",
            "JALA SDG Initiative (Aligning projects with Sustainable Development Goals)",
            "Community Service & Volunteerism Projects",
            "Environmental Conservation & Climate Action Programs",
        ],
    }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
    {
        id: 1,
        name: "Brian Ogero",
        role: "Software Developer",
        organization: "Safaricom PLC",
        image: "data:image/jpeg;base64,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",
        quote: "JALA Educators transformed my life. From a village boy with big dreams to a software developer at Safaricom. The mentorship program connected me with industry professionals who guided my career path.",
        rating: 5
    },
    {
        id: 2,
        name: "David Kiprotich",
        role: "University Student",
        organization: "University of Nairobi",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&auto=format&fit=crop&crop=face",
        quote: "The digital skills program at JALA gave me the foundation I needed. I learned coding, digital marketing, and entrepreneurship. Now I'm pursuing Computer Science and already running my own tech startup.",
        rating: 5
    },
    {
        id: 3,
        name: "Mary Achieng",
        role: "Community Leader",
        organization: "Kibera Youth Initiative",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop&crop=face",
        quote: "Through JALA's leadership program, I discovered my passion for community service. Today, I lead a youth initiative that has impacted over 500 young people in Kibera. JALA showed me that leadership starts with believing in yourself.",
        rating: 5
    },
    {
        id: 4,
        name: "James Mwangi",
        role: "Mentor & Parent",
        organization: "Kenya Commercial Bank",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop&crop=face",
        quote: "As a parent and professional mentor with JALA, I've witnessed the incredible transformation in young people. The program doesn't just teach skills; it builds character and confidence.",
        rating: 5
    },
    {
        id: 5,
        name: "Faith Njeri",
        role: "High School Graduate",
        organization: "Alliance Girls High School",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&h=250&auto=format&fit=crop&crop=face",
        quote: "JALA's holiday tuition program helped me excel in my KCSE exams. The personalized attention and innovative teaching methods made complex subjects easy to understand. I'm now headed to university!",
        rating: 5
    }
];