"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { linkProps } from "./Navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type props = {
  linkProps: linkProps;
  collapsed: boolean;
};

const NavigationLink = ({ linkProps, collapsed }: props) => {
  const Icon = linkProps.icon;
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={3} disableHoverableContent>
      <li className="overflow-hidden ">
        <Tooltip>
          {collapsed && (
            <TooltipContent
              hideWhenDetached={true}
              align="start"
              side="right"
              className="capitalize bg-stone-800 text-white"
            >
              {linkProps.text}
            </TooltipContent>
          )}
          <TooltipTrigger asChild className="w-full">
            <Link
              href={linkProps.path}
              className={cn(
                "text-base hover:bg-gray-100 rounded-md  transition-colors duration-300  font-medium flex items-center gap-x-2 py-1.5 px-2 text-neutral-500",
                pathname === linkProps.path && "bg-gray-100"
              )}
            >
              <span className={`grid  ${collapsed && "ml-1"} `}>
                <Icon
                  className={`w-5 h-5 grid place-items-center flex-shrink-0 `}
                />
              </span>

              <span
                className={`whitespace-nowrap capitalize ${
                  collapsed && "hidden"
                }`}
              >
                {linkProps.text}
              </span>
            </Link>
          </TooltipTrigger>
        </Tooltip>
      </li>
    </TooltipProvider>
  );
};

export default NavigationLink;
