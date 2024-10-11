import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader } from "@/components/UI/dialog";
// import { Button } from "@/components/UI/button"; // Додаємо кнопку, якщо необхідно
// import { Label } from "@/components/UI/label";
// import { Input } from "@/components/UI/input";
// import { Textarea } from "@/components/UI/textarea";
import MacaronForm from "./MacaronForm";



interface NewMacaronDialogProps {
  onClose: () => void;
  addNewMacaron : (macaron : Macaron) => void;
  selectedMacacon : Macaron | null;
}

const NewMacaronDialog: React.FC<NewMacaronDialogProps> = ({ onClose, addNewMacaron, selectedMacacon }) => {
  const title = selectedMacacon ? "Update macaron" : "Create macaron";
  const description = selectedMacacon ? "Update a new Taste of you macaron." : "Create a new Taste of you macaron.";
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <MacaronForm initialData={selectedMacacon} addNewMacaron={addNewMacaron} onClose={onClose}/>
      </DialogContent>
    </Dialog>
  );
};

export default NewMacaronDialog;