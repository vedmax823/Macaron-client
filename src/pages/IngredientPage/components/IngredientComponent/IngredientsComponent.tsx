import { DataTable } from "./DataTable";
import { createIngredientColumns } from "./Column";
import EditIngredientDialog from "./IngredientDialog/EditIngredientDialog";
import { useFetchData } from "@/hooks/useFetchData";
import { getIngredientsApi } from "@/http/ingredients";
import { useChangeDialog } from "@/hooks/useChangeDialog";



const IngredientsComponent = () => {
  const {data : ingredients, loading, error, addOne} = useFetchData<Ingredient>(getIngredientsApi);
  const {selected : selectedIngredient, isDialogOpen, handleEdit, handleCloseDialog, handleCreateNew } = useChangeDialog<Ingredient>();

  console.log(ingredients)

  const columns = createIngredientColumns(handleEdit);

  if (loading) return <div className="w-full p-8 flex justify-center">Loading...</div>;

  if (error) return <div className="w-full p-8 flex justify-center">Error...</div>;

  return (
    <div>
      <DataTable 
        columns={columns} 
        data={ingredients} 
        handleCreateNewIngredient={handleCreateNew}
        placeholder="Filter ingredients..."
    />

      {isDialogOpen && (
        <EditIngredientDialog
          selectedIngredient={selectedIngredient}
          onClose={handleCloseDialog}
          addIngredient={addOne}
        />
      )}
    </div>
  );
};

export default IngredientsComponent;
