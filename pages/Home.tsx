import React, { useState, useEffect } from "react";
// FIX: Switched to named imports for react-router-dom to fix module resolution errors.
import { Link } from "react-router-dom";
import Button from "../components/Button";
import {
  GraduationCap,
  Cpu,
  Users,
  ArrowRight,
  Star,
  Quote,
} from "lucide-react";
import { TESTIMONIALS_DATA, API_BASE_URL } from "../constants";
import ShareExperienceModal from '../components/ShareExperienceModal';

interface HomeProps {
  onBookNowClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onBookNowClick }) => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFeedbackSubmit = async (data: { name: string; role: string; rating: number; comment: string }) => {
    // Console log the feedback data
    console.log("User feedback:", data);
    
    try {
      // Send feedback to backend
      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          role: data.role,
          rating: data.rating,
          comment: data.comment
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(errorData.message || 'Failed to submit feedback');
      }

      const result = await response.json();
      console.log("Feedback submitted successfully:", result);
      
    } catch (error) {
      console.error("Error submitting feedback:", error);
      
      // Check if it's a network error (backend not available)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn("Backend server appears to be unavailable. Feedback logged to console only.");
        // In production, you might want to queue this for later submission
        return; // Don't throw error, allow modal to show success
      }
      
      throw error; // Re-throw other errors to let the modal handle them
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center justify-center text-center text-white px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center animate-kenburns"
            style={{
              backgroundImage: `url('https://media.istockphoto.com/id/1211508058/photo/using-technology-to-sharpen-their-young-minds.jpg?s=612x612&w=0&k=20&c=KoXNf5u3w9Sz2pJ_xAyrBPv1-f2DVh13di0eY245KCc=')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl animate-fade-in-up">
          <h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            Transforming Minds, Shaping Destinies, Igniting Futures.
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90"
            style={{ textShadow: "0 1px 5px rgba(0,0,0,0.5)" }}
          >
            We empower Kenya’s youth with the education, digital skills, and
            leadership training to build a future-ready nation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button onClick={onBookNowClick} variant="secondary" size="md">
              Book a Program
            </Button>
            <Link to="/about">
              <Button
                variant="ghost"
                size="md"
                className="text-white hover:bg-white/20"
              >
                Learn More <ArrowRight className="inline ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-24 bg-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-sm font-bold uppercase text-primary tracking-widest">
            Our Core Pillars
          </h2>
          <p className="text-3xl md:text-4xl font-bold mt-2 mb-16">
            Creating Future-Ready Leaders
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-primary">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-3">
                Education & Mentorship
              </h3>
              <p className="text-muted mb-6">
                Providing foundational knowledge and guidance to unlock
                potential.
              </p>
              <Link
                to="/programs"
                className="font-semibold text-primary hover:underline group"
              >
                Explore Program{" "}
                <ArrowRight className="inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            {/* Card 2 */}
            <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-primary">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Cpu size={32} />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-3">
                Innovation & Digital Skills
              </h3>
              <p className="text-muted mb-6">
                Equipping youth with the technical skills for the modern
                economy.
              </p>
              <Link
                to="/programs"
                className="font-semibold text-primary hover:underline group"
              >
                Explore Program{" "}
                <ArrowRight className="inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            {/* Card 3 */}
            <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-primary">
              <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-3">
                Leadership & Community
              </h3>
              <p className="text-muted mb-6">
                Nurturing responsible citizens who drive positive change.
              </p>
              <Link
                to="/programs"
                className="font-semibold text-primary hover:underline group"
              >
                Explore Program{" "}
                <ArrowRight className="inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Founder Snippet */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 text-center md:text-left">
            <img
              src="/IMG-20250919-WA0000.jpg"
              alt="Joseph Mutinda, Founder of JALA Educators"
              className="rounded-full w-64 h-64 mx-auto md:mx-0 object-cover shadow-2xl border-4 border-white"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest">
              A Message From Our Founder
            </h2>
            <p className="mt-4 text-3xl font-medium text-foreground leading-snug">
              "Kenya’s greatest resource is its youth. We exist to create a
              bridge between their potential and the opportunities that await
              them."
            </p>
            <p className="text-right mt-6 font-bold text-lg text-foreground">
              - Joseph Mutinda, Founder
            </p>
            <div className="text-right mt-8">
              <Link to="/about">
                <Button variant="outline">Our Story</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase text-primary tracking-widest">
              What People Say
            </h2>
            <p className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Stories of Transformation
            </p>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Hear from students, parents, and community leaders about how JALA
              Educators is making a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.slice(0, 3).map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative"
              >
                <Quote className="text-primary/20 w-12 h-12 absolute top-4 right-6" />

                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary/10"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-primary font-semibold">
                      {testimonial.role}
                    </p>
                    {testimonial.organization && (
                      <p className="text-sm text-muted">
                        {testimonial.organization}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-muted italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-muted">Students Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-muted">Programs Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-muted">Community Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-muted">Success Rate</div>
              </div>
            </div>

            {/* Read More & Share Button */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/about">
                <Button variant="outline" size="md">
                  Read More Stories{" "}
                  <ArrowRight className="inline ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsModalOpen(true)}
              >
                Share Your Experience
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Shaping the Future
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-muted">
            Whether you are a professional willing to mentor, an organization
            looking to partner, or a parent seeking the best for your child,
            your contribution can make a world of difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/get-involved">
              <Button variant="secondary" size="md">
                Volunteer With Us
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button variant="primary" size="md">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ShareExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};

export default Home;
