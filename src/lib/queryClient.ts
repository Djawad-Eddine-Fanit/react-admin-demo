import {
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";


export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown, query) => {
      console.error(`❌ Query Error [${query.queryKey}]:`, error);
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching data.";

      toast({
        title: "❌ Query Failed",
        description: message,
        
      });
    },
  }),

  mutationCache: new MutationCache({
    onError: (error: unknown, _variables, _context, mutation) => {
      console.error(`❌ Mutation Error [${mutation.options.mutationKey}]:`, error);
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while performing this operation.";

      toast({
        title: "❌ Operation Failed",
        description: message,
       
      });
    },
  }),

  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 2, 
    },
  },
});

