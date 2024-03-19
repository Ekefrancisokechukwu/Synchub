import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "w-full  flex items-center justify-between  px-5 py-3",
  {
    variants: {
      variant: {
        default:
          "shadow hover:bg-gray-100 rounded-2xl duration-500 transition-all bg-neutral-50 text-neutral-500 ",
        dark: "hover:bg-[#393939] rounded-lg duration-500 transition-all bg-[#222222] text-[#c6c3c3] ",
        rounded:
          "hover:scale-[1.08] ease-bounce bg-neutral-50 rounded-full shadow transition-all  text-[#000] duration-500 ",
        gradients:
          "hover:scale-[1.08] ease-bounce bg-neutral-50/50 rounded-full shadow  text-[#fff] transition-all  duration-500 ",
        simple: "",
        _3dWhite: "button-54 rounded-lg  bg-white",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const LinkTheme = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <a
        className={cn(linkVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
LinkTheme.displayName = "LinkTheme";

export { LinkTheme, linkVariants };
