import { QueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true, 
    },
  },
});

const shownQueryErrors = new Set<string>();

queryClient.getQueryCache().subscribe((event) => {
  const query = event.query;
  const state = query?.state;

  if (state?.status === "error" && state.error) {
    const error = state.error as Error;

   
    const key = query.queryKey.join("-");
    if (!shownQueryErrors.has(key)) {
      shownQueryErrors.add(key);

      toast({
        title: "❌ Query Failed",
        description: error.message || "An unexpected error occurred.",
      });

    
      setTimeout(() => shownQueryErrors.delete(key), 5000);
    }
  }
});


const shownMutationSuccesses = new Set<string>();
const shownMutationErrors = new Set<string>();

queryClient.getMutationCache().subscribe((event) => {
  const mutation = event.mutation;
  if (!mutation) return;

  const state = mutation.state;


  const key =
    mutation.options.mutationKey?.[0] &&
    typeof mutation.options.mutationKey[0] === "string"
      ? mutation.options.mutationKey[0]
      : "unknown";


  if (state?.status === "success") {
    if (!shownMutationSuccesses.has(key)) {
      shownMutationSuccesses.add(key);

      toast({
        title: "✅ Success",
        description: "Operation completed successfully.",
      });

      setTimeout(() => shownMutationSuccesses.delete(key), 2000);
    }
  }

 
  if (state?.status === "error" && state.error) {
    const error = state.error as Error;

    if (!shownMutationErrors.has(error.message)) {
      shownMutationErrors.add(error.message);

      toast({
        title: "❌ Operation Failed",
        description: error.message || "Something went wrong while performing this action.",
      });

      setTimeout(() => shownMutationErrors.delete(error.message), 5000);
    }
  }
});



