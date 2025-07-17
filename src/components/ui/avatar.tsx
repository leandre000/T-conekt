"use client";
import * as React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";

export const Avatar = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Root>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Root>
>(({ className = "", ...props }, ref) => (
  <RadixAvatar.Root
    ref={ref}
    className={
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-800 " + className
    }
    {...props}
  />
));
Avatar.displayName = "Avatar";

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Image>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Image>
>(({ className = "", ...props }, ref) => (
  <RadixAvatar.Image
    ref={ref}
    className={"aspect-square h-full w-full object-cover " + className}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Fallback>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Fallback>
>(({ className = "", ...props }, ref) => (
  <RadixAvatar.Fallback
    ref={ref}
    className={
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-bold " + className
    }
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback"; 