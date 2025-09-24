"use client";

import { type FormEvent, useState } from "react";

export function useFormState() {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>, onAdd: (title: string) => void) => {
    event.preventDefault();
    onAdd(title);
    setTitle("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return {
    title,
    setTitle,
    handleSubmit,
    handleChange,
  };
}