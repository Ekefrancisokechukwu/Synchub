"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      size="icon"
      aria-label="Toggle Theme"
      variant={"ghost"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-3xl"
    >
      <MoonIcon className="h-6 w-6 rotate-0 duration-300 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Sun className="absolute h-6 w-6 transition-all transform rotate-90 scale-0  duration-300 dark:-rotate-180 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};
export default ThemeToggle;
