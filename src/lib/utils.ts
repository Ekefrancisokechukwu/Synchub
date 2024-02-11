import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomColor() {
  const colors = ["808080", "000", "cacd15", "1574cd", "ae15cd", "cd1565"];

  const random = Math.floor(Math.random() * colors.length);

  return "#" + colors[random];
}

randomColor();
