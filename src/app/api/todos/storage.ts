import type { Todo } from "@/entities/todo";

// Shared in-memory storage (in production, you'd use a database)
export const todos: Todo[] = [
  { id: "1", title: "Learn React Query", completed: false },
  { id: "2", title: "Build Todo App", completed: true },
  { id: "3", title: "Deploy to Production", completed: false },
];

export function getAllTodos(): Todo[] {
  return todos;
}

export function addTodo(todo: Todo): void {
  todos.push(todo);
}

export function updateTodo(
  id: string,
  updates: Partial<Omit<Todo, "id">>,
): Todo | null {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return null;
  }

  todos[todoIndex] = { ...todos[todoIndex], ...updates };
  return todos[todoIndex];
}

export function deleteTodo(id: string): Todo | null {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return null;
  }

  const deletedTodo = todos[todoIndex];
  todos.splice(todoIndex, 1);
  return deletedTodo;
}

export function findTodoById(id: string): Todo | null {
  return todos.find((todo) => todo.id === id) || null;
}
