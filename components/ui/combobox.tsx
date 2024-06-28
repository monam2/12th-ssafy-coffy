"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const classNumber = [
  {
    value: 1,
    label: "1반 (221호)",
  },
  {
    value: 2,
    label: "2반 (222호)",
  },
];

interface ComboboxProps {
  setClassNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function Combobox({ setClassNumber }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(1);

  const onClickHandler = (val: number) => {
    setValue(val);
    setOpen(false);
    setClassNumber(val);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] --text-color text-base font-semibold"
        >
          {value
            ? classNumber.find((classNum) => classNum.value === value)?.label
            : "반을 입력하세요."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0 bg-white">
        <Command>
          <CommandList>
            <CommandGroup>
              {classNumber.map((classNum) => (
                <CommandItem
                  className="cursor-pointer"
                  key={classNum.value}
                  value={`${classNum.value}`}
                >
                  <div
                    className="w-full text-black hover:text-blue-400 hover:font-semibold transition-all hover:transition-all text-center"
                    onClick={() => onClickHandler(classNum.value)}
                  >
                    {classNum.label}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
