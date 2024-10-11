import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { getMacarons } from "@/http/macarons";

import MyTableRaw from "./TableRaw";
// import { Button } from "@/components/UI/button";
import NewMacaronDialog from "./NewMacaronDialog";
import { Button } from "@/components/UI/button";
import { useFetchData } from "@/hooks/useFetchData";
import { useChangeDialog } from "@/hooks/useChangeDialog";

const MacaronsTable = () => {
  const {data : macarons, loading, error, addOne} = useFetchData<Macaron>(getMacarons);
  const {selected : selectedMacacon, isDialogOpen, handleEdit, handleCloseDialog, handleCreateNew } = useChangeDialog<Macaron>();

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
            {macarons.map((macaron) => (
              <MyTableRaw
                macaron={macaron}
                key={macaron.id}
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
        <NewMacaronDialog
          onClose={handleCloseDialog}
          addNewMacaron={addOne}
          selectedMacacon={selectedMacacon}
        />
      )}
    </Card>
  );
};

export default MacaronsTable;
