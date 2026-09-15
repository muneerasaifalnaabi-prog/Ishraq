import React from 'react';
import { MOOD_ICONS, moodIndexFromValue } from '../constants/moods';

const MoodIcon = ({ value, className }) => {
  const index = moodIndexFromValue(value);
  const Icon = index !== null ? MOOD_ICONS[index] : null;
  if (!Icon) return null;
  return <Icon className={className} />;
};

export default MoodIcon;
