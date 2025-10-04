import  { useEffect } from "react";
import { usePosts } from "@/features/users - Copie/hooks/UsePosts";
import { useUsers } from "@/features/users/hooks/useUsers";
import { PostTable } from "@/features/users - Copie/components/PostTable";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/features/dashboard/components/StatCard";
import type { Post } from "@/schemas";

const PostsPage = () => {
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts();
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();

  useEffect(() => {
    if (postsError || usersError) {
      toast.error("❌ Failed to load posts or users");
    }
  }, [postsError, usersError]);

  if (postsLoading || usersLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!posts || !users) {
    return <div className="text-center text-gray-500 mt-4">No data found</div>;
  }

  // --- Join posts with user names ---
  const postsWithUsers = posts.map((p) => {
    const user = users.find((u) => u.id === p.userId);
    return {
      ...p,
      userName: user ? `${user.firstName} ${user.lastName}` : "Unknown",
    };
  });
const avgLength = Math.round(
  posts.reduce((sum: number, p: Post) => sum + p.body.length, 0) / posts.length
);
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Posts</h1>
        
      </div>
  {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Posts" value={posts.length} />
        <StatCard label="Avg Body Length" value={avgLength} />
        <StatCard label="Unique Users" value={new Set(posts.map((p) => p.userId)).size} />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button size="sm">Add Post</Button>
        <Button size="sm" variant="outline">Export CSV</Button>
        <Button size="sm" variant="secondary">Refresh</Button>
      </div>
      <PostTable posts={postsWithUsers} />
    </div>
  );
};

export default PostsPage;
