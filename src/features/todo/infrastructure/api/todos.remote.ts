import type { Todo } from "@/entities/todo";
import type { TodosAPIClient } from "../init/create-todos-port";

export class TodosApiRemote implements TodosAPIClient {
  constructor(private baseUrl: string = "/api") {}

  async list(): Promise<Todo[]> {
    const response = await fetch(`${this.baseUrl}/todos`);
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return response.json();
  }

  async add(title: string): Promise<Todo> {
    const response = await fetch(`${this.baseUrl}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      throw new Error("Failed to add todo");
    }
    return response.json();
  }

  async toggle(id: string, completed: boolean): Promise<void> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!response.ok) {
      throw new Error("Failed to toggle todo");
    }
  }

  async rename(id: string, title: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      throw new Error("Failed to rename todo");
    }
  }

  async remove(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to remove todo");
    }
  }
}

export const todosApi = new TodosApiRemote();
