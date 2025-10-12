// src/hooks/usePosts.ts
import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/types/schemas";
import { PostsResponseSchema } from "@/types/responses";
import { api } from "@/lib/api";

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await api.get("https://jsonplaceholder.typicode.com/posts");
  return PostsResponseSchema.parse(data);
}

export function usePosts() {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    retry: 1,
    staleTime: 1000 * 60 * 2,
  });
}
