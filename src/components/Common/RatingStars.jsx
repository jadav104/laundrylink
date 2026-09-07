import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
      <Star size={14} fill="#f59e0b" color="#f59e0b" />
      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{rating}</span>
    </div>
  );
};
