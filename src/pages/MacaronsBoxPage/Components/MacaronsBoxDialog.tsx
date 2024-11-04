import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/UI/dialog";

import { FC } from "react";
import MacaronsBoxForm from "./MacaronsBoxForm";

interface MacaronsBoxDialogProps {
    onClose: () => void;
    addNewMacaronsBox : (macaronsBox : MacaronBox) => void;
    selectedMacaconsBox : MacaronBox | null;
}

const MacaronsBoxDialog:FC<MacaronsBoxDialogProps> = ({selectedMacaconsBox, onClose, addNewMacaronsBox}) => {
    const title = selectedMacaconsBox ? "Update macarons box" : "Create macarons box";
    const description = selectedMacaconsBox ? "Update macarons box." : "Create a new macarons box.";
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-h-[80vh] min-w-[800px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          <MacaronsBoxForm 
            initialData={selectedMacaconsBox}
            addNewMacaronBox={addNewMacaronsBox}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    );
};

export default MacaronsBoxDialog;