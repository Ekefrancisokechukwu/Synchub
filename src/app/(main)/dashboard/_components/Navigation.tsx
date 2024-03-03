"use client";

import {
  BarChartBig,
  ChevronLeft,
  Computer,
  LucideIcon,
  Share2,
  Sparkles,
  StretchHorizontal,
  Wrench,
} from "lucide-react";
import NavigationLink from "./navigation-link";
import { dancingScript } from "@/components/ui/fonts";
import { useEffect, useLayoutEffect, useState } from "react";
import LogOutButton from "./LogOutButton";
import { cn } from "@/lib/utils";

export type linkProps = {
  icon: LucideIcon;
  path: string;
  text: string;
};

const links: linkProps[] = [
  {
    icon: Computer,
    path: "/dashboard",
    text: "appearance",
  },
  {
    icon: StretchHorizontal,
    path: "/dashboard/links",
    text: "links",
  },

  {
    icon: BarChartBig,
    path: "#",
    text: "Analytics",
  },

  {
    icon: Wrench,
    path: "/dashboard/settings",
    text: "settings",
  },
];

const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const isCollapsed = localStorage.getItem("isCollapsed");
    if (isCollapsed) {
      setCollapsed(isCollapsed === "true");
    }
  }, []);

  return (
    <aside
      className={cn(
        "h-full relative bg-white  flex-none block  border-r transition-width duration-300 ease-in-out",
        collapsed ? "w-[69px]" : "md:w-[170px]"
      )}
    >
      <div className="px-3 overflow-hidden">
        <div
          className={`${dancingScript.className} bg-clip-text p-2  font-bold text-5xl bg-gradient-to-r text-transparent from-slate-600 via-blue-500 to-blue-700 inline-block `}
        >
          sy
        </div>

        <ul className=" space-y-3 mt-3">
          {links.map((link, i) => {
            return (
              <NavigationLink collapsed={collapsed} key={i} linkProps={link} />
            );
          })}
        </ul>

        <div className="h-36"></div>

        <button className="px-3 py-2.5  text-sm font-bold gap-x-2 rounded-3xl  bg-gray-200 flex items-center">
          <div className="text-neutral-600">
            <Sparkles
              className={`w-5 h-5 flex-shrink-0 ${!collapsed && "mx-auto"}`}
            />
          </div>
          <span className={` whitespace-nowrap ${collapsed && "hidden"}`}>
            Try pro for free
          </span>
        </button>
        <button className="px-3 py-2.5 text-sm mt-5 font-bold gap-x-2 rounded-3xl  border flex items-center">
          <Share2
            className={`w-5 h-5 text-neutral-600 ${!collapsed && "mx-auto"}`}
          />
          {!collapsed && "share"}
        </button>
        <div className="h-14 relative"></div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 md:grid  hidden place-items-center h-8 rounded-full border absolute right-[-1rem] z-30 bg-white hover:scale-110 transform transition-all duration-200 bottom-[5.5rem]"
        >
          <ChevronLeft
            className={`text-neutral-600 w-5 h-5 transition-all duration-200 ${
              collapsed && "rotate-180"
            }`}
          />
        </button>
        <LogOutButton />
      </div>
    </aside>
  );
};
export default Navigation;
