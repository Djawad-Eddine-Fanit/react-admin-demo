import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../features/users/hooks/UseUsers";
import { UserTable } from "../features/users/components/UserTable";

import { StatCard } from "@/features/dashboard/components/StatCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { useExportToCSV } from "@/hooks/UseExportToCsv";
const UsersPage = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useUsers();
  const { exportToCSV, isExporting } = useExportToCSV();
  useEffect(() => {
    if (error) {
      const errorMessage =
        (error as any)?.response?.data?.message || // Axios: server error message
        (error as any)?.message || // JS error object
        "An unexpected error occurred."; // Fallback message

      toast({
        title: "❌ Failed to load users",
        description: errorMessage,
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <div className="text-center text-gray-500 mt-4">No users found</div>;
  }

  const totalUsers = users.length;
  const avgAge =
    users.reduce((sum, u) => sum + (u.age || 0), 0) / users.length || 0;

  const handleExport = () => {
    exportToCSV(users, "users_list");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Users" value={totalUsers} />
        <StatCard label="Avg Age" value={avgAge.toFixed(1)} />
        <StatCard
          label="Adults"
          value={users.filter((u) => (u.age || 0) >= 18).length}
        />
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
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>
      </div>

      {/* User Table */}
      <UserTable users={users.map((u) => ({ ...u, age: u.age ?? 0 }))} />
    </div>
  );
};

export default UsersPage;
