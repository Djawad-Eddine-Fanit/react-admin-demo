import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { PostSchema } from "@/schemas";
import type { Post } from "@/schemas";
const PostsResponseSchema = z.array(PostSchema);

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return PostsResponseSchema.parse(data);
}

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}
