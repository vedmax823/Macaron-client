import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import React from "react";


import IngredientsComponent from "./components/IngredientComponent/IngredientsComponent";
import AllergensComponent from "./components/AllergensComponent/AllergensComponent";

const IngredientsPage = () => {
  return (
    <div className="p-4">
    <Tabs defaultValue="ingredients">
      <TabsList>
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        <TabsTrigger value="allergens">Allergens</TabsTrigger>
      </TabsList>
      <TabsContent value="ingredients">
        <IngredientsComponent />
      </TabsContent>
      <TabsContent value="allergens">
        <AllergensComponent />
    </TabsContent>
    </Tabs>
    </div>
  );
};

export default IngredientsPage;
