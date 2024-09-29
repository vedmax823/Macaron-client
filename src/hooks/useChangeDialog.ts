import { useState } from "react";

export const useChangeDialog = <T>() => {
  const [selected, setSelected] = useState<T | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateNew = () => {
    setSelected(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (one: T) => {
    setSelected(one);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelected(null);
    setIsDialogOpen(false);
  };

  return {selected, isDialogOpen, handleCreateNew, handleEdit, handleCloseDialog}
};
