import { useFormState } from "./use-form-state";

type TodoFormProps = {
  onAdd: (title: string) => void;
};

export function TodoForm({ onAdd }: TodoFormProps) {
  const { title, handleSubmit, handleChange } = useFormState();

  return (
    <form
      onSubmit={(event) => handleSubmit(event, onAdd)}
      className="flex w-full items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm"
    >
      <input
        className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none"
        placeholder="Add a new task"
        value={title}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
      >
        Add
      </button>
    </form>
  );
}
