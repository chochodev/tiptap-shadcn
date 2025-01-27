import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { type Editor } from "@tiptap/core";

// pnpx shadcn add dropdown-menu tooltip scroll-area popover separator dropdown-menu label input drawer checkbox separator command tabs dropdown-menu
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NODE_HANDLES_SELECTED_STYLE_CLASSNAME =
  "node-handles-selected-style";

export function isValidUrl(url: string) {
  return /^https?:\/\/\S+$/.test(url);
}

export const duplicateContent = (editor: Editor) => {
  const { view } = editor;
  const { state } = view;
  const { selection } = state;

  editor
    .chain()
    .insertContentAt(
      selection.to,
      /* eslint-disable */
      // @ts-nocheck
      selection.content().content.firstChild?.toJSON(),
      {
        updateSelection: true,
      }
    )
    .focus(selection.to)
    .run();
};

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) {
    return str;
  }
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch {
    return null;
  }
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
