import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import * as z from "zod";
import { Input } from "@/components/UI/input";
import { Checkbox } from "@/components/UI/checkbox";
import { Button } from "@/components/UI/button";
import { useFetchData } from "@/hooks/useFetchData";
import { getAllergenApi } from "@/http/allergens";
import ComboBox from "@/components/MyUI/ComboBox";
import { createIngredientApi, updateIngredientApi } from "@/http/ingredients";

const formSchema = z.object({
  name: z.string().min(1),
  containsGluten: z.boolean().default(false),
  allergenId: z.union([z.string().min(1).nullable(), z.literal("")]).optional(),
});

export type IngredientFormValues = z.infer<typeof formSchema>;

interface IngredientFormProps {
  initialData: Ingredient | null;
  addIngredient : (ingredient : Ingredient) => void;
  onClose: () => void;
}

const IngredientForm: FC<IngredientFormProps> = ({ initialData, onClose, addIngredient }) => {

  console.log(initialData);
  const {
    data: allergens,
    loading,
    error,
  } = useFetchData<Allergen>(getAllergenApi);
  const buttonTitle = initialData
    ? "Update ingredient"
    : "Create new Ingredient";
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      containsGluten: false,
      allergenId: null,
    },
  });

  useEffect(() => {
    if (initialData && initialData.allergen){
        form.setValue("allergenId", initialData.allergen.id)
    }
  }, [initialData, form])

  const onSubmit = async (data: IngredientFormValues) => {
    console.log(data);
    try{
      if (initialData){
        const newIngredient : Ingredient = await updateIngredientApi(data, initialData.id);
        addIngredient(newIngredient);
      }
      else{
        const newIngredient : Ingredient = await createIngredientApi(data);
        addIngredient(newIngredient);
        console.log(newIngredient);
      }
      onClose();
    }
    catch(err){
      console.log(err);
    };
  };

  const addAllergen = (allergen: Allergen) => {
    if (allergen) {
      form.setValue("allergenId", allergen.id);
    }
  };

  if (loading) return <div className="w-full p-8 flex justify-center">Loading...</div>;

  if (error) return <div className="w-full p-8 flex justify-center">Error...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredient Name</FormLabel>
              <FormControl>
                <Input placeholder="Write a new Taste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allergenId"
          render={() => (
            <FormItem>
              <FormLabel>Allergens</FormLabel>
              <FormControl>
                <ComboBox<Allergen> 
                    onSelect={addAllergen} 
                    values={allergens}
                    displayField="name"
                    valueField="id" 
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem>
          <div className="mt-2">
            {form.watch("allergenId") && (
              <div className="flex ">
                
                  <div className="flex items-center ">
                    <span>
                      {allergens.find((a) => a.id === form.watch("allergenId"))?.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      className="ml-2"
                      onClick={() => form.setValue("allergenId", null)}
                    >
                      ✕
                    </Button>
                  </div>
               
              </div>
            )}
          </div>
        </FormItem>
        <FormField
          control={form.control}
          name="containsGluten"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Contains Gluten</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">{buttonTitle}</Button>
      </form>
    </Form>
  );
};

export default IngredientForm;
