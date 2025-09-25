export const queryKeys = {
  todos: {
    all: ["todos"] as const,
    list: () => [...queryKeys.todos.all, "list"] as const,
    item: (id: string) => [...queryKeys.todos.all, "item", id] as const,
  },
} as const;
