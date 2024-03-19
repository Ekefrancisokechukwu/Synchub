import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ThemesType } from "./data/types";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ThemeProps = {
  theme: ThemesType;
  currrentTheme: string;
  setCurrentTheme: Dispatch<SetStateAction<string>>;
};

const Theme = ({ theme, currrentTheme, setCurrentTheme }: ThemeProps) => {
  const { changeTheme } = useTheme();

  return (
    <button
      onClick={() => {
        changeTheme(theme.themeName);
        setCurrentTheme(theme.themeName);
      }}
      className={cn(
        "rounded-md  grid grid-cols-1 border group gap-y-4 ",
        currrentTheme === theme.themeName ? "outline" : "outline-none"
      )}
    >
      <Image
        src={theme.imgUrl}
        alt={theme.themeName}
        width={200}
        height={200}
        className={cn(
          "rounded-md h-[200px] transition-all",
          currrentTheme === theme.themeName ? "scale-95" : "scale-100"
        )}
      />
    </button>
  );
};
export default Theme;
