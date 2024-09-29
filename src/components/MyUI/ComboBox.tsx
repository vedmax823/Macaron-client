import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils"

import { Button } from "@/components/UI/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/UI/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/popover";


interface ComboboxProps<T> {
  onSelect: (value: T) => void;
  values: T[];
  displayField: keyof T;
  valueField: keyof T;
}

const ComboBox = <T,>({
  onSelect,
  values,
  displayField,
  valueField,
}: ComboboxProps<T>) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full"
        >
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> Select
          ingredients
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {values.map((value) => (
                <CommandItem
                  key={String(value[valueField])}
                  value={String(value[valueField])}
                  onSelect={() => {
                    onSelect(value);
                    setOpen(false);
                  }}
                >
                  {String(value[displayField])}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
