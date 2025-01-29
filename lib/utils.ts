import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cache } from "react";

// pnpx shadcn add dropdown-menu tooltip scroll-area popover separator dropdown-menu label input drawer checkbox separator command tabs dropdown-menu
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const getBlockFilesFromName = cache(async function (name: string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}.json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch files");
    }
    const data = await response.json();
    const files = data.files.map((file: { path: string; content: string }) => ({
      name: file.path.split("/").pop(),
      path: file.path,
      content: file.content,
    }));
    return files;
  } catch (error) {
    console.error("Error fetching block files:", error);
    return [];
  }
});
