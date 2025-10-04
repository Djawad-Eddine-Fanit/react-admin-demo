import  { useEffect } from "react";
import { useUsers } from "../features/users/hooks/useUsers";
import{UserTable} from "../features/users/components/UserTable";
import { toast } from "react-toastify";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { Button } from "@/components/ui/button";

const UsersPage = () => {
  const { data: users, isLoading, error } = useUsers();

  useEffect(() => {
    if (error) {
      toast.error("❌ Failed to load users");
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

  // --- Example stats ---
  const totalUsers = users.length;
  const avgAge =
    users.reduce((sum, u) => sum + (u.age || 0), 0) / users.length || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
       
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Users" value={totalUsers} />
        <StatCard label="Avg Age" value={avgAge.toFixed(1)} />
        <StatCard
          label="Adults"
          value={users.filter((u) => (u.age || 0) >= 18).length}
        />
      </div>
       <div className="flex gap-3">
        <Button size="sm">Add User</Button>
        <Button size="sm" variant="outline">Export CSV</Button>
      </div>
      {/* User table */}
     <UserTable users={users.map(u => ({ ...u, age: u.age ?? 0 }))} />

    </div>
  );
};

export default UsersPage;
