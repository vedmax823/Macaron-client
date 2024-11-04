import FormattedDate from "@/components/MyUI/FormatedDate";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/UI/dropdown-menu";
import { TableCell, TableRow } from "@/components/UI/table";
import { MoreHorizontal } from "lucide-react";
import { FC } from "react";

interface TableRawProps {
  macaronsBox: MacaronBox;
  handleOpenChangeDialog : (macaron : MacaronBox) => void;
}

const MyTableRaw: FC<TableRawProps> = ({ macaronsBox, handleOpenChangeDialog }) => {
  return (
    
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <img
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={`${macaronsBox.pictureLink}`}
            width="64"
          />
        </TableCell>
        <TableCell className="font-medium">{macaronsBox.name}</TableCell>
        <TableCell>
          <Badge variant="outline">{macaronsBox.isXl ? "big" : "small"}</Badge>
        </TableCell>
        <TableCell>
          <Badge variant="outline">{macaronsBox.isCurrentlyAvailable ? "no" : "yes"}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{macaronsBox.price}</TableCell>
        <TableCell className="hidden md:table-cell">25</TableCell>
        <TableCell className="hidden md:table-cell">
          <FormattedDate isoDateString={macaronsBox.createdAt}/>
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
              <DropdownMenuItem onClick={() => handleOpenChangeDialog(macaronsBox)}>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
  );
};

export default MyTableRaw;
