import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function teamCombobox({ teams, onSelect, value }) {
  const [open, setOpen] = useState(false)

  //console.log(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? teams.find((team) => team.id === value)?.name
            : "Select team members..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border border-black rounded">
        <Command className="bg-[url('/team-background.jpg')] bg-center rounded w-full max-h-52 ">
          <CommandInput placeholder="Search team..." className=""/>
          <CommandList >
          <CommandEmpty>No team found.</CommandEmpty>

          <CommandGroup>
            {teams.map((team) => (
              <CommandItem
                key={team.id}
                onSelect={() => {
                  onSelect(team.id)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === team.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {team.name}
              </CommandItem>
            ))}
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
