import { z } from "zod";
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters.")
    .max(80, "Use no more than 80 characters.")
    .regex(/^[^\r\n]+$/, "Enter your name on one line."),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  subject: z.enum([
    "Internship opportunity",
    "Research collaboration",
    "Software project",
    "Other",
  ]),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(4000, "Use no more than 4,000 characters."),
  website: z.string().max(200).optional().default(""),
});
export type ContactInput = z.infer<typeof contactSchema>;