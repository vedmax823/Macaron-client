
import { Link } from "react-router-dom";
import { Command,  CommandGroup, CommandItem, CommandList, CommandSeparator } from "../UI/command";
import { INGREDIENTS_ROUTE, MACARONS_ROUTE } from "@/routes/routesConsts";

const SideMenu = () => {

    return (
        <Command className="mt-4 border border-gray-200">
            {/* <CommandInput placeholder="Type a command or search..." /> */}
            <CommandList>
                {/* <CommandEmpty>No results found.</CommandEmpty> */}
                <CommandGroup
                >
                    <CommandItem><Link to={INGREDIENTS_ROUTE}>Ingredients</Link></CommandItem>
                    <CommandItem><Link to={MACARONS_ROUTE}>Macarons</Link></CommandItem>
                    <CommandItem>Users</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>

    );
};


export default SideMenu;