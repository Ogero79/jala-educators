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
  className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-out ${modalClass}`}
  onClick={onClose}
>
  <div 
    className={`bg-card rounded-2xl shadow-2xl p-8 w-full max-w-lg relative transform transition-all duration-300 ease-out ${contentClass} max-h-[90vh] overflow-y-auto`}
    onClick={(e) => e.stopPropagation()}
  >
    {/* Close button */}
    <button 
      onClick={onClose} 
      className="absolute top-4 right-4 text-muted hover:text-foreground hover:bg-muted/20 p-2 rounded-full transition-colors" 
      aria-label="Close modal"
    >
      <X size={22} />
    </button>

    {isSubmitted ? (
      <div className="text-center py-10 animate-fade-in">
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600">
          ✅
        </div>
        <h2 id="booking-modal-title" className="text-2xl font-bold text-primary mb-2">
          Booking Received!
        </h2>
        <p className="text-muted text-lg">
          Thank you! We’ll be in touch shortly to confirm your details.
        </p>
        <button 
          onClick={onClose} 
          className="mt-8 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
        >
          Close
        </button>
      </div>
    ) : (
      <>
        <div className="text-center mb-6">
          <h2 id="booking-modal-title" className="text-3xl font-bold mb-1">
            Book a Program
          </h2>
          <p className="text-muted">Fill out the form below to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Parent Section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Parent Information</h3>
            <div className="space-y-4">
              <input type="text" name="parentName" placeholder="Parent’s Name" value={formData.parentName} onChange={handleChange} className={inputClasses} required />
              <input type="tel" name="parentPhone" placeholder="Parent’s Phone" value={formData.parentPhone} onChange={handleChange} className={inputClasses} required />
              <input type="email" name="parentEmail" placeholder="Parent’s Email" value={formData.parentEmail} onChange={handleChange} className={inputClasses} required />
            </div>
          </div>

          {/* Student Section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Student Information</h3>
            <div className="space-y-4">
              <input type="text" name="studentName" placeholder="Student’s Name" value={formData.studentName} onChange={handleChange} className={inputClasses} required />
              <input type="text" name="studentGrade" placeholder="Grade / Form" value={formData.studentGrade} onChange={handleChange} className={inputClasses} required />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-xl"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </>
    )}
  </div>
</div>

  );
};

export default BookingModal;