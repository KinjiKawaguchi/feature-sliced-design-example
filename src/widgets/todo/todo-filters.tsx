import type { TodoFilter } from "@/entities/todo";

type TodoFiltersProps = {
  value: TodoFilter;
  onChange: (filter: TodoFilter) => void;
};

const FILTER_LABELS: Record<TodoFilter, string> = {
  all: "All",
  active: "Active",
  completed: "Completed",
};

export function TodoFilters({ value, onChange }: TodoFiltersProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-2 shadow-sm">
      {Object.entries(FILTER_LABELS).map(([filter, label]) => {
        const typedFilter = filter as TodoFilter;
        const isActive = typedFilter === value;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(typedFilter)}
            className={`rounded-md px-3 py-1 text-sm transition ${
              isActive
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
