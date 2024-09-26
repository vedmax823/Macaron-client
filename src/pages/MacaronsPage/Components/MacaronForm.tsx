import React, { FC } from "react";

import * as z from "zod";
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
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";
import { Textarea } from "@/components/UI/textarea";
import ComboBox from "./UI/ComboBox";
import { useIngredients } from "@/hooks/useIngredints";
import { Checkbox } from "@/components/UI/checkbox";
import { createMacaron } from "@/http/macarons";


const formSchema = z.object({
  taste: z.string().min(5),
  pictureLink: z.string().min(5),
  price: z.coerce.number().min(1),
  advertismentPrice: z.coerce.number().min(1),
  description: z.string(),
  ingredientsIds: z.array(z.string()),
  isXl: z.boolean().default(true)
});

export type MacaronFormValues = z.infer<typeof formSchema>;

interface MacaronFormProps {
  initialData: Macaron | null;
  addNewMacaron : (macaron : Macaron) => void;
  onClose : () => void;
}

const MacaronForm: FC<MacaronFormProps> = ({ initialData, addNewMacaron, onClose }) => {
  console.log(initialData)
  const ingredients = useIngredients();
  const form = useForm<MacaronFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      taste: "",
      description: "",
      ingredientsIds: [],
      price: 2.5,
      advertismentPrice: 2.5,
      pictureLink: "m1.jpg",
      isXl: true,
    },
  });

  const onSubmit = async (data: MacaronFormValues) => {
    try{
      const macaron : Macaron = await createMacaron(data);
      addNewMacaron(macaron);
      console.log(macaron)
      onClose();
    }
    catch(err){
      console.log(err);
    };
    
  };

  const addIngredient = (ingredient: string) => {
    const currentIngredients = form.getValues("ingredientsIds");
    if (ingredient && !currentIngredients.includes(ingredient)) {
      form.setValue("ingredientsIds", [...currentIngredients, ingredient]);
    }
  };

  // Видалення інгредієнта
  const removeIngredient = (ingredient: string) => {
    const updatedIngredients = form
      .getValues("ingredientsIds")
      .filter((ing) => ing !== ingredient);
    form.setValue("ingredientsIds", updatedIngredients);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="taste"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taste</FormLabel>
              <FormControl>
                <Input placeholder="Write a new Taste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pictureLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture Link</FormLabel>
              <FormControl>
                <Input placeholder="picture link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="advertismentPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advertisment price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="advertisment price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredientsIds"
          render={() => (
          <FormItem>
          <FormLabel>Ingredients</FormLabel>
          <FormControl>
            <ComboBox 
              onSelect={addIngredient}
              values={ingredients}

            />
            {/* <Combobox
              placeholder="Select or add an ingredient"
              onSelect={(ingredient) => addIngredient(ingredient)}
            /> */}
          </FormControl>
        </FormItem>)}
        />
        
        <FormItem>
          <div className="mt-2">
            {form.watch("ingredientsIds").length > 0 && (
              <div className="flex ">
                {form.watch("ingredientsIds").map((ingredient, index) => (
                  <div key={index} className="flex items-center ">
                    <span>{ingredients.find(i => i.id === ingredient)?.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      className="ml-2"
                      onClick={() => removeIngredient(ingredient)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FormItem>
        <FormField
          control={form.control}
          name="isXl"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Is XL
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default MacaronForm;