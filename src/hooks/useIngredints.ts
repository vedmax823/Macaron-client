import { getIngredientsApi } from "@/http/ingredients"
import { useEffect, useState } from "react"

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    useEffect(() => {
        const getIngredients = async () => {
            try{
                const ingredientsList = await getIngredientsApi();
                setIngredients(ingredientsList)
            }
            catch(error){
                console.log(error);
            }
        }
        getIngredients();
    }, [])

    return ingredients;
}