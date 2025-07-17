import * as React from "react";
import * as RadixPopover from "@radix-ui/react-popover";

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, ...props }, ref) => (
  <RadixPopover.Content
    ref={ref}
    className={"z-50 rounded-md border bg-white dark:bg-neutral-900 p-2 shadow-lg outline-none " + (className || "")}
    sideOffset={4}
    {...props}
  />
));
PopoverContent.displayName = RadixPopover.Content.displayName; 