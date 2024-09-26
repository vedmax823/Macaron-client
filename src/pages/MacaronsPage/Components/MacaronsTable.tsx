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

import { useEffect, useState } from "react";
import MyTableRaw from "./TableRaw";
// import { Button } from "@/components/UI/button";
import NewMacaronDialog from "./NewMacaronDialog";
import { Button } from "@/components/UI/button";

const MacaronsTable = () => {
    const [macarons, setMacarons] = useState<Macaron[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedMacacon, setSelectedMacaron] = useState<Macaron | null>(null)
    useEffect(() => {
        const getAndSetMacarons = async () => {
            try{
                const macaronsList = await getMacarons();
                console.log(macaronsList);

                setMacarons(macaronsList);
            }
            catch(err){
                console.log(err)
            }
        }
        getAndSetMacarons();
    }, [])

    const handleOpenDialog = () => {
      setSelectedMacaron(null);
      setIsDialogOpen(true); 
    };
  
    const handleCloseDialog = () => {
      setIsDialogOpen(false); // Закриваємо модальне вікно
    };

    const addNewMacaron = (macaron : Macaron) => {
      setMacarons((prev) => [macaron, ...prev] )
    }

    const handleOpenChangeDialog = (macaron : Macaron) => {
      setSelectedMacaron(macaron);
      setIsDialogOpen(true); 
    }
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <div className="w-full flex">
          <div className="w-4/6">
          <CardTitle>Macarons</CardTitle>
        <CardDescription>
          Manage your macarons list.
        </CardDescription>

          </div>
          <div className="w-2/4 flex justify-end">
            <Button onClick={handleOpenDialog}>Add new</Button>
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
            {
                macarons.map(macaron => (
                    <MyTableRaw 
                      macaron={macaron} 
                      key={macaron.id}
                      handleOpenChangeDialog={handleOpenChangeDialog}
                    />
                ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
      {isDialogOpen && <NewMacaronDialog onClose={handleCloseDialog} addNewMacaron={addNewMacaron} selectedMacacon={selectedMacacon} />}
    </Card>
  );
};

export default MacaronsTable;
