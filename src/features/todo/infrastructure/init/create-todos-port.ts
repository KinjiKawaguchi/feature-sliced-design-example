import type { Todo } from "@/entities/todo";

export interface TodosAPIClient {
  list(): Promise<Todo[]>;
  add(title: string): Promise<Todo>;
  toggle(id: string, completed: boolean): Promise<void>;
  rename(id: string, title: string): Promise<void>;
  remove(id: string): Promise<void>;
}

export function createTodosPort(api: TodosAPIClient): TodosAPIClient {
  return api;
}
