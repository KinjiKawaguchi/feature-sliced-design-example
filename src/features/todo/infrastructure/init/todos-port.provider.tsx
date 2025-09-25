"use client";

import { createContext, useContext } from "react";
import type { TodosAPIClient } from "./create-todos-port";

const TodosPortContext = createContext<TodosAPIClient | null>(null);

interface TodosPortProviderProps {
  children: React.ReactNode;
  client: TodosAPIClient;
}

export function TodosPortProvider({
  children,
  client,
}: TodosPortProviderProps) {
  return (
    <TodosPortContext.Provider value={client}>
      {children}
    </TodosPortContext.Provider>
  );
}

export function useTodosAPIClient(): TodosAPIClient {
  const port = useContext(TodosPortContext);
  if (!port) {
    throw new Error("useTodosPort must be used within TodosPortProvider");
  }
  return port;
}
