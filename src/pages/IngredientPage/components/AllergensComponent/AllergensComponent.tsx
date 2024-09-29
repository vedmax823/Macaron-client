import { useFetchData } from '@/hooks/useFetchData';
import { getAllergenApi } from '@/http/allergens';
import { createAllergenColumns } from './Columns';
import { useChangeDialog } from '@/hooks/useChangeDialog';
import EditAllergenDialog from './AllergenDialog/EditAllergenDialog';
import { DataTable } from '../IngredientComponent/DataTable';

const AllergensComponent = () => {
    const {data : allergens, loading, error, addOne} = useFetchData<Allergen>(getAllergenApi);
    const {selected : selectedAllergen, isDialogOpen, handleEdit, handleCloseDialog, handleCreateNew } = useChangeDialog<Allergen>();

    const columns = createAllergenColumns(handleEdit);

    if (loading) return <div className="w-full p-8 flex justify-center">Loading...</div>;

    if (error) return <div className="w-full p-8 flex justify-center">Error...</div>;
  
    return (
        <div>
          <DataTable 
            columns={columns} 
            data={allergens} 
            handleCreateNewIngredient={handleCreateNew}
            placeholder="Filter allergens..."
        />
    
          {isDialogOpen && (
            <EditAllergenDialog
              selectedAllergen={selectedAllergen}
              onClose={handleCloseDialog}
              addAllergen={addOne}
            />
          )}
        </div>
      );
};

export default AllergensComponent;