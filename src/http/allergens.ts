import { AllergenFormValues } from "@/pages/IngredientPage/components/AllergensComponent/AllergenDialog/AllergenForm";
import apiPublic from "./apiPublic";
import apiProtected from "./apiProtected";

export const getAllergenApi = async () => {
    const responce = await apiPublic.get('api/allergen')
    return responce.data;
}

export const createAllergenApi = async (data : AllergenFormValues) => {
    const responce = await apiProtected.post('api/allergen', data)
    return responce.data
}

export const updateAllergenApi = async (data : AllergenFormValues, id : string) => {
    const responce = await apiProtected.put(`api/allergen/${id}`, data)
    return responce.data;
}