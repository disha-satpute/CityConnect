import * as React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
