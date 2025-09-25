
import React, { useState } from 'react';
import { PROGRAMS_DATA } from '../constants';
import Button from '../components/Button';
import { ChevronDown, GraduationCap, Cpu, Users } from 'lucide-react';

interface ProgramsProps {
  onBookNowClick: () => void;
}

const programIcons: { [key: string]: React.ReactElement } = {
    "Education & Mentorship": <GraduationCap size={28} />,
    "Innovation, Entrepreneurship & Digital Skills": <Cpu size={28} />,
    "Leadership, SDGs & Community Impact": <Users size={28} />,
};

const AccordionItem: React.FC<{ program: typeof PROGRAMS_DATA[0], isOpen: boolean, onClick: () => void }> = ({ program, isOpen, onClick }) => {
    return (
        <div className="bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl mb-6 border border-border">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left p-6 hover:bg-subtle focus:outline-none focus-visible:bg-subtle focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <div className="bg-primary/10 text-primary p-4 rounded-full mr-5">
                        {programIcons[program.title]}
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">{program.title}</h3>
                        <p className="text-primary font-semibold mt-1">{program.description}</p>
                    </div>
                </div>
                <ChevronDown className={`transform transition-transform duration-300 text-muted ${isOpen ? 'rotate-180 text-primary' : ''}`} size={28} />
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="px-8 pb-8 pt-2 pl-24">
                        <ul className="list-disc list-inside space-y-3 text-muted text-base">
                            {program.items.map((item, index) => <li key={index} className="pl-2">{item}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Programs: React.FC<ProgramsProps> = ({ onBookNowClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const handleAccordionClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-background animate-fade-in">
      {/* Page Header */}
      <header className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white px-4 overflow-hidden">
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto-format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold">Our Programs</h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
                Tailored programs designed to build knowledge, skills, and character for a brighter future.
            </p>
        </div>
      </header>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Featured Program */}
        <section className="mb-20 bg-primary/5 p-8 rounded-lg border-l-4 border-primary">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="md:w-3/4">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Ready to Get Started?</h2>
                    <p className="text-muted">
                        Our Holiday Tuition programs are open for booking! We offer intensive, personalized experiences to help students excel and build a strong foundation for their future.
                    </p>
                </div>
                <div className="md:w-1/4 flex justify-start md:justify-end">
                    <Button onClick={onBookNowClick} variant="primary" size="md" className="w-full md:w-auto">
                        Book Your Spot
                    </Button>
                </div>
            </div>
        </section>

        {/* Programs Accordion */}
        <section>
             <h2 className="text-3xl font-bold text-center mb-10">Our Three Pillars of Empowerment</h2>
             <div className="max-w-4xl mx-auto">
                {PROGRAMS_DATA.map((program, index) => (
                    <AccordionItem 
                        key={index}
                        program={program}
                        isOpen={openIndex === index}
                        onClick={() => handleAccordionClick(index)}
                    />
                ))}
             </div>
        </section>
      </div>
    </div>
  );
};

export default Programs;
