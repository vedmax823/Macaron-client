import { FC } from "react";

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
// import ComboBox from "../../../components/MyUI/ComboBox";
import { Checkbox } from "@/components/UI/checkbox";
import UploadPicture from "@/pages/MacaronsPage/Components/UploadPicture";
import { createMacaronsBoxApi, updateMacaronsBoxApi } from "@/http/macaronsBox";
import { getMacarons } from "@/http/macarons";
import { useFetchData } from "@/hooks/useFetchData";
// import { Select } from "@radix-ui/react-select";
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/UI/select";

import SmallSets from "./UI/SmallSets";

const formSchema = z.object({
  name: z.string().min(5),
  pictureLink: z.string().min(5),
  price: z.coerce.number().min(1),
  advertismentPrice: z.coerce.number().min(1),
  description: z.string(),
  numberOfMacarons: z.coerce
    .number({
      required_error: "Number of macarons is required",
      invalid_type_error: "Number of macarons must be a number",
    })
    .int()
    .positive()
    .min(1, { message: "Count should be more then 0" }),
  isFixed: z.boolean().default(false),
  isXl: z.boolean().default(true),
  isCurrentlyAvailable: z.boolean().default(false),
  smallMacaronsSets: z.array(
    z.object({
      count: z.number(),
      macaronId: z.string(),
    })
  ),
});

export type MacaronsBoxFormValues = z.infer<typeof formSchema>;

interface MacaronFormProps {
  initialData: MacaronBox | null;
  addNewMacaronBox: (macaronsBox: MacaronBox) => void;
  onClose: () => void;
}

const MacaronsBoxForm: FC<MacaronFormProps> = ({
  initialData,
  addNewMacaronBox,
  onClose,
}) => {
  
  const { data: macarons, loading, error } = useFetchData<Macaron>(getMacarons);
  const form = useForm<MacaronsBoxFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 2.5,
      advertismentPrice: 2.5,
      pictureLink: "",
      numberOfMacarons: 1,
      isFixed: false,
      isXl: true,
      isCurrentlyAvailable: true,
      smallMacaronsSets: [],
    },
  });

  const buttonTitle = initialData ? "Update Macaron Box" : "Create Macaron Box";

  const onSubmit = async (data: MacaronsBoxFormValues) => {
    console.log(data)
    try {
      if (initialData) {
        const newMacaronBox = await updateMacaronsBoxApi(data, initialData.id);
        addNewMacaronBox(newMacaronBox);
      } else {
        const macaronsBox: MacaronBox = await createMacaronsBoxApi(data);
        addNewMacaronBox(macaronsBox);
        console.log(macaronsBox);
      }
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const addSmallSet = (count : number, id : string) => {
    if (!id) throw new Error("Please select macaron");
    const macaronsSets = form.getValues("smallMacaronsSets"); 
    const macaronSet = macaronsSets.find(ms => ms.macaronId == id);
    if (macaronSet) throw new Error("This macaron already exsist")
    if (count < 1) throw new Error("Count can't be less than 1");
    form.setValue("smallMacaronsSets", [...macaronsSets, { count: count, macaronId: id }]);
  }

  // const onChangeHandle = (macaronId : string) => {
  //   const smallSets = form.getValues("macaronsSets");
  //   const macaronIndex = smallSets.findIndex(m => m.idMacaron == macaronId)
  //   if (macaronIndex == -1) return 
  //   const smallSet = smallSets[macaronIndex]
  //   const newSmallSets = [...smallSets.slice(0, macaronIndex - 1), ...smallSets.slice(macaronIndex)];
  //   form.setValue("macaronsSets", newSmallSets);

  // }

  const removeFromSets = (macaronId : string) => {
    const smallSets = form.getValues("smallMacaronsSets").filter(m => m.macaronId !== macaronId);
    form.setValue("smallMacaronsSets", smallSets);
  }


  //   const addIngredient = (ingredient: Ingredient) => {
  //     const currentIngredients = form.getValues("ingredientsIds");
  //     if (ingredient && !currentIngredients.includes(ingredient.id)) {
  //       form.setValue("ingredientsIds", [...currentIngredients, ingredient.id]);
  //     }
  //   };

  const setPictureLink = (link: string) => {
    form.setValue("pictureLink", link);
  };

  //   const removeIngredient = (ingredient: string) => {
  //     const updatedIngredients = form
  //       .getValues("ingredientsIds")
  //       .filter((ing) => ing !== ingredient);
  //     form.setValue("ingredientsIds", updatedIngredients);
  //   };
  if (loading)
    return <div className="w-full p-8 flex justify-center">Loading...</div>;

  if (error)
    return <div className="w-full p-8 flex justify-center">Error...</div>;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Macarons Box Name</FormLabel>
              <FormControl>
                <Input placeholder="Write a name for macarons box" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pictureLink"
          render={() => (
            <FormItem>
              <FormLabel>Picture Link</FormLabel>
              <FormControl>
                {/* <Input placeholder="picture link" {...field} /> */}
                <UploadPicture
                  pictureLink={form.getValues("pictureLink")}
                  setPictureLink={setPictureLink}
                  container="macaronssets"
                />
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
          name="numberOfMacarons"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Count of macarons</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Count of macarons"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                <FormLabel>Is XL</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFixed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is Fixed</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="smallMacaronsSets"
          render={() => (
            <div className="mt-2">
              {form.watch("isFixed") && (
                <SmallSets macarons={macarons} macaronsSets={form.watch("smallMacaronsSets")} addSmallSet={addSmallSet} removeFromSets={removeFromSets}/>
              )}
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="isCurrentlyAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Currently Available</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">{buttonTitle}</Button>
      </form>
    </Form>
  );
};

export default MacaronsBoxForm;
