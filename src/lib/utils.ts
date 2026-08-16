// ============================================================
// AskWhichAI — Utility helpers
// ============================================================
// The cn() function is used everywhere for combining Tailwind
// CSS class names. It merges conflicting Tailwind utility
// classes intelligently (the last one wins).
// ============================================================

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Usage: className={cn("base-class", condition && "extra-class", props.className)}
// Example: cn("px-4 py-2", isActive && "bg-blue-500", "px-6")  → "py-2 bg-blue-500 px-6"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
