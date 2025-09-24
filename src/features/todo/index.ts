"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/entities/todo";
import { complete, normalizeTitle, rename, reopen } from "@/entities/todo";

const key = ["todos"];

const mockTodos: Todo[] = [
  { id: "1", title: "Learn React Query", completed: false },
  { id: "2", title: "Build Todo App", completed: true },
];

function mockApi() {
  return {
    list: async (): Promise<Todo[]> => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return [...mockTodos];
    },
    add: async (title: string): Promise<Todo> => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        completed: false,
      };
      mockTodos.push(newTodo);
      return newTodo;
    },
    toggle: async (id: string, completed: boolean): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 150));
      const todo = mockTodos.find((t) => t.id === id);
      if (todo) {
        todo.completed = completed;
      }
    },
    rename: async (id: string, title: string): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 150));
      const todo = mockTodos.find((t) => t.id === id);
      if (todo) {
        todo.title = title;
      }
    },
    remove: async (id: string): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 150));
      const index = mockTodos.findIndex((t) => t.id === id);
      if (index !== -1) {
        mockTodos.splice(index, 1);
      }
    },
  };
}

export function useTodos() {
  const api = mockApi();
  const qc = useQueryClient();

  const list = useQuery({ queryKey: key, queryFn: () => api.list() });

  const completeMut = useMutation({
    mutationFn: async (id: string) => {
      const cur = (qc.getQueryData<Todo[]>(key) ?? []).find((t) => t.id === id);
      if (!cur) throw new Error("Not found");
      const next = complete(cur);
      await api.toggle(id, next.completed);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key) ?? [];
      qc.setQueryData(
        key,
        prev.map((t) => (t.id === id ? complete(t) : t)),
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(key, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  const reopenMut = useMutation({
    mutationFn: async (id: string) => {
      const cur = (qc.getQueryData<Todo[]>(key) ?? []).find((t) => t.id === id);
      if (!cur) throw new Error("Not found");
      const next = reopen(cur);
      await api.toggle(id, next.completed);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key) ?? [];
      qc.setQueryData(
        key,
        prev.map((t) => (t.id === id ? reopen(t) : t)),
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(key, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  const renameMut = useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      const cur = (qc.getQueryData<Todo[]>(key) ?? []).find((t) => t.id === id);
      if (!cur) throw new Error("Not found");
      const next = rename(cur, title);
      await api.rename(id, next.title);
    },
    onMutate: async ({ id, title }) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key) ?? [];
      qc.setQueryData(
        key,
        prev.map((t) => (t.id === id ? rename(t, title) : t)),
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(key, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  const addMut = useMutation({
    mutationFn: async (title: string) => {
      const normalized = normalizeTitle(title);
      await api.add(normalized);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });

  const removeMut = useMutation({
    mutationFn: async (id: string) => {
      await api.remove(id);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key) ?? [];
      qc.setQueryData(
        key,
        prev.filter((t) => t.id !== id),
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(key, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  return {
    list,
    complete: (id: string) => completeMut.mutate(id),
    reopen: (id: string) => reopenMut.mutate(id),
    rename: (id: string, title: string) => renameMut.mutate({ id, title }),
    add: (title: string) => addMut.mutate(title),
    remove: (id: string) => removeMut.mutate(id),
  };
}
