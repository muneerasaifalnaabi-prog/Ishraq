import React from 'react';

export const SkeletonLine = ({ className = '' }) => (
  <div className={`animate-pulse rounded-full bg-foreground/10 ${className}`} />
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`animate-pulse rounded-[2rem] bg-foreground/5 border border-foreground/5 ${className}`} />
);

export const SkeletonListRows = ({ count = 3, rowClassName = 'h-24 mb-4' }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`animate-pulse rounded-[2rem] bg-foreground/5 border border-foreground/5 ${rowClassName}`}
        style={{ animationDelay: `${i * 80}ms` }}
      />
    ))}
  </>
);

export default SkeletonListRows;
