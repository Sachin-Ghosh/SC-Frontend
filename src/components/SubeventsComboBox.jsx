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

export function SubeventCombobox({ subevents, onSelect, value }) {
  const [open, setOpen] = useState(false)

  console.log(value)

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
            ? subevents.find((subevent) => subevent.id === value)?.name
            : "Select subevent..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border border-black rounded">
        <Command className="bg-[url('/event-background.jpg')] bg-center bg-cover rounded w-full max-h-52 ">
          <CommandInput placeholder="Search subevent..." className=""/>
          <CommandList >
          <CommandEmpty>No subevent found.</CommandEmpty>

          <CommandGroup>
            {subevents.map((subevent) => (
              <CommandItem
                key={subevent.id}
                onSelect={() => {
                  onSelect(subevent.id)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === subevent.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {subevent.name}
              </CommandItem>
            ))}
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
