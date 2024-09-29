import { getAllergenApi } from "@/http/allergens"
import { useEffect, useState } from "react"

export const useAllergens = () => {
    const [allergens, setAllergens] = useState<Allergen[]>([])

    useEffect(() => {
        const getAllergens = async () => {
            try{
                const ingredientsList = await getAllergenApi();
                setAllergens(ingredientsList)
            }
            catch(error){
                console.log(error);
            }
        }
        getAllergens();
    }, [])

    return allergens;
}