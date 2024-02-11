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
    path: "",
    text: "links",
  },

  {
    icon: BarChartBig,
    path: "#",
    text: "Analytics",
  },

  {
    icon: Wrench,
    path: "#",
    text: "settings",
  },
];

const Navigation = () => {
  const getInitialCollapsedState = () => {
    const storedSidebarStatus = localStorage.getItem("collapsed");
    return storedSidebarStatus ? storedSidebarStatus === "true" : false;
  };

  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    getInitialCollapsedState()
  );

  useLayoutEffect(() => {
    localStorage.setItem("collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  return (
    <aside
      className={`h-full relative bg-white  flex-none block  border-r transition-all duration-200  ${
        isCollapsed ? "w-[69px]" : "w-[170px]"
      }`}
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
              <NavigationLink
                isCollapsed={isCollapsed}
                key={i}
                linkProps={link}
              />
            );
          })}
        </ul>

        <div className="h-36"></div>

        <button className="px-3 py-2.5  text-sm font-bold gap-x-2 rounded-3xl  bg-gray-200 flex items-center">
          <div className="text-neutral-600">
            <Sparkles
              className={`w-5 h-5 flex-shrink-0 ${!isCollapsed && "mx-auto"}`}
            />
          </div>
          <span className={` whitespace-nowrap ${isCollapsed && "hidden"}`}>
            Try pro for free
          </span>
        </button>
        <button className="px-3 py-2.5 text-sm mt-5 font-bold gap-x-2 rounded-3xl  border flex items-center">
          <Share2
            className={`w-5 h-5 text-neutral-600 ${!isCollapsed && "mx-auto"}`}
          />
          {!isCollapsed && "share"}
        </button>
        <div className="h-14 relative"></div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 grid place-items-center h-8 rounded-full border absolute right-[-1rem] z-30 bg-white hover:scale-110 transform transition-all duration-200 bottom-[5.5rem]"
        >
          <ChevronLeft
            className={`text-neutral-600 w-5 h-5 transition-all duration-200 ${
              isCollapsed && "rotate-180"
            }`}
          />
        </button>
        <LogOutButton />
      </div>
    </aside>
  );
};
export default Navigation;
