import { FC, useState } from "react";
import SmallCountMacaronsForm from "./SmallCountMacaronsForm";
import { Button } from "@/components/UI/button";
import { PlusSquare } from "lucide-react";
import SmallSetLine from "./SmallSetLine";

interface SmallSetProps {
  macaronsSets: SmallMacaronSet[];
  macarons: Macaron[];
  addSmallSet: (count: number, id: string) => void;
  removeFromSets : (idMacaron : string) => void;
}

const SmallSets: FC<SmallSetProps> = ({
  macaronsSets,
  macarons,
  addSmallSet,
  removeFromSets
}) => {
  const [selectedSet, setSeletectedSet] = useState<SmallMacaronSet>({count : 1, macaronId : "" })
  const [showAddSet, setShowAddSet] = useState(false);
  const addEmptySmallForm = () => {
    setShowAddSet(true);
  };

  const removeForm = () => {
    setShowAddSet(false);
  };

  const changeHandle = (idMacaron : string) => {
    const smallMaccaronSet = macaronsSets.find(sms => sms.macaronId == idMacaron)
    if (!smallMaccaronSet) return 
    removeFromSets(smallMaccaronSet.macaronId);
    setSeletectedSet(smallMaccaronSet);
    setShowAddSet(() => true)
  }

  console.log(macaronsSets)

  
  return (
    <div className="flex flex-col">
      {macaronsSets.map((macaronsSet, index) => (
        <SmallSetLine macarons={macarons} smallSet={macaronsSet} key={index} changeHandle={changeHandle}/>
      ))}
      {showAddSet && (
        <SmallCountMacaronsForm
          macarons={macarons}
          removeForm={removeForm}
          addSmallSet={addSmallSet}
          selectedSet={selectedSet}
          
        />
      )}

      {!showAddSet && (
        <div className="w-full flex justify-center p-2">
          <Button type="button" onClick={addEmptySmallForm}>
            <PlusSquare />
            Add macarons
          </Button>
        </div>
      )}
    </div>
  );
};

export default SmallSets;
