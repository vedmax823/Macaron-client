import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { FC } from 'react';
import AllergenForm from './AllergenForm';


interface AllergenDialogProps {
    onClose: () => void;
    selectedAllergen : Allergen | null;
    addAllergen : (allergen : Allergen) => void;
  }

const EditAllergenDialog:FC<AllergenDialogProps> = ({selectedAllergen, onClose, addAllergen}) => {
    const title = selectedAllergen ? "Update allergen" : "Create allergen";
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            hghj
          </DialogDescription>
          <AllergenForm initialData={selectedAllergen} onClose={onClose} addAllergen={addAllergen}/>
        </DialogContent>
      </Dialog>
    );
};

export default EditAllergenDialog;