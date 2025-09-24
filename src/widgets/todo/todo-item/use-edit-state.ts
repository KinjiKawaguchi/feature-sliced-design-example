"use client";

import { useEffect, useState } from "react";

export function useEditState(initialTitle: string) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(initialTitle);

  useEffect(() => {
    setDraftTitle(initialTitle);
  }, [initialTitle]);

  const startEditing = () => setIsEditing(true);

  const cancelEditing = () => {
    setIsEditing(false);
    setDraftTitle(initialTitle);
  };

  const finishEditing = (onSave: (title: string) => void) => {
    onSave(draftTitle);
    setIsEditing(false);
  };

  return {
    isEditing,
    draftTitle,
    setDraftTitle,
    startEditing,
    cancelEditing,
    finishEditing,
  };
}
