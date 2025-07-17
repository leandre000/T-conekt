"use client";
import * as React from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;
export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>
>(({ className = "", ...props }, ref) => (
  <RadixDropdownMenu.Portal>
    <RadixDropdownMenu.Content
      ref={ref}
      className={
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white dark:bg-neutral-900 p-1 shadow-lg animate-in fade-in-80 " +
        className
      }
      sideOffset={4}
      {...props}
    />
  </RadixDropdownMenu.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Item>,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>
>(({ className = "", ...props }, ref) => (
  <RadixDropdownMenu.Item
    ref={ref}
    className={
      "flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors focus:bg-primary/10 focus:text-primary " +
      className
    }
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Label>,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>
>(({ className = "", ...props }, ref) => (
  <RadixDropdownMenu.Label
    ref={ref}
    className={"px-2 py-1.5 text-sm font-semibold " + className}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>
>(({ className = "", ...props }, ref) => (
  <RadixDropdownMenu.Separator
    ref={ref}
    className={"-mx-1 my-1 h-px bg-muted " + className}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"; 