import React from 'react';
import { cn } from './Button';

export function Loader({ className, size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-16 w-16 border-4"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-3", className)}>
      <div className={cn(
        "animate-spin rounded-full border-brand-200 border-t-brand-600 dark:border-slate-700 dark:border-t-brand-500",
        sizes[size]
      )} />
      {text && <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">{text}</p>}
    </div>
  );
}

// Full page loader overlay
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <Loader size="lg" text="Analyzing Data..." />
    </div>
  );
}
