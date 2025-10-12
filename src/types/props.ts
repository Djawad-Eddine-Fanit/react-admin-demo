import type { Post } from "./schemas";
import type { User } from "./schemas";
export interface PostTableProps {
  posts: Post[];
}

export interface UserTableProps {
  users: User[];
  className?: string;
}

export interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  helpText?: string; // <-- add this
}