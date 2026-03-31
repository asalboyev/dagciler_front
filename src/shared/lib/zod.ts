import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const phoneSchema = z
  .string()
  .min(9, "Phone number is too short")
  .max(20, "Phone number is too long");

export const requiredString = z.string().min(1, "This field is required");
