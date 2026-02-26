import React from "react";


function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-white shadow-md p-3 sm:p-4 md:p-5 w-full",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-2 sm:p-3 md:p-4", className)}
    {...props}
  />
));

CardContent.displayName = "CardContent";
