import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand transition ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input"; 