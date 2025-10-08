import type { Post } from "@/types/schemas";

export function usePostsPerUser(posts: Post[]) {
  const counts: Record<number, number> = {};
  posts.forEach((p) => {
    counts[p.userId] = (counts[p.userId] || 0) + 1;
  });

  return Object.entries(counts).map(([user, posts]) => ({
    user,
    posts,
  }));
}
