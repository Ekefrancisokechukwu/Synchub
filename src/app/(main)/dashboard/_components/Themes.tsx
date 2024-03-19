"use client";

import { useEffect, useState } from "react";
import Theme from "./Theme";
import { themesCards } from "./data/themesCard";
import { LinkTheme } from "@/app/(public)/(routes)/sync.hub/[usernameId]/_components/ui/link";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const Themes = () => {
  const initialTheme = localStorage.getItem("theme") || "default";
  const [currrentTheme, setCurrentTheme] = useState(initialTheme);
  const { changeTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem("synchubTheme", currrentTheme);
  }, [currrentTheme]);

  return (
    <div className="mt-6 ">
      <h1 className="text-[1.1rem] text-neutral-900 font-semibold">Themes</h1>
      <div className="mt-3 bg-white rounded-lg p-5">
        <div className="grid gap-x-2 gap-y-4 grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))]">
          <button
            onClick={() => {
              changeTheme("default");
              setCurrentTheme("default");
            }}
            className={cn(
              " border rounded-lg ",
              currrentTheme === "default" ? "outline" : "outline-none"
            )}
          >
            <div
              className={cn(
                "space-y-2",
                currrentTheme === "default" ? "scale-95" : "scale-100"
              )}
            >
              <LinkTheme
                variant={"default"}
                className=" py-2 w-[85%] mx-auto"
              ></LinkTheme>
              <LinkTheme
                variant={"default"}
                className=" py-2 w-[85%] mx-auto"
              ></LinkTheme>
              <LinkTheme
                variant={"default"}
                className=" py-2 w-[85%] mx-auto"
              ></LinkTheme>
            </div>
          </button>
          {themesCards.map((theme, i) => {
            return (
              <Theme
                currrentTheme={currrentTheme}
                setCurrentTheme={setCurrentTheme}
                key={i}
                theme={theme}
              />
            );
          })}
          <button
            style={{ height: 200 }}
            onClick={() => {
              changeTheme("_3dWhite");
              setCurrentTheme("_3dWhite");
            }}
            className={cn(
              " border rounded-lg ",
              currrentTheme === "_3dWhite" ? "outline" : "outline-none"
            )}
          >
            <div
              className={cn(
                "space-y-2",
                currrentTheme === "_3dWhite" ? "scale-95 " : "scale-100 "
              )}
            >
              <LinkTheme
                variant={"_3dWhite"}
                className=" py-2 w-[85%] mx-auto"
              ></LinkTheme>
              <LinkTheme
                variant={"_3dWhite"}
                className=" py-2 w-[85%] mx-auto"
              ></LinkTheme>
              <LinkTheme
                variant={"_3dWhite"}
                className=" py-2 w-[85%] mx-auto"
              ></LinkTheme>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Themes;
