import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  className = ''
}) => {
  const normalizedRating = Math.max(1, Math.min(maxStars, Math.round(Number(rating) || 5)));

  const sizeClass =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div
      className={`inline-flex items-center gap-1 ${className}`}
      role="img"
      aria-label={`${normalizedRating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= normalizedRating;
        return (
          <Star
            key={starNumber}
            className={`${sizeClass} ${
              isFilled
                ? 'fill-amber-500 text-amber-500'
                : 'fill-transparent text-stone-300 dark:text-stone-700'
            } transition-colors`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
};
