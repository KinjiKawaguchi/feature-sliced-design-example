"use client";

import { useTodos } from "@/features/todo";
import { useFilterState } from "@/features/todo-filter";
import { TodoPanel } from "@/widgets/todo";

export function TodoPage() {
  const { filter, setFilter } = useFilterState();
  const { list, add, complete, reopen, rename, remove } = useTodos();
  const todos = list.data || [];

  const handleToggle = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      if (todo.completed) {
        reopen(id);
      } else {
        complete(id);
      }
    }
  };

  return (
    <TodoPanel
      todos={todos}
      filter={filter}
      onFilterChange={setFilter}
      onAdd={add}
      onToggle={handleToggle}
      onRename={rename}
      onDelete={remove}
    />
  );
}
