import { z } from "zod";

// ✅ User schema
export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

export type User = z.infer<typeof UserSchema>;

// ✅ Post schema
export const PostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

// ✅ Schema for adding a new user (coerce handles string → number)
export const addUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z
    .union([z.coerce.number().min(0, "Age cannot be negative").max(120, "Age seems too high"), z.undefined()])
    .optional(),
});
export interface ApiError {
  message?: string;
  fields?: Record<string, string>;
}

export type AddUserInput = z.infer<typeof addUserSchema>;
