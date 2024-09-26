import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
 
// import { cn } from "@/lib/utils"


import { Button } from "@/components/UI/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/UI/command"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/popover"
import { FC } from "react"
 

interface ComboboxProps {
    onSelect : (value : string) => void;
    values : Ingredient[]
}
 
const ComboBox : FC<ComboboxProps> = ({onSelect, values}) => {
  const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState("")
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full"
        >
          {/* {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."} */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> Select ingredients
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
                  key={value.id}
                  value={value.id}
                  onSelect={(currentValue) => {
                      onSelect(currentValue)
                      setOpen(false)
                    }
                  }
                >
                  {/* <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                  {value.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboBox;