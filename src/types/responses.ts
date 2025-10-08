// types/responses.ts
import { z } from "zod";
import { UserSchema } from "./schemas";
import { PostSchema } from "./schemas";

export const PostsResponseSchema = z.array(PostSchema);
export type GetPostsResponse = z.infer<typeof PostsResponseSchema>; // Post[]

export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
});

export type GetUsersResponse = z.infer<typeof UsersResponseSchema>; // { users: User[] }
