import React from 'react';

export interface NavLink {
  label: string;
  path: string;
}

export interface Value {
  // FIX: Changed type from React.ReactNode to React.ReactElement for better type safety with React.cloneElement.
  // FIX: Specify props for React.ReactElement to allow cloning with className.
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
}

export interface Program {
  title: string;
  description: string;
  items: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization?: string;
  image: string;
  quote: string;
  rating: number;
}
