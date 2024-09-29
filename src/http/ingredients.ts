import { IngredientFormValues } from "@/pages/IngredientPage/components/IngredientComponent/IngredientDialog/IngredientForm";
import apiPublic from "./apiPublic"
import apiProtected from "./apiProtected";

export const getIngredientsApi = async () => {
    const responce = await apiPublic.get('api/ingredient')
    return responce.data;
}

export const createIngredientApi = async (data : IngredientFormValues) => {
    const responce = await apiProtected.post('api/ingredient', data)
    return responce.data
}

export const updateIngredientApi = async (data : IngredientFormValues, id : string) => {
    const responce = await apiProtected.put(`api/ingredient/${id}`, data)
    return responce.data;
}