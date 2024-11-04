import FormattedDate from "@/components/MyUI/FormatedDate";
import { Button } from "@/components/UI/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/UI/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const createAllergenColumns = (
  handleEdit: (allergen: Allergen) => void
): ColumnDef<Allergen>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "link",
    header: "Picture",
    cell: ({ row }) => {
      const link = row.getValue("link");
      return link ? <img
          alt="Allergen image"
          className="aspect-square rounded-md object-cover"
          height="30"
          src={row.getValue("link")}
          width="30"
        /> : "";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      // const allergen: Allergen | null = ;
      return <FormattedDate isoDateString={row.getValue("createdAt")} />;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => {
      // const allergen: Allergen | null = ;
      return <FormattedDate isoDateString={row.getValue("updatedAt")} />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const allergen = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(allergen)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete", allergen)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
