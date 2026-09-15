import React from 'react';
import { Frown, Meh, Smile, Laugh, PartyPopper } from 'lucide-react';

// Shared 0-4 mood scale used by Dashboard, Mood and Journal pages.
export const MOOD_ICONS = [Frown, Meh, Smile, Laugh, PartyPopper];

// Legacy journal entries stored the raw emoji glyph instead of an index —
// map those back to the icon scale so old entries still render correctly.
const LEGACY_EMOJI_TO_INDEX = {
  '😢': 0,
  '😐': 1,
  '😊': 2,
  '😍': 3,
  '🤩': 4,
};

export const moodIndexFromValue = (value) => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return value;
  if (LEGACY_EMOJI_TO_INDEX[value] !== undefined) return LEGACY_EMOJI_TO_INDEX[value];
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

export const MoodIcon = ({ value, className }) => {
  const index = moodIndexFromValue(value);
  const Icon = index !== null ? MOOD_ICONS[index] : null;
  if (!Icon) return null;
  return <Icon className={className} />;
};
