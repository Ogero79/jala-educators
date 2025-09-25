import React from 'react';
import type { NavLink, Value, Program } from './types';
import { Lightbulb, ShieldCheck, Users, HeartHandshake, Leaf } from 'lucide-react';

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