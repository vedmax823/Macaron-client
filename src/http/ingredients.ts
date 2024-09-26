import apiPublic from "./apiPublic"

export const getIngredientsApi = async () => {
    const responce = await apiPublic.get('api/ingredient')
    return responce.data;
}