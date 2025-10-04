import { z } from "zod";

// User schema
export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

export type User = z.infer<typeof UserSchema>;

// Post schema
export const PostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});


export type Post = z.infer<typeof PostSchema>;
