// ?: features/todo-filterは機能単位の切り方として適切か？
"use client";
import { useState } from "react";
import type { TodoFilter } from "@/entities/todo";

export function useFilterState(initial: TodoFilter = "all") {
  const [filter, setFilter] = useState<TodoFilter>(initial);
  return { filter, setFilter };
}
