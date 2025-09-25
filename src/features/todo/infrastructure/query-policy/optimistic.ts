import type { Todo } from "@/entities/todo";
import { complete, rename, reopen } from "@/entities/todo";

export const optimisticUpdates = {
  complete: (todos: Todo[], id: string): Todo[] =>
    todos.map((t) => (t.id === id ? complete(t) : t)),

  reopen: (todos: Todo[], id: string): Todo[] =>
    todos.map((t) => (t.id === id ? reopen(t) : t)),

  rename: (todos: Todo[], id: string, title: string): Todo[] =>
    todos.map((t) => (t.id === id ? rename(t, title) : t)),

  add: (todos: Todo[], newTodo: Todo): Todo[] => [...todos, newTodo],

  remove: (todos: Todo[], id: string): Todo[] =>
    todos.filter((t) => t.id !== id),
};
