import type { Todo, TodoFilter } from "./types";

export function filterTodos(todos: Todo[], filter: TodoFilter) {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

export function normalizeTitle(input: string) {
  const t = input.trim();
  if (!t) throw new Error("Title required");
  if (t.length > 200) throw new Error("Title too long");
  return t;
}

export function complete(todo: Todo): Todo {
  if (todo.completed) return todo;
  return { ...todo, completed: true };
}

export function reopen(todo: Todo): Todo {
  if (!todo.completed) return todo;
  return { ...todo, completed: false };
}

export function rename(todo: Todo, raw: string): Todo {
  const title = normalizeTitle(raw);
  if (todo.title === title) return todo;
  return { ...todo, title };
}
