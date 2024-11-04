import { Button } from "@/components/UI/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/UI/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/UI/table";
import { useChangeDialog } from "@/hooks/useChangeDialog";
import { useFetchData } from "@/hooks/useFetchData";
import { getMacaronsBoxes } from "@/http/macaronsBox";

import MyTableRaw from "./MyTableRaw";
import MacaronsBoxDialog from "./MacaronsBoxDialog";

const MacaronsBoxTable = () => {
    const {data : macaronsBoxes, loading, error, addOne} = useFetchData<MacaronBox>(getMacaronsBoxes);
    const {selected : selectedMacaconsBox, isDialogOpen, handleEdit, handleCloseDialog, handleCreateNew } = useChangeDialog<MacaronBox>();
  
    if (loading) return <div className="w-full p-8 flex justify-center">Loading...</div>;
  
    if (error) return <div className="w-full p-8 flex justify-center">Error...</div>;
    return (
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <div className="w-full flex">
            <div className="w-4/6">
              <CardTitle>Macarons</CardTitle>
              <CardDescription>Manage your macarons list.</CardDescription>
            </div>
            <div className="w-2/4 flex justify-end">
              <Button onClick={handleCreateNew}>Add new</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Avaiable</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Sales
                </TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {macaronsBoxes.map((macaronsBox) => (
                <MyTableRaw
                  macaronsBox={macaronsBox}
                  key={macaronsBox.id}
                  handleOpenChangeDialog={handleEdit}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
        {isDialogOpen && (
          <MacaronsBoxDialog
            onClose={handleCloseDialog}
            addNewMacaronsBox={addOne}
            selectedMacaconsBox={selectedMacaconsBox}
          />
        )}
      </Card>
    );
};

export default MacaronsBoxTable;