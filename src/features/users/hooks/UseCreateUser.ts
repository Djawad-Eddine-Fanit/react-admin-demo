import { useMutation } from "@tanstack/react-query";
import type { AddUserInput, ApiError } from "@/types/schemas";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import { toast } from "@/components/ui/toast"; 
export function useCreateUser() {
  return useMutation<unknown, ApiError, AddUserInput>({
    mutationKey: ["createUser"],

    mutationFn: async (data: AddUserInput) => {
      try {
        const { data: result } = await api.post(
          "https://jsonplaceholder.typicode.com/users",
          data,
          { headers: { "Content-Type": "application/json" } }
        );
        return result;
      } catch (err: unknown) {
        if (isAxiosError(err) && err.response?.data) {
          const apiError: ApiError = err.response.data;
          throw apiError;
        }
        throw { message: "Failed to create user" } as ApiError;
      }
    },

    onSuccess: (_data, variables) => {
      toast({
        title: "✅ User Created",
        description: `User "${variables.firstName} ${variables.lastName}" was added successfully.`,
      });
    },
  });
}
