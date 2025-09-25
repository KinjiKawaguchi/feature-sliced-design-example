"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Todo } from "@/entities/todo";
import { normalizeTitle } from "@/entities/todo";
import { useTodosAPIClient } from "../infrastructure/init/todos-port.provider";
import { optimisticUpdates } from "../infrastructure/query-policy/optimistic";
import { queryKeys } from "../infrastructure/query-policy/query-keys";

export function useTodos() {
  const api = useTodosAPIClient();
  const qc = useQueryClient();
  const key = queryKeys.todos.list();

  const list = useQuery({ queryKey: key, queryFn: () => api.list() });

  const completeMut = useMutation({
    mutationFn: async (id: string) => {
      await api.toggle(id, true);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key) ?? [];
      qc.setQueryData(key, optimisticUpdates.complete(prev, id));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      ctx?.prev && qc.setQueryData(key, ctx.prev);
      toast.error("タスクの完了に失敗しました");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  const reopenMut = useMutation({
    mutationFn: async (id: string) => {
      await api.toggle(id, false);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key) ?? [];
      qc.setQueryData(key, optimisticUpdates.reopen(prev, id));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      ctx?.prev && qc.setQueryData(key, ctx.prev);
      toast.error("タスクの再開に失敗しました");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  const renameMut = useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      const normalizedTitle = normalizeTitle(title);
      await api.rename(id, normalizedTitle);
    },
    onMutate: async ({ id, title }) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key) ?? [];
      qc.setQueryData(key, optimisticUpdates.rename(prev, id, title));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      ctx?.prev && qc.setQueryData(key, ctx.prev);
      toast.error("タスクの名前変更に失敗しました");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  });

  const addMut = useMutation({
    mutationFn: async (title: string) => {
      const normalized = normalizeTitle(title);
      await api.add(normalized);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
    onError: () => toast.error("タスクの追加に失敗しました"),
  });

  const removeMut = useMutation({
    mutationFn: async (id: string) => {
      await api.remove(id);
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key) ?? [];
      qc.setQueryData(key, optimisticUpdates.remove(prev, id));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      ctx?.prev && qc.setQueryData(key, ctx.prev);
      toast.error("タスクの削除に失敗しました");
    },
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
