import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { linkProps } from "./Navigation";

type props = {
  linkProps: linkProps;
  isCollapsed: boolean;
};

const NavigationLink = ({ linkProps, isCollapsed }: props) => {
  const Icon = linkProps.icon;

  return (
    <TooltipProvider delayDuration={3} disableHoverableContent>
      <li className="overflow-hidden ">
        <Tooltip>
          {isCollapsed && (
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
              className="text-base hover:bg-gray-100 rounded-md  transition-colors duration-300  font-medium flex items-center gap-x-2 py-1.5 px-2 text-neutral-500"
            >
              <span className={`grid  ${isCollapsed && "ml-1"} `}>
                <Icon
                  className={`w-5 h-5 grid place-items-center flex-shrink-0 `}
                />
              </span>

              <span
                className={`whitespace-nowrap capitalize ${
                  isCollapsed && "hidden"
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
