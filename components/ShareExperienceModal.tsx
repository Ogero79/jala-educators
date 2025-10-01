import React, { useState, useEffect, useRef } from "react";
// --- CHANGE: Import the Check icon for the success message ---
import { X, Star, Check, ChevronDown, User, Users, UserCheck } from "lucide-react";
import Button from "./Button";

interface ShareExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    role: string;
    rating: number;
    comment: string;
  }) => Promise<void>;
}

const ShareExperienceModal: React.FC<ShareExperienceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({ 
    name: "", 
    role: "student", 
    comment: "" 
  });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // --- CHANGE: Add state to show success message ---
  const [isSubmitted, setIsSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      modalRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Reset form when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ name: "", role: "student", comment: "" });
        setRating(0);
        setErrors({});
        setApiError(null);
        setIsLoading(false);
        setIsSubmitted(false); // Reset submission state
      }, 300);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (rating === 0) newErrors.rating = "Please select a rating.";
    if (!formData.comment.trim()) newErrors.comment = "Comment is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSubmit({ 
        name: formData.name,
        role: formData.role,
        rating, 
        comment: formData.comment 
      });
      setIsSubmitted(true); // Show success message on success
    } catch (error) {
      console.error("Submission failed:", error);
      setApiError("Failed to submit feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const modalAnimation = isOpen ? "opacity-100" : "opacity-0 pointer-events-none";
  const contentAnimation = isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 transition-opacity duration-300 ${modalAnimation}`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative transition-all duration-300 ${contentAnimation}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close modal"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* --- CHANGE: Conditionally render form or success message --- */}
        {isSubmitted ? (
          <div className="text-center py-10 animate-fade-in">
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check size={32} strokeWidth={3} />
            </div>
            <h2 id="modal-title" className="text-2xl font-bold text-gray-800 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 text-lg">
              Your feedback has been received.
            </p>
            <Button
              onClick={onClose}
              variant="primary"
              size="md"
              className="mt-8"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <h2 id="modal-title" className="text-2xl font-bold mb-4 text-center text-gray-800">
              Share Your Experience
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className={`w-full p-3 border rounded-lg focus:ring-2 outline-none text-gray-700 ${
                    errors.name ? "border-red-500 focus:ring-red-500/50" : "focus:ring-primary/50"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Role field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">I am a:</label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-gray-700 bg-white appearance-none cursor-pointer transition-all duration-200 hover:border-primary/50"
                  >
                    <option value="student">Student</option>
                    <option value="parent">Parent/Guardian</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {formData.role === "student" && <User className="h-5 w-5 text-gray-400" />}
                    {formData.role === "parent" && <Users className="h-5 w-5 text-gray-400" />}
                    {formData.role === "other" && <UserCheck className="h-5 w-5 text-gray-400" />}
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Rating field */}
              <div>
                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      onClick={() => {
                        setRating(star);
                        if (errors.rating) setErrors(prev => ({...prev, rating: ""}));
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`w-8 h-8 cursor-pointer transition-colors ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {errors.rating && <p className="text-red-500 text-sm text-center">{errors.rating}</p>}
              </div>

              <div>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your experience..."
                  className={`w-full p-3 border rounded-lg focus:ring-2 outline-none text-gray-700 ${
                    errors.comment ? "border-red-500 focus:ring-red-500/50" : "focus:ring-primary/50"
                  }`}
                />
                {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
              </div>

              {apiError && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{apiError}</p>}

              <div className="mt-6 flex justify-center">
                <Button type="submit" variant="primary" size="md" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ShareExperienceModal;