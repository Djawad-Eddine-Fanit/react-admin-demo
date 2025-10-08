"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/UseDashboardStats";
import { useUsers } from "@/features/users/hooks/UseUsers";
import { usePosts } from "@/features/posts/hooks/UsePosts";
import { usePostsPerUser } from "@/features/posts/hooks/UsePostsPerUser";
import { useUsersByAgeGroup } from "@/features/users/hooks/UseUsersByAgeGroup";
import { useUserRegistrations } from "@/features/users/hooks/UseUserRegistrations";
import { useExportToCSV } from "@/hooks/UseExportToCsv";
// Components
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

export default function DashboardPage() {
  const { stats } = useDashboardStats();
  const { data: users = [] } = useUsers();
  const { data: posts = [] } = usePosts();
  const postsPerUser = usePostsPerUser(posts);
  const usersByAge = useUsersByAgeGroup(users);
  const registrations = useUserRegistrations();
  const { exportToCSV, isExporting: isCsvExporting } = useExportToCSV();
  const handleExportUsers = () => exportToCSV(users, "users_data");
  const handleExportPosts = () => exportToCSV(posts, "posts_data");

  return (
    <div className="p-6 space-y-8">
      {/* Wrap dashboard content in an ID for PDF export */}
      <div id="dashboard-section">
        {/* Stat Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Users" value={stats.totalUsers} />
          <StatCard label="Posts" value={stats.totalPosts} />
          <StatCard label="Avg Age" value={stats.avgAge} />
          <StatCard
            label="Active"
            value={stats.activeUsers}
            helpText={`${stats.activePercent}%`}
          />
        </div>
        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-3 mt-6">
          <BarChartCard
            title="Posts per User"
            data={postsPerUser}
            dataKey="posts"
            categoryKey="user"
          />
          <LineChartCard
            title="Registrations"
            data={registrations}
            xKey="month"
            lines={[{ key: "registrations", stroke: "#3b82f6" }]}
          />
          <PieChartCard title="Age Groups" data={usersByAge} />
        </div>
        {/* Tables */}
        <div className="mt-6">
          <DashboardCard title="Recent Users">
            <UserTable
              users={users.map((u) => ({ ...u, age: u.age ?? 0 })).slice(0, 5)}
            />
          </DashboardCard>
        </div>
        <div className="mt-6">
          <DashboardCard title="Recent Posts">
            <PostTable posts={posts.slice(0, 5)} />
          </DashboardCard>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="md:flex gap-3">
        <Button
          size="sm"
          variant="outline"
          onClick={handleExportUsers}
          disabled={isCsvExporting}
        >
          {isCsvExporting ? "Exporting..." : "Export Users CSV"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleExportPosts}
          disabled={isCsvExporting}
        >
          {isCsvExporting ? "Exporting..." : "Export Posts CSV"}
        </Button>
      </div>
    </div>
  );
}
