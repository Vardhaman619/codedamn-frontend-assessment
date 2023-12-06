"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import SearchIcon from "../icons/custom/search";
import { useRouter } from "next/navigation";
const Actions = [
  {
    name: "Edit Profile",
    href: "/edit",
  },
  {
    name: "Edit Socials",
    href: "/edit/socials",
  },
  {
    name: "Edit Resume",
    href: "/edit/resume",
  },
  {
    name: "Edit Portfolio",
    href: "/edit/portfolio",
  },
];
export default function Search() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  function handelonSelect(href: string) {
    router.push(href);
    setOpen(false);
  }
  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 rounded-lg border-zinc-200 p-0 text-muted-foreground xl:h-10 xl:w-64 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search</span>
        <span className="sr-only">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {Actions.map((actionObj) => {
              return (
                <CommandItem
                  onSelect={() => handelonSelect(actionObj.href)}
                  key={actionObj.name}
                >
                  {actionObj.name}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
