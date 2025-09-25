import React from 'react';
import { CORE_VALUES } from '../constants';
import { Target, Eye, BarChart, TrendingUp, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    // Using a subtle off-white for the entire page background
    <div className="bg-slate-50 animate-fade-in">
      {/* Page Header */}
      <header className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white px-4 overflow-hidden">
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto-format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">About JALA Educators</h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
                Discover the passion, purpose, and people behind our mission to empower Kenya's youth.
            </p>
        </div>
      </header>

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest">Our Journey</h2>
            <p className="text-3xl font-bold text-foreground mt-2 mb-6">From a Simple Idea to a National Movement</p>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>JALA Educators was founded on a simple yet powerful belief: every young person in Kenya, regardless of their background, deserves the opportunity to build a successful and fulfilling future. Our journey began by recognizing a critical gap between traditional education and the practical skills needed to thrive in the 21st-century global economy.</p>
              <p>From humble beginnings running small-group tutoring sessions, we have grown into a comprehensive empowerment hub. We are driven by the stories of the thousands of students who will pass through our programs, emerging with newfound confidence, critical skills, and a clear vision for their future and their communities.</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" alt="Students collaborating" className="rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Mission & Vision - Grey background removed */}
      <section className="py-24 border-t border-slate-200">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-stretch">
          <div className="bg-white p-10 rounded-xl shadow-lg border-l-4 border-primary">
            <div className="flex items-center mb-4">
              <Target size={40} className="text-primary" />
              <h2 className="text-3xl font-bold text-foreground ml-4">Our Mission</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">To empower Kenya’s youth with transformative education, essential digital and leadership skills, and mentorship to create a future-ready, innovative, and impactful generation.</p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg border-l-4 border-secondary">
             <div className="flex items-center mb-4">
               <Eye size={40} className="text-secondary" />
               <h2 className="text-3xl font-bold text-foreground ml-4">Our Vision</h2>
             </div>
            <p className="text-lg text-slate-600 leading-relaxed">A Kenya where every young person has the skills, confidence, and opportunity to achieve their full potential and contribute to a prosperous and sustainable nation.</p>
          </div>
        </div>
      </section>
      
      {/* The Three Pillars Section */}
      <section className="py-24 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest">Our Approach</h2>
            <p className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-16">The Three Pillars of JALA Educators</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="bg-primary/10 p-5 rounded-full mb-6 inline-block">
                        <BarChart className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Education & Mentorship</h3>
                    <p className="text-slate-500 text-sm">Providing tuition, mentorship, and scholarships to build strong academic and life skills.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="bg-primary/10 p-5 rounded-full mb-6 inline-block">
                        <TrendingUp className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Innovation & Digital Skills</h3>
                    <p className="text-slate-500 text-sm">Training in coding, robotics, digital media, and entrepreneurship to nurture startups.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="bg-primary/10 p-5 rounded-full mb-6 inline-block">
                        <Users className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">Leadership & Community Impact</h3>
                    <p className="text-slate-500 text-sm">Developing ethical leaders through civic engagement, SDG projects, and climate action.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* Core Values - Grey background removed */}
      <section className="py-24 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-sm font-bold uppercase text-primary tracking-widest">Our Guiding Principles</h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-16">The Values That Drive Us</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {CORE_VALUES.map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-5 rounded-full mb-4">
                    {React.cloneElement(value.icon, { className: "w-10 h-10 text-primary" })}
                </div>
                <h3 className="text-xl font-bold text-foreground mt-2 mb-2">{value.title}</h3>
                <p className="text-slate-500 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Meet Our Founder */}
      <section className="py-24 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Meet Our Founder</h2>
          <div className="flex flex-col md:flex-row items-center bg-white p-8 md:p-12 rounded-xl shadow-xl gap-12 max-w-5xl mx-auto">
            <div className="flex-shrink-0 text-center">
              <img src="/IMG-20250919-WA0000.jpg" alt="Joseph Mutinda" className="rounded-full w-48 h-48 mx-auto object-cover border-4 border-secondary" />
              <h3 className="text-2xl font-bold text-foreground mt-6 mb-1">Joseph Mutinda</h3>
              <p className="text-primary font-semibold text-lg">Author, Counselor & Educator</p>
            </div>
            <div className="space-y-4 text-slate-600 leading-relaxed border-t-2 md:border-t-0 md:border-l-2 border-slate-200 pt-8 md:pt-0 md:pl-12">
              <p>Joseph Mutinda is a passionate educator committed to transforming the future of Kenya’s youth. With a Bachelor of Education in Mathematics and Physics and certification as a Career Counselor, he blends teaching with career guidance to help learners discover their purpose.</p>
              <p>He serves as a teacher and Dean of Studies at Glory Girls High School, where he integrates technology and promotes holistic education. Joseph is also the author of <span className="font-semibold text-foreground">"Unveiling the Future,"</span> a motivational book that inspires young people to embrace vision, character, and leadership.</p>
              <p>Beyond the classroom, Joseph enjoys hiking, cultural travel, and coaching sports. His adventures are made possible through the generous sponsorship of <span className="font-semibold text-foreground">Inspire Spaces</span>, an NGO that supports young people in their educational journey.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;