import { getIngredientsApi } from "@/http/ingredients";
import { useEffect, useState } from "react"

const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        const getIngrediebts = async () => {
            try{
                const newIngredients = await getIngredientsApi();
                setIngredients(newIngredients);
            }
            catch(error){
                console.log(error)
            }
        }
        getIngrediebts();

    }, [])

    return {
        ingredients
    }
}

export default useIngredients;