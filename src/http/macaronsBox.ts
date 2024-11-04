import { MacaronsBoxFormValues } from "@/pages/MacaronsBoxPage/Components/MacaronsBoxForm";
import apiProtected from "./apiProtected";
import apiPublic from "./apiPublic";

export const getMacaronsBoxes = async () => {
    const responce = await apiPublic.get('api/MacaronsBox')
    return responce.data;
};

export const createMacaronsBoxApi = async (data : MacaronsBoxFormValues) => {
    const responce = await apiProtected.post('api/MacaronsBox', data)
    return responce.data
}

export const updateMacaronsBoxApi = async (data : MacaronsBoxFormValues, id : string) => {
    const responce = await apiProtected.put(`api/MacaronsBox/${id}`, data)
    return responce.data;
}