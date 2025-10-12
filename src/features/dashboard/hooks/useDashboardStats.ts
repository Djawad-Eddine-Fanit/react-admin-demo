import { useUsers } from "@/features/users/hooks/UseUsers";
import { usePosts } from "@/features/posts/hooks/UsePosts";
import type { User } from "@/types/schemas";

export function useDashboardStats() {
  
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useUsers();

  const {
    data: posts = [],
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = usePosts();

 
  const isLoading = isUsersLoading || isPostsLoading;
  const isError = isUsersError || isPostsError;

 
  const totalUsers = users.length;
  const totalPosts = posts.length;

  const avgAge =
    users.length > 0
      ? Math.round(
          users.reduce((sum: number, u: User) => sum + (u.age ?? 0), 0) /
            users.length
        )
      : 0;

  const activeUsers = Math.floor(totalUsers * 0.7); // mock 70% active
  const activePercent =
    totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : "0";

  
  return {
    stats: {
      totalUsers,
      totalPosts,
      avgAge,
      activeUsers,
      activePercent,
    },
    isLoading,
    isError,
  };
}
