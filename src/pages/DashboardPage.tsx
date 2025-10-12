"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/UseDashboardStats";
import { useUsers } from "@/features/users/hooks/UseUsers";
import { usePosts } from "@/features/posts/hooks/UsePosts";
import { usePostsPerUser } from "@/features/posts/hooks/UsePostsPerUser";
import { useUsersByAgeGroup } from "@/features/users/hooks/UseUsersByAgeGroup";
import { useUserRegistrations } from "@/features/users/hooks/UseUserRegistrations";
import { useExportToCSV } from "@/hooks/UseExportToCsv";

import { StatCard } from "@/features/dashboard/components/StatCard";
import DashboardCard from "@/features/dashboard/components/DashboardCard";
import { UserTable } from "@/features/users/components/UserTable";
import { PostTable } from "@/features/posts/components/PostTable";
import {
  PieChartCard,
  BarChartCard,
  LineChartCard,
} from "@/components/charts/Charts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = () => {
  const {
    stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useDashboardStats();

  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useUsers();

  const {
    data: posts = [],
    isLoading: postsLoading,
    isError: postsError,
  } = usePosts();

  const { exportToCSV, isExporting } = useExportToCSV();

  const postsPerUser = usePostsPerUser(posts);
  const usersByAge = useUsersByAgeGroup(users);
  const registrations = useUserRegistrations();

  const handleExportUsers = () => {
    if (users.length) exportToCSV(users, "users_data");
  };

  const handleExportPosts = () => {
    if (posts.length) exportToCSV(posts, "posts_data");
  };

  const isLoading = statsLoading || usersLoading || postsLoading;
  const isError = statsError || usersError || postsError;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="Users"
          value={
            isLoading
              ? "…"
              : isError
              ? "—"
              : stats.totalUsers.toString()
          }
        />
        <StatCard
          label="Posts"
          value={
            isLoading
              ? "…"
              : isError
              ? "—"
              : stats.totalPosts.toString()
          }
        />
        <StatCard
          label="Avg Age"
          value={
            isLoading ? "…" : isError ? "—" : stats.avgAge.toString()
          }
        />
        <StatCard
          label="Active"
          value={
            isLoading
              ? "…"
              : isError
              ? "—"
              : stats.activeUsers.toString()
          }
          helpText={
            !isLoading && !isError ? `${stats.activePercent}%` : ""
          }
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <DashboardCard title="Posts per User">
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-xl" />
          ) : isError ? (
            <p className="text-center text-gray-500">
              Failed to load chart.
            </p>
          ) : (
            <BarChartCard
              title=""
              data={postsPerUser}
              dataKey="posts"
              categoryKey="user"
            />
          )}
        </DashboardCard>

        <DashboardCard title="Registrations">
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-xl" />
          ) : isError ? (
            <p className="text-center text-gray-500">
              Failed to load chart.
            </p>
          ) : (
            <LineChartCard
              title=""
              data={registrations}
              xKey="month"
              lines={[{ key: "registrations", stroke: "#3b82f6" }]}
            />
          )}
        </DashboardCard>

        <DashboardCard title="Age Groups">
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-xl" />
          ) : isError ? (
            <p className="text-center text-gray-500">
              Failed to load chart.
            </p>
          ) : (
            <PieChartCard title="" data={usersByAge} />
          )}
        </DashboardCard>
      </div>

      {/* Tables Section */}
      
        <DashboardCard title="Recent Users">
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-xl" />
          ) : isError ? (
            <p className="text-center text-gray-500">
              Failed to load users.
            </p>
          ) : (
            <UserTable
              users={users.map((u) => ({ ...u, age: u.age ?? 0 })).slice(0, 5)}
            />
          )}
        </DashboardCard>

        <DashboardCard title="Recent Posts">
          {isLoading ? (
            <Skeleton className="h-48 w-full rounded-xl" />
          ) : isError ? (
            <p className="text-center text-gray-500">
              Failed to load posts.
            </p>
          ) : (
            <PostTable posts={posts.slice(0, 5)} />
          )}
        </DashboardCard>
     

      {/* Actions */}
      <div className="md:flex gap-3 mt-6">
        <Button
          size="sm"
          variant="outline"
          onClick={handleExportUsers}
          disabled={isExporting || isLoading}
        >
          {isExporting ? "Exporting..." : "Export Users CSV"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleExportPosts}
          disabled={isExporting || isLoading}
        >
          {isExporting ? "Exporting..." : "Export Posts CSV"}
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
