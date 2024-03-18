import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const stacksVariants = cva("w-full   rounded-3xl  bg-neutral-50 py-4 px-4", {
  variants: {
    variant: {
      default:
        "shadow hover:bg-gray-100 rounded-2xl duration-500 transition-all bg-neutral-50 text-neutral-500 ",
      dark: " rounded-lg duration-500  bg-[#222222] text-[#c6c3c3] ",
      rounded:
        " bg-neutral-50 rounded-3xl shadow transition-all  duration-500 ",
      gradients:
        " bg-neutral-50/50 rounded-3xl shadow transition-all  duration-500 ",
      simple: "",
      _3dWhite: "stacks-box rounded-lg  bg-white",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stacksVariants> {
  asChild?: boolean;
}

const StacksBox = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(stacksVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
StacksBox.displayName = "StacksBox";

export { StacksBox, stacksVariants };
