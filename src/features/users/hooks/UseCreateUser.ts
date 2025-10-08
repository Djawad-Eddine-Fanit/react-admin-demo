import { useMutation } from "@tanstack/react-query";
import type { AddUserInput } from "@/types/schemas";

interface ApiError {
  message?: string;
  fields?: Record<string, string>;
}

export function useCreateUser() {
  return useMutation({
    mutationFn: async (data: AddUserInput) => {
       const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: any = await res.json();

      if (!res.ok) {
        const error: ApiError = result;
        throw error; 
      }

      return result;
    },
  });
}
