import type { Todo } from "@/entities/todo";
import type { TodosAPIClient } from "../init/create-todos-port";

export class TodosApiMock implements TodosAPIClient {
  private mockTodos: Todo[] = [
    { id: "1", title: "Learn React Query", completed: false },
    { id: "2", title: "Build Todo App", completed: true },
  ];

  async list(): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [...this.mockTodos];
  }

  async add(title: string): Promise<Todo> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    this.mockTodos.push(newTodo);
    return newTodo;
  }

  async toggle(id: string, completed: boolean): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const todo = this.mockTodos.find((t) => t.id === id);
    if (todo) {
      todo.completed = completed;
    }
  }

  async rename(id: string, title: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const todo = this.mockTodos.find((t) => t.id === id);
    if (todo) {
      todo.title = title;
    }
  }

  async remove(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const index = this.mockTodos.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.mockTodos.splice(index, 1);
    }
  }
}
