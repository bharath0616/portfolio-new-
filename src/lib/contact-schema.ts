import { z } from 'zod';

/**
 * Contact form contract.
 *
 * Defined once and used on both sides: the client validates against it for instant
 * feedback, and the route handler re-validates the parsed body against the same
 * schema. Client-side validation is a UX affordance, never a trust boundary —
 * anything can POST to the endpoint directly.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'That name is too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .email('That does not look like a valid email address.')
    .max(160, 'That email is too long.'),
  company: z.string().trim().max(120, 'That is too long.').optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'A little more detail, please — at least 10 characters.')
    .max(2000, 'Please keep it under 2000 characters.'),
  /**
   * Honeypot. Hidden from users but visible to naive bots, which fill every field
   * they find. A non-empty value means the submission is automated — we accept it
   * with a success response so the bot does not learn it was detected.
   */
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
