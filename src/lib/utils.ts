import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with conflict resolution.
 * `clsx` handles conditionals; `twMerge` ensures a later utility wins over an
 * earlier one in the same group (e.g. `px-2` passed by a caller beats `px-4`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number into an inclusive range. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another, clamped at both ends. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  if (inMax === inMin) return outMin;
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + t * (outMax - outMin);
}

/** Split a string into characters, preserving spaces as non-breaking for layout. */
export function splitChars(text: string) {
  return Array.from(text).map((char) => (char === ' ' ? ' ' : char));
}
