"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodosApiRemote, TodosPortProvider } from "@/features/todo";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const todosApiClient = new TodosApiRemote();

  return (
    <QueryClientProvider client={queryClient}>
      <TodosPortProvider client={todosApiClient}>{children}</TodosPortProvider>
    </QueryClientProvider>
  );
}
