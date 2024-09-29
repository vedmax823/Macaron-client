import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { FC } from 'react';
import IngredientForm from './IngredientForm';

interface IngredientDialogProps {
    onClose: () => void;
    selectedIngredient : Ingredient | null;
    addIngredient : (ingredient : Ingredient) => void;
  }

const EditIngredientDialog:FC<IngredientDialogProps> = ({selectedIngredient, onClose, addIngredient}) => {
    const title = selectedIngredient ? "Update ingredient" : "Create ingredient";
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            hghj
          </DialogDescription>
          <IngredientForm initialData={selectedIngredient} onClose={onClose} addIngredient={addIngredient}/>
        </DialogContent>
      </Dialog>
    );
};

export default EditIngredientDialog;