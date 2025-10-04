import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { useUsers } from "@/features/users/hooks/useUsers";
import { usePosts } from "@/features/users - Copie/hooks/UsePosts";
import { usePostsPerUser } from "@/features/users - Copie/hooks/usePostsPerUser";
import { useUsersByAgeGroup } from "@/features/users/hooks/useUsersByAgeGroup";
import { useUserRegistrations } from "@/features/users/hooks/useUserRegistrations";
import { StatCard } from "@/features/dashboard/components/StatCard";
import DashboardCard from "@/features/dashboard/components/DashboardCard";
import {UserTable} from "@/features/users/components/UserTable";
import {PostTable} from "@/features/users - Copie/components/PostTable";

// Charts
import { PieChartCard, BarChartCard, LineChartCard } from "@/components/charts/Charts";

// UI elements (Shadcn)
import { Button } from "@/components/ui/button";


export default function DashboardPage() {
  const { stats } = useDashboardStats();
  const { data: users = [] } = useUsers();
  const { data: posts = [] } = usePosts();
  const postsPerUser = usePostsPerUser(posts);
  const usersByAge = useUsersByAgeGroup(users);
  const registrations = useUserRegistrations();

  return (
    <div className="p-6 space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Users" value={stats.totalUsers} />
        <StatCard label="Posts" value={stats.totalPosts} />
        <StatCard label="Avg Age" value={stats.avgAge} />
        <StatCard label="Active" value={stats.activeUsers} helpText={`${stats.activePercent}%`} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-3">
        <BarChartCard title="Posts per User" data={postsPerUser} dataKey="posts" categoryKey="user" />
        <LineChartCard title="Registrations" data={registrations}  xKey="month"  lines={[{ key: "registrations", stroke: "#3b82f6" }]} />
        <PieChartCard title="Age Groups" data={usersByAge} />
      </div>

      {/* Tables */}
      <DashboardCard title="Recent Users">
       <UserTable users={users.map(u => ({ ...u, age: u.age ?? 0 }))} />

      </DashboardCard>

      <DashboardCard title="Recent Posts">
        <PostTable posts={posts.slice(0, 5)} />
      </DashboardCard>

      {/* Actions */}
      <div className="flex gap-3">
        <Button size="sm">Export CSV</Button>
        <Button size="sm" variant="outline">Export PDF</Button>
        <Button size="sm" variant="secondary">Refresh Data</Button>
      </div>
    </div>
  );
}

