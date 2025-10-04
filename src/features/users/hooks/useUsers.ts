import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { UserSchema } from "@/schemas";
import type { User } from "@/schemas";
const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
});

async function fetchUsers(): Promise<User[]> {
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
