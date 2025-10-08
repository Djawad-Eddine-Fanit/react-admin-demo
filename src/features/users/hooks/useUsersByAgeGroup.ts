import type { User } from "@/types/schemas";

export function useUsersByAgeGroup(users: User[]) {
  const groups = { "18-25": 0, "26-40": 0, "40+": 0 };

  users.forEach((u) => {
    if (!u.age) return;
    if (u.age <= 25) groups["18-25"]++;
    else if (u.age <= 40) groups["26-40"]++;
    else groups["40+"]++;
  });

  return Object.entries(groups).map(([name, value]) => ({
    name,
    value,
  }));
}
