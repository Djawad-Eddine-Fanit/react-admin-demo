import { usePosts } from "@/features/posts/hooks/UsePosts";
import { PostTable } from "@/features/posts/components/PostTable";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { useExportToCSV } from "@/hooks/UseExportToCsv";
import { Skeleton } from "@/components/ui/skeleton";

const PostsPage = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const { exportToCSV, isExporting } = useExportToCSV();

  const avgLength =
    posts && posts.length
      ? Math.round(
          posts.reduce((sum, p) => sum + p.body.length, 0) / posts.length
        )
      : 0;

  const handleExport = () => {
    if (posts?.length) exportToCSV(posts, "posts_list");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Posts</h1>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))
        ) : (
          <>
            <StatCard label="Total Posts" value={posts?.length ?? 0} />
            <StatCard label="Avg Body Length" value={avgLength} />
            <StatCard
              label="Unique Users"
              value={
                posts ? new Set(posts.map((p) => p.userId)).size : 0
              }
            />
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button size="sm">Add Post</Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleExport}
          disabled={isExporting || isLoading}
        >
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        ) : isError ? (
           <div className="text-center text-gray-500 mt-4">
            Failed to load posts. Please try again later.
          </div>
        ) : !posts?.length ? (
          <div className="text-center text-gray-500 mt-4">No posts found</div>
        ) : (
          <PostTable posts={posts} />
        )}
      </div>
    </div>
  );
};

export default PostsPage;
