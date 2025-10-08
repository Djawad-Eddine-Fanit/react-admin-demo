import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/types/schemas";
import { PostsResponseSchema } from "@/types/responses";

export async function fetchPosts(): Promise<Post[]> {
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
