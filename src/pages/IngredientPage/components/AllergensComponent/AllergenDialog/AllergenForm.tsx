import React, { FC } from "react";
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
import { Button } from "@/components/UI/button";
import { createAllergenApi, updateAllergenApi } from "@/http/allergens";

const formSchema = z.object({
  name: z.string().min(1),
  link: z.string()
});

export type AllergenFormValues = z.infer<typeof formSchema>;

interface AllergenFormProps {
  initialData: Allergen | null;
  addAllergen : (Allergen : Allergen) => void;
  onClose: () => void;
}

const AllergenForm: FC<AllergenFormProps> = ({ initialData, onClose, addAllergen }) => {

  const buttonTitle = initialData
    ? "Update allergen"
    : "Create new allergen";
  const form = useForm<AllergenFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      link: "",
    },
  });

  const onSubmit = async (data: AllergenFormValues) => {
    console.log(data);
    try{
      if (initialData){
        const newAllergen : Allergen = await updateAllergenApi(data, initialData.id);
        addAllergen(newAllergen);
      }
      else{
        const newAllergen : Allergen = await createAllergenApi(data);
        addAllergen(newAllergen);
        console.log(newAllergen);
      }
      onClose();
    }
    catch(err){
      console.log(err);
    };
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergen Name</FormLabel>
              <FormControl>
                <Input placeholder="Write a new allergan name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergen Name</FormLabel>
              <FormControl>
                <Input placeholder="Picture link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{buttonTitle}</Button>
      </form>
    </Form>
  );
};

export default AllergenForm;
