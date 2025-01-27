import * as React from "react";
import { BlockViewer } from "./block-viewer";
import { EditoFiles} from "@/components/tiptap/content"

interface FileContent {
  name: string;
  path: string;
  content: string;
  highlightedContent?: string;
}

interface TreeItem {
  name: string;
  path?: string;
  children?: TreeItem[];
}

interface BlockViewerItem {
  name: string;
  component: React.ReactNode;
  description: string;
  files: FileContent[];
}

export async function BlockDisplay({ 
  name, 
  component 
}: { 
  name: string; 
  component: React.ReactNode;
}) {
  const item: BlockViewerItem = {
    name,
    component,
    description: "A rich text editor with TipTap and shadcn/ui components",
    files: EditoFiles
  };

  const tree: TreeItem[] = [
    {
      name: "components",
      children: [
        {
          name: "tiptap",
          children: [
            {
              name: "rich-text-editor.tsx",
              path: "components/tiptap/rich-text-editor.tsx",
            },
          ],
        },
      ],
    },
  ];

  const highlightedFiles: FileContent[] = item.files.map((file) => ({
    ...file,
    highlightedContent: file.content,
  }));

  return (
    <BlockViewer item={item} tree={tree} highlightedFiles={highlightedFiles} />
  );
}
