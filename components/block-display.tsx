import * as React from "react";
import { BlockViewer } from "./block-viewer";
import { getBlockFilesFromName } from "@/lib/utils";
// import { EditorFiles} from "@/components/tiptap/content"

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
  component,
}: {
  name: string;
  component: React.ReactNode;
}) {
  const filesContent = await getBlockFilesFromName(name);
  const item: BlockViewerItem = {
    name,
    component,
    description: "A rich text editor with TipTap and shadcn/ui components",
    files: filesContent,
  };

  const tree: TreeItem[] = item.files.reduce((acc: TreeItem[], file) => {
    const parts = file.path.split("/");
    let currentLevel = acc;

    parts.slice(0, -1).forEach((part) => {
      let existingFolder = currentLevel.find((item) => item.name === part);

      if (!existingFolder) {
        existingFolder = {
          name: part,
          children: [],
        };
        currentLevel.push(existingFolder);
      }

      currentLevel = existingFolder.children!;
    });

    currentLevel.push({
      name: parts[parts.length - 1],
      path: file.path,
    });

    return acc;
  }, []);

  const highlightedFiles: FileContent[] = item.files.map((file) => ({
    ...file,
    highlightedContent: file.content,
  }));

  return (
    // todo fix highlighing files and normal files selection
    <BlockViewer item={item} tree={tree} highlightedFiles={highlightedFiles} />
  );
}
