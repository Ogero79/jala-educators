
import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Users, HeartHandshake, DollarSign } from 'lucide-react';

const GetInvolved: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', interest: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Volunteer form submitted:', formState);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-background animate-fade-in">
      {/* Page Header */}
      <header className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white px-4 overflow-hidden">
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold">Get Involved</h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
                There are many ways to help shape the future of Kenya's youth. Join us.
            </p>
        </div>
      </header>
      
      {/* Ways to Contribute */}
      <section className="py-24 bg-subtle">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest">Join Our Mission</h2>
            <p className="text-3xl md:text-4xl font-bold mt-2 mb-12">Ways to Contribute</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-card p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <Users size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Volunteer</h3>
                    <p className="text-muted">Lend your time and skills to mentor, teach, or support our events. Your expertise can inspire the next generation.</p>
                </div>
                <div className="bg-card p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <HeartHandshake size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Partner</h3>
                    <p className="text-muted">Collaborate with us to create impactful programs. We welcome corporate partnerships to expand our reach and resources.</p>
                </div>
                <div className="bg-card p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <DollarSign size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Donate</h3>
                    <p className="text-muted">Your financial support helps us provide scholarships, acquire materials, and sustain our operations.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-primary mb-6">Become a Volunteer</h2>
            <p className="text-muted mb-8">Ready to make a direct impact? Fill out the form below to express your interest, and our team will get in touch with you shortly.</p>
            <div className="bg-card p-8 rounded-lg shadow-xl border border-border">
              {isSubmitted ? (
                  <div className="text-center p-8">
                      <h3 className="text-xl font-bold text-primary mb-2">Thank you!</h3>
                      <p className="text-muted">We've received your interest form and will be in touch soon.</p>
                  </div>
              ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</label>
                      <input type="text" name="name" id="name" value={formState.name} onChange={handleFormChange} required className="mt-1 block w-full px-4 py-3 bg-subtle border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground">Email Address</label>
                      <input type="email" name="email" id="email" value={formState.email} onChange={handleFormChange} required className="mt-1 block w-full px-4 py-3 bg-subtle border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-foreground">Area of Interest</label>
                      <select name="interest" id="interest" value={formState.interest} onChange={handleFormChange} required className="mt-1 block w-full pl-3 pr-10 py-3 bg-subtle border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-md">
                        <option value="" disabled>Select an area</option>
                        <option>Mentoring</option>
                        <option>Teaching & Tutoring</option>
                        <option>Event Support</option>
                        <option>Digital Skills Training</option>
                        <option>General Support</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-secondary text-secondary-foreground font-bold py-3 px-4 rounded-lg hover:bg-secondary/90 transition-colors duration-300 shadow-lg hover:shadow-xl">Submit Interest</button>
                  </form>
              )}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img src="https://images.unsplash.com/photo-1593113630424-d8847a26acb6?q=80&w=2070&auto-format&fit=crop" alt="Volunteers working with community" className="rounded-xl shadow-2xl object-cover w-full" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-10">Contact Us Directly</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <a href="tel:0712568957" className="flex items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Phone className="text-primary h-8 w-8" />
              <span className="ml-4 text-lg text-foreground font-medium">Call JALA</span>
            </a>
              <a href="https://wa.me/254712568957" target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <MessageSquare className="text-primary h-8 w-8" />
              <span className="ml-4 text-lg text-foreground font-medium">WhatsApp JALA</span>
            </a>
              <a href="mailto:jalaglobal1@gmail.com" className="flex items-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Mail className="text-primary h-8 w-8" />
              <span className="ml-4 text-lg text-foreground font-medium">Email JALA</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
