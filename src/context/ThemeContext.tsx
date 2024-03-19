"use client";

import { useMutation } from "convex/react";
import React from "react";
import { api } from "../../convex/_generated/api";
import { useCurrentUser } from "@/hooks/useCurrentAccount";

export type ThemeProps = {
  backgroundImage?: string;
  backgroundGradient?: string;
  backgroundColor?: string;
  textColor: string;
  textHeading: string;
  variant?:
    | "dark"
    | "rounded"
    | "_3dWhite"
    | "simple"
    | "gradients"
    | "default";
};

// Define theme options
interface ThemeOptions {
  [key: string]: ThemeProps;
}

// Define context type
interface ThemeContextType {
  theme: ThemeProps;
  changeTheme: (selectedTheme: string) => void;
}
export const themes: ThemeOptions = {
  default: {
    backgroundColor: "#fff",
    textColor: "#7e7e7e",
    textHeading: "#1d1d1dd8",
    variant: "default",
  },

  _3dWhite: {
    backgroundColor: "#fff",
    textColor: "#7e7e7e",
    textHeading: "#1d1d1dd8",
    variant: "_3dWhite",
  },
  lake: {
    backgroundColor: "#ffff",
    backgroundImage: "url(${theme.backgroundImage})",
    textColor: "#000",
    textHeading: "#000",
    variant: "rounded",
  },
  dark: {
    backgroundImage: "url(${theme.backgroundImage})",

    backgroundColor: "#000",
    textColor: "#cfcecedb",
    textHeading: "#fff",
    variant: "dark",
  },

  gradientPurple: {
    backgroundImage:
      "linear-gradient(0deg, rgb(130, 34, 148), rgb(233, 53, 248))",
    textColor: "#fff",
    textHeading: "#fff",
    variant: "gradients",
  },
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<ThemeProps>(themes.default);
  const updateStyle = useMutation(api.synchubAccount.updateStyle);
  const { currentUser } = useCurrentUser();

  const changeTheme = (selectedTheme: string) => {
    if (!currentUser) return;
    setTheme(themes[selectedTheme]);
    updateStyle({ id: currentUser?._id, style: themes[selectedTheme] });
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
