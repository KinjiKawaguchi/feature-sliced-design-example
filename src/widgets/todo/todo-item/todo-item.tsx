import type { Todo } from "@/entities/todo";
import { useEditState } from "./use-edit-state";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
};

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onRename,
}: TodoItemProps) {
  const {
    isEditing,
    draftTitle,
    setDraftTitle,
    startEditing,
    cancelEditing,
    finishEditing,
  } = useEditState(todo.title);

  const handleRename = () => {
    finishEditing((title) => onRename(todo.id, title));
  };

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-1 items-center gap-3">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="size-4 rounded border-neutral-300"
        />
        {isEditing ? (
          <input
            className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleRename();
              }
              if (event.key === "Escape") {
                event.preventDefault();
                cancelEditing();
              }
            }}
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`flex-1 text-sm ${
              todo.completed
                ? "text-neutral-400 line-through"
                : "text-neutral-800"
            }`}
          >
            {todo.title}
          </label>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleRename}
              className="rounded-md bg-neutral-900 px-3 py-1 text-white transition hover:bg-neutral-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              className="rounded-md border border-neutral-200 px-3 py-1 text-neutral-700 transition hover:border-neutral-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={startEditing}
              className="rounded-md border border-neutral-200 px-3 py-1 text-neutral-700 transition hover:border-neutral-300"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="rounded-md border border-red-100 px-3 py-1 text-red-600 transition hover:border-red-200"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
