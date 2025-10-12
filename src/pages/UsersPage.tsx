import { useNavigate } from "react-router-dom";
import { useUsers } from "../features/users/hooks/UseUsers";
import { UserTable } from "../features/users/components/UserTable";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useExportToCSV } from "@/hooks/UseExportToCsv";

const UsersPage = () => {
  const navigate = useNavigate();
  const { data: users = [], isLoading, isError } = useUsers();
  const { exportToCSV, isExporting } = useExportToCSV();

  // ✅ Derived stats
  const totalUsers = users.length;
  const avgAge =
    totalUsers > 0
      ? users.reduce((sum, u) => sum + (u.age ?? 0), 0) / totalUsers
      : 0;
  const adultCount = users.filter((u) => (u.age ?? 0) >= 18).length;

  // ✅ Handle export
  const handleExport = () => exportToCSV(users, "users_list");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </>
        ) : (
          <>
            <StatCard label="Total Users" value={totalUsers} />
            <StatCard label="Avg Age" value={avgAge.toFixed(1)} />
            <StatCard label="Adults" value={adultCount} />
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button size="sm" onClick={() => navigate("/users/new")}>
          Add User
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleExport}
          disabled={isExporting || isLoading || users.length === 0}
        >
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>

      {/* User Table or Skeleton Rows */}
      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center text-gray-500 mt-4">
            Failed to load users. Please try again later.
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">No users found</div>
        ) : (
          <UserTable users={users.map((u) => ({ ...u, age: u.age ?? 0 }))} />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
