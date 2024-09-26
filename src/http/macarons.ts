
import { MacaronFormValues } from "@/pages/MacaronsPage/Components/MacaronForm";
import apiProtected from "./apiProtected";
import apiPublic from "./apiPublic";

export const getMacarons = async () => {
    const responce = await apiPublic.get('api/macaron')
    return responce.data;
};

export const createMacaron = async (data : MacaronFormValues) => {
    const responce = await apiProtected.post('api/macaron', data)
    return responce.data
}