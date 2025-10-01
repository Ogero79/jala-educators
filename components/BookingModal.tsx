import React, { useState, useEffect } from 'react';
// Import the Check icon from lucide-react
import { X, Check } from 'lucide-react';
import {  API_BASE_URL } from "../constants";

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
  
  // State management for submission status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const [formErrors, setFormErrors] = useState({
    parentPhone: '',
  });

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
          setError(null);
          setIsLoading(false);
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
    
    if (name === 'parentPhone') {
      // Allow only numeric input and limit to 10 digits
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setFormData(prevState => ({ ...prevState, [name]: numericValue }));
      }
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    // Clear the error for the field once the user starts correcting it
    if (formErrors.parentPhone && name === 'parentPhone') {
      setFormErrors(prevState => ({ ...prevState, parentPhone: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { parentPhone: '' };
    const phoneRegex = /^0\d{9}$/; // Regex for a 10-digit number starting with 0

    if (!formData.parentPhone) {
      errors.parentPhone = 'Phone number is required.';
      isValid = false;
    } else if (!phoneRegex.test(formData.parentPhone)) {
      errors.parentPhone = 'Please enter a valid 10-digit phone number (e.g., 0712345678).';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // --- CHANGE 1: CONFIGURED TO SEND DATA TO A SERVER ---
  // The handleSubmit function is now async to handle the API call.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Replace '/api/bookings' with your actual server endpoint
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle server errors (e.g., 400, 500)
        throw new Error('Something went wrong. Please try again.');
      }

      // If submission is successful:
      console.log('Booking submitted successfully:', formData);
      setIsSubmitted(true);

    } catch (err: any) {
      // Handle network errors or the error thrown above
      console.error('Submission failed:', err);
      setError(err.message || 'Failed to submit booking. Please check your connection.');
    } finally {
      // This will run regardless of success or failure
      setIsLoading(false);
    }
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
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-muted hover:text-foreground hover:bg-muted/20 p-2 rounded-full transition-colors" 
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 animate-fade-in">
            {/* --- CHANGE 2: REPLACED EMOJI WITH LUCIDE ICON --- */}
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check size={32} strokeWidth={3} />
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
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Parent Information</h3>
                <div className="space-y-4">
                  <input type="text" name="parentName" placeholder="Parent’s Name" value={formData.parentName} onChange={handleChange} className={inputClasses} required />
                    <input 
                      type="tel" // Use type="tel" for phone numbers
                      name="parentPhone" 
                      placeholder="Parent’s Phone (e.g., 0712345678)" 
                      value={formData.parentPhone} 
                      onChange={handleChange} 
                      className={`${inputClasses} ${formErrors.parentPhone ? 'border-red-500 focus:ring-red-500/50' : 'border-border'}`} 
                      required 
                      maxLength={10}
                    />
                  {/* --- CHANGE 3: EMAIL IS NOW OPTIONAL --- */}
                  {/* The 'required' attribute has been removed from this input */}
                  <input type="email" name="parentEmail" placeholder="Parent’s Email (Optional)" value={formData.parentEmail} onChange={handleChange} className={inputClasses} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Student Information</h3>
                <div className="space-y-4">
                  <input type="text" name="studentName" placeholder="Student’s Name" value={formData.studentName} onChange={handleChange} className={inputClasses} required />
                  <input type="text" name="studentGrade" placeholder="Grade / Form" value={formData.studentGrade} onChange={handleChange} className={inputClasses} required />
                </div>
              </div>

              {/* Display error message if submission fails */}
              {error && (
                <div className="text-center text-sm text-red-500 bg-red-500/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? 'Submitting...' : 'Submit Booking'}
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