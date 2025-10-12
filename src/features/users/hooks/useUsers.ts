import { useQuery } from "@tanstack/react-query";
import type { User } from "@/types/schemas";
import { UsersResponseSchema } from "@/types/responses";
import { api } from "@/lib/api";

export async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get("https://dummyjson.com/users");
  return UsersResponseSchema.parse(data).users;
}

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    retry: 1,
  });
}
