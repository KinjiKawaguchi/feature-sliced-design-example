import type { Todo, TodoFilter } from "@/entities/todo";
import { filterTodos } from "@/entities/todo";
import { TodoFilters } from "./todo-filters";
import { TodoForm } from "./todo-form/todo-form";
import { TodoList } from "./todo-list";

interface TodoPanelProps {
  todos: Todo[];
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  onAdd: (title: string) => void;
  onToggle: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export function TodoPanel({
  todos,
  filter,
  onFilterChange,
  onAdd,
  onToggle,
  onRename,
  onDelete,
}: TodoPanelProps) {
  const filteredTodos = filterTodos(todos, filter);

  return (
    <div className="flex min-h-screen justify-center bg-neutral-100 px-4 py-10">
      <div className="flex w-full max-w-xl flex-col gap-6">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Tasks</h1>
          <p className="text-sm text-neutral-500">
            Track your tasks, mark them done, and keep everything organised.
          </p>
        </header>
        <TodoForm onAdd={onAdd} />
        <TodoFilters value={filter} onChange={onFilterChange} />
        <TodoList
          todos={filteredTodos}
          onToggle={onToggle}
          onDelete={onDelete}
          onRename={onRename}
        />
      </div>
    </div>
  );
}
