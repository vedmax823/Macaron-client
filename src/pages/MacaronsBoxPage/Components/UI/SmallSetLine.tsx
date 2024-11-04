import { PenBox, X } from "lucide-react";
import { FC } from "react";

interface SmallSetLineProps {
    smallSet : SmallMacaronSet,
    macarons : Macaron[],
    changeHandle : (idMacaron : string) => void
}

const SmallSetLine:FC<SmallSetLineProps> = ({macarons, smallSet, changeHandle}) => {
    const macaron = macarons.find(m => m.id === smallSet.macaronId)
    if (!macaron) return "";
    return (
        <div className='flex justify-between items-center'>
            <div>{smallSet.count}</div>
            <div><X/></div>
            <div>{macaron?.taste}</div>
            <div><img src={macaron.pictureLink} width="42px"/></div>
            <div onClick={() => changeHandle(smallSet.macaronId)}><PenBox/></div>
        </div>
    );
};

export default SmallSetLine;