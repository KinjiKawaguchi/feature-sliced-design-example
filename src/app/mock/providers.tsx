"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodosApiMock, TodosPortProvider } from "@/features/todo";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const todosApiClient = new TodosApiMock();

  return (
    <QueryClientProvider client={queryClient}>
      <TodosPortProvider client={todosApiClient}>{children}</TodosPortProvider>
    </QueryClientProvider>
  );
}
