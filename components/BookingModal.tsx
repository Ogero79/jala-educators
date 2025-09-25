import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    studentName: '',
    studentGrade: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        onClose();
       }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
        // Reset form state after closing animation
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            parentName: '',
            parentPhone: '',
            parentEmail: '',
            studentName: '',
            studentGrade: '',
          });
        }, 300);
    }
  }, [isOpen]);
  
  const modalClass = isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none';
  const contentClass = isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    setIsSubmitted(true);
  };

  const inputClasses = "w-full px-4 py-3 bg-subtle border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow";

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${modalClass}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div 
        className={`bg-card rounded-xl shadow-2xl p-8 w-full max-w-lg relative transform transition-all duration-300 ${contentClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors" aria-label="Close modal">
          <X size={24} />
        </button>
        
        {isSubmitted ? (
            <div className="text-center py-10 animate-fade-in">
                <h2 id="booking-modal-title" className="text-3xl font-bold text-primary mb-4">Booking Received!</h2>
                <p className="text-muted text-lg">Thank you! We've received your booking and will be in touch shortly to confirm all the details.</p>
                <button onClick={onClose} className="mt-8 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Close
                </button>
            </div>
        ) : (
            <>
                <div className="text-center">
                    <h2 id="booking-modal-title" className="text-3xl font-bold mb-2">Book a Program</h2>
                    <p className="text-muted mb-8">Fill out the form below to get started on this exciting journey.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="parentName" className="block text-sm font-medium text-foreground mb-1">Parent's Name</label>
                    <input type="text" name="parentName" id="parentName" value={formData.parentName} onChange={handleChange} className={inputClasses} required />
                  </div>
                   <div>
                    <label htmlFor="parentPhone" className="block text-sm font-medium text-foreground mb-1">Parent's Phone</label>
                    <input type="tel" name="parentPhone" id="parentPhone" value={formData.parentPhone} onChange={handleChange} className={inputClasses} required />
                  </div>
                  <div>
                    <label htmlFor="parentEmail" className="block text-sm font-medium text-foreground mb-1">Parent's Email</label>
                    <input type="email" name="parentEmail" id="parentEmail" value={formData.parentEmail} onChange={handleChange} className={inputClasses} required />
                  </div>
                  <hr className="border-border my-4"/>
                  <div>
                    <label htmlFor="studentName" className="block text-sm font-medium text-foreground mb-1">Student's Name</label>
                    <input type="text" name="studentName" id="studentName" value={formData.studentName} onChange={handleChange} className={inputClasses} required />
                  </div>
                  <div>
                    <label htmlFor="studentGrade" className="block text-sm font-medium text-foreground mb-1">Student's Grade / Form</label>
                    <input type="text" name="studentGrade" id="studentGrade" value={formData.studentGrade} onChange={handleChange} className={inputClasses} required />
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl">Submit Booking</button>
                  </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;