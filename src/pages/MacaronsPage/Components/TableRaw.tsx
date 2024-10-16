import FormattedDate from "@/components/MyUI/FormatedDate";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/UI/dropdown-menu";
import { TableCell, TableRow } from "@/components/UI/table";
import { MoreHorizontal } from "lucide-react";
import { FC } from "react";

interface TableRawProps {
  macaron: Macaron;
  handleOpenChangeDialog : (macaron : Macaron) => void;
}

const MyTableRaw: FC<TableRawProps> = ({ macaron, handleOpenChangeDialog }) => {
  return (
    
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <img
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={`${macaron.pictureLink}`}
            width="64"
          />
        </TableCell>
        <TableCell className="font-medium">{macaron.taste}</TableCell>
        <TableCell>
          <Badge variant="outline">{macaron.isXl ? "big" : "small"}</Badge>
        </TableCell>
        <TableCell>
          <Badge variant="outline">{macaron.isCurrentlyUnavailable ? "no" : "yes"}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{macaron.price}</TableCell>
        <TableCell className="hidden md:table-cell">25</TableCell>
        <TableCell className="hidden md:table-cell">
          <FormattedDate isoDateString={macaron.createdAt}/>
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleOpenChangeDialog(macaron)}>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
  );
};

export default MyTableRaw;
