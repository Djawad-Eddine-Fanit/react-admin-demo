import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/schemas";
import { UsersResponseSchema } from "@/types/responses";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  const parsed = UsersResponseSchema.parse(data);
  return parsed.users;
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
