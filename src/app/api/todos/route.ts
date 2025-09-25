import { type NextRequest, NextResponse } from "next/server";
import type { Todo } from "@/entities/todo";
import { normalizeTitle } from "@/entities/todo";
import { addTodo, getAllTodos } from "./storage";

export async function GET() {
  const todos = getAllTodos();
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 },
      );
    }

    const normalizedTitle = normalizeTitle(title);

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: normalizedTitle,
      completed: false,
    };

    addTodo(newTodo);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
