import { useEffect } from "react";
import { usePosts } from "@/features/posts/hooks/UsePosts";
import { PostTable } from "@/features/posts/components/PostTable";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { useExportToCSV } from "@/hooks/UseExportToCsv";

const PostsPage = () => {
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = usePosts();

  const { exportToCSV, isExporting } = useExportToCSV();
  useEffect(() => {
  if (postsError) {
    toast({
      title: "❌ Failed to load posts",
      description: "Please try again later.",
    });
  }
}, [postsError, toast]);
  if (postsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!posts) {
    return <div className="text-center text-gray-500 mt-4">No data found</div>;
  }

  const avgLength = Math.round(
    posts.reduce((sum, p) => sum + p.body.length, 0) / posts.length,
  );

  const handleExport = () => {
    exportToCSV(posts, "posts_list");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Posts</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Posts" value={posts.length} />
        <StatCard label="Avg Body Length" value={avgLength} />
        <StatCard
          label="Unique Users"
          value={new Set(posts.map((p) => p.userId)).size}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button size="sm">Add Post</Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>

      <PostTable posts={posts} />
    </div>
  );
};

export default PostsPage;
