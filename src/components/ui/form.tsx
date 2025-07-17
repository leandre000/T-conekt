import * as React from "react";
import { useFormContext, Controller, FieldValues, UseFormReturn } from "react-hook-form";

export function Form({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function FormField({ name, control, render }: { name: string; control: any; render: (props: any) => React.ReactNode }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => render({ field, fieldState })}
    />
  );
}

export function FormItem({ children, className = "mb-4" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function FormLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return <label htmlFor={htmlFor} className="block font-medium mb-1">{children}</label>;
}

export function FormControl({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function FormMessage({ children }: { children?: React.ReactNode }) {
  return children ? <div className="text-xs text-red-500 mt-1">{children}</div> : null;
} 