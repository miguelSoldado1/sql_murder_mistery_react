import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getLocalStorageKey = (pathname: string) => {
  return `puzzle-${pathname.substring(1)}-solved`;
};
