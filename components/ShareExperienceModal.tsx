import React, { useState } from "react";
import { X, Star } from "lucide-react";
import Button from "./Button";

interface ShareExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; role: string; rating: number; comment: string }) => void;
}

const ShareExperienceModal: React.FC<ShareExperienceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || rating === 0 || !comment.trim()) return;
    onSubmit({ name, role, rating, comment });

    // Reset fields
    setName("");
    setRole("");
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-fade-in">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Share Your Experience
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none text-gray-700"
          />

          {/* Role */}
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Your Role (e.g., Student, Parent)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none text-gray-700"
          />

          {/* Rating */}
          <div className="flex justify-center my-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
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

          {/* Comment */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Tell us about your experience..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none text-gray-700"
          />

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
            >
              Submit Feedback
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareExperienceModal;
