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

type WithIdAndNameOrTaste = {
  id: string | number;
} & ({ name: string; taste?: never } | { taste: string; name?: never });

interface ComboboxProps<T extends WithIdAndNameOrTaste> {
  onSelect: (value: T) => void;
  values: T[];
  displayField: keyof T;
  valueField: keyof T;
  placeholderText: string;
  oneSelect: boolean;
  selectedValue: string | string[] | null;
}

const ComboBox = <T extends WithIdAndNameOrTaste>({
  onSelect,
  values,
  displayField,
  valueField,
  placeholderText,
  oneSelect,
  selectedValue,
}: ComboboxProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const selectedItem =
    selectedValue && oneSelect
      ? values.find((v) => v.id === selectedValue)
      : null;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full"
        >
          {selectedItem
            ? selectedItem.name ?? selectedItem.taste // Виводимо `name`, якщо він є, або `taste`
            : "Select ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> 
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={placeholderText} />
          <CommandList>
            <CommandEmpty>Nothing found</CommandEmpty>
            <CommandGroup>
              {values.map((value) => (
                <CommandItem
                  key={String(value[valueField])}
                  value={String(value[valueField])}
                  onSelect={() => {
                    onSelect(value);
                    if (oneSelect) setOpen(false);
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
