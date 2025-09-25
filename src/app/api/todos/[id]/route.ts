import { type NextRequest, NextResponse } from "next/server";
import { normalizeTitle } from "@/entities/todo";
import { deleteTodo, updateTodo } from "../storage";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();
    const updates: { completed?: boolean; title?: string } = {};

    // Update completed status
    if (typeof body.completed === "boolean") {
      updates.completed = body.completed;
    }

    // Update title
    if (typeof body.title === "string") {
      updates.title = normalizeTitle(body.title);
    }

    const updatedTodo = updateTodo(id, updates);

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTodo);
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const deletedTodo = deleteTodo(id);

    if (!deletedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(deletedTodo);
  } catch (_error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
