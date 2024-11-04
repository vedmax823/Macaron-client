import ComboBox from "@/components/MyUI/ComboBox";
import { Input } from "@/components/UI/input";
import { SaveIcon, Trash } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface CountMacaronsFormProps {
  macarons: Macaron[];
  macaronsSet?: SmallMacaronSet;
  removeForm: () => void;
  addSmallSet: (count: number, id: string) => void;
  selectedSet : SmallMacaronSet
}

const SmallCountMacaronsForm: FC<CountMacaronsFormProps> = ({
  macarons,
  removeForm,
  addSmallSet,
  selectedSet
}) => {
  const [number, setNumber] = useState<number>(selectedSet.count);
  const [macaronId, setMacaronId] = useState<string>(selectedSet.macaronId);
  const [mistake, setMistake] = useState<string>("");
  const [selectedMacaron, setSelectedMacarons] = useState<Macaron | null>(null);
  const onSaveClick = () => {
    try {
      addSmallSet(number, macaronId);
      removeForm();
    } catch (e) {
      if (e instanceof Error) {
        setMistake(e.message);
        console.log(e.message); // Логування повідомлення помилки
      }
    }
  };
  const chooseMacaron = (macaron: Macaron) => {
    setMacaronId(macaronId === macaron.id ? "" : macaron.id);
  };

  useEffect(() => {
    setSelectedMacarons(macarons.find(m => m.id == macaronId) ?? null)
  }, [macaronId, macarons])
  return (
    <div className="w-full">
      <div className="flex justify-between mt-2">
        <div className="flex justify-start items-center space-x-2">
          <div>Count</div>
          <Input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
          ></Input>
        </div>
        <div className="w-[300px]">
          <ComboBox<Macaron>
            onSelect={chooseMacaron}
            values={macarons}
            displayField="taste"
            valueField="id"
            placeholderText="Macarons search..."
            oneSelect={true}
            selectedValue={macaronId}
          />
        </div>
        <div>{selectedMacaron ? <img src={selectedMacaron.pictureLink} width="42px"/> : null}</div>
        <div className="flex justify-around">
          <SaveIcon onClick={onSaveClick} />
          <Trash onClick={removeForm} />
        </div>
      </div>
      {mistake && <div className="flex w-full justify-center text-sm text-red-500">{mistake}</div>}
    </div>
  );
};

export default SmallCountMacaronsForm;
