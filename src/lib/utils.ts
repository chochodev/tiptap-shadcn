import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// pnpx shadcn add dropdown-menu tooltip scroll-area popover separator dropdown-menu label input drawer checkbox separator command tabs dropdown-menu
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.VITE_PUBLIC_APP_URL}${path}`;
}