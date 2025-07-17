"use client";
import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";

export const Select = RadixSelect.Root;
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className = "", ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={`flex items-center justify-between rounded border px-3 py-2 w-full bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand transition ${className}`}
    {...props}
  />
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = RadixSelect.Value;

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className = "", ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      className={`rounded border bg-white dark:bg-neutral-900 shadow-lg z-50 ${className}`}
      {...props}
    />
  </RadixSelect.Portal>
));
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className = "", children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={`px-3 py-2 cursor-pointer hover:bg-primary/10 focus:bg-primary/20 rounded transition ${className}`}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = "SelectItem"; 