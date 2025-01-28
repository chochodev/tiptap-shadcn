export const content = `
  <h1>
      <span style="color: var(--editor-text-default)">Explore </span>the
      <span><mark data-color="var(--editor-highlight-green)"
              style="background-color: var(--editor-highlight-green); color: inherit">tiptap</mark></span>
      rich text <span style="color: var(--editor-text-yellow)">editor</span> with
      <mark data-color="var(--editor-highlight-yellow)"
          style="background-color: var(--editor-highlight-yellow); color: inherit">shadcn-ui</mark>
      components 📝
  </h1>
  <p>This is a powerful editor that supports many features:</p>
  <ul class="list-disc">
      <li>
          <p>
              Rich text formatting with <strong>bold</strong>, <em>italic</em>, and
              <u>underline</u>
          </p>
      </li>
      <li>
          <p>Different heading levels</p>
      </li>
      <li>
          <p>Lists (ordered and unordered)</p>
      </li>
      <li>
          <p>Text alignment options</p>
      </li>
      <li>
          <p>Image uploads and management</p>
      </li>
  </ul>
  <h2>Try It Out!</h2>
  <p>
      Type '/' to see available commands or use the toolbar above to format your
      content.
  </p>
  <img src="https://res.cloudinary.com/sham007/image/upload/v1737910103/ProfileImages/724shots_so.jpg" alt="Example image"
      width="100%" align="center" caption="SAAS landing page template" aspectratio="1.640340218712029" />
  <p>
      You can also add links like
      <a target="_blank" rel="noopener noreferrer nofollow" href="https://ehtisham.vercel.app">this one</a>
      and use text alignment options.
  </p>
  <pre>
      <code class="language-javascript">// Example code block
      const greeting = "Hello, World!";
      console.log(greeting);
  </code>
  </pre>
`;

export const Files = [
  // Extension files
  {
    name: "floating-menu.tsx",
    path: "extensions/floating-menu.tsx",
    content: `"use client";

import {
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  List,
  Code2,
  ChevronRight,
  Quote, ImageIcon,
  Minus, AlignLeft,
  AlignCenter,
  AlignRight,
  CodeSquare,
  TextQuote
} from "lucide-react";
import { FloatingMenu } from "@tiptap/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Editor } from "@tiptap/core";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@/hooks/use-debounce";

interface CommandItemType {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string;
  command: (editor: Editor) => void;
  group: string;
}

type CommandGroupType = {
  group: string;
  items: Omit<CommandItemType, "group">[];
};

const groups: CommandGroupType[] = [
  {
    group: "Basic blocks",
    items: [
      {
        title: "Text",
        description: "Just start writing with plain text",
        icon: ChevronRight,
        keywords: "paragraph text",
        command: (editor) => editor.chain().focus().clearNodes().run(),
      },
      {
        title: "Heading 1",
        description: "Large section heading",
        icon: Heading1,
        keywords: "h1 title header",
        command: (editor) =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        title: "Heading 2",
        description: "Medium section heading",
        icon: Heading2,
        keywords: "h2 subtitle",
        command: (editor) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        title: "Heading 3",
        description: "Small section heading",
        icon: Heading3,
        keywords: "h3 subheader",
        command: (editor) =>
          editor.chain().focus().toggleHeading({ level: 3 }).run(),
      },
      {
        title: "Bullet List",
        description: "Create a simple bullet list",
        icon: List,
        keywords: "unordered ul bullets",
        command: (editor) => editor.chain().focus().toggleBulletList().run(),
      },
      {
        title: "Numbered List",
        description: "Create a ordered list",
        icon: ListOrdered,
        keywords: "numbered ol",
        command: (editor) => editor.chain().focus().toggleOrderedList().run(),
      },
      {
        title: "Code Block",
        description: "Capture code snippets",
        icon: Code2,
        keywords: "code snippet pre",
        command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
      },
      {
        title: "Image",
        description: "Insert an image",
        icon: ImageIcon,
        keywords: "image picture photo",
        command: (editor) => editor.chain().focus().insertImagePlaceholder().run(),
      },
      {
        title: "Horizontal Rule",
        description: "Add a horizontal divider",
        icon: Minus,
        keywords: "horizontal rule divider",
        command: (editor) => editor.chain().focus().setHorizontalRule().run(),
      },
    ],
  },
  {
    group: "Inline",
    items: [
      {
        title: "Quote",
        description: "Capture a quotation",
        icon: Quote,
        keywords: "blockquote cite",
        command: (editor) => editor.chain().focus().toggleBlockquote().run(),
      },
      {
        title: "Code",
        description: "Inline code snippet",
        icon: CodeSquare,
        keywords: "code inline",
        command: (editor) => editor.chain().focus().toggleCode().run(),
      },
      {
        title: "Blockquote",
        description: "Block quote",
        icon: TextQuote,
        keywords: "blockquote quote",
        command: (editor) => editor.chain().focus().toggleBlockquote().run(),
      },
    ],
  },
  {
    group: "Alignment",
    items: [
      {
        title: "Align Left",
        description: "Align text to the left",
        icon: AlignLeft,
        keywords: "align left",
        command: (editor) => editor.chain().focus().setTextAlign("left").run(),
      },
      {
        title: "Align Center",
        description: "Center align text",
        icon: AlignCenter,
        keywords: "align center",
        command: (editor) =>
          editor.chain().focus().setTextAlign("center").run(),
      },
      {
        title: "Align Right",
        description: "Align text to the right",
        icon: AlignRight,
        keywords: "align right",
        command: (editor) => editor.chain().focus().setTextAlign("right").run(),
      },
    ],
  },
];

export function TipTapFloatingMenu({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const commandRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) =>
              item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              item.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              item.keywords.toLowerCase().includes(debouncedSearch.toLowerCase())
          ),
        }))
        .filter((group) => group.items.length > 0),
    [debouncedSearch]
  );

  const flatFilteredItems = useMemo(
    () => filteredGroups.flatMap((g) => g.items),
    [filteredGroups]
  );

  const executeCommand = useCallback(
    (commandFn: (editor: Editor) => void) => {
      if (!editor) return;

      try {
        const { from } = editor.state.selection;
        const slashCommandLength = search.length + 1;

        editor
          .chain()
          .focus()
          .deleteRange({
            from: Math.max(0, from - slashCommandLength),
            to: from,
          })
          .run();

        commandFn(editor);
      } catch (error) {
        console.error("Error executing command:", error);
      } finally {
        setIsOpen(false);
        setSearch("");
        setSelectedIndex(-1);
      }
    },
    [editor, search]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !editor) return;

      const preventDefault = () => {
        e.preventDefault();
        e.stopImmediatePropagation();
      };

      switch (e.key) {
        case "ArrowDown":
          preventDefault();
          setSelectedIndex((prev) => {
            if (prev === -1) return 0;
            return prev < flatFilteredItems.length - 1 ? prev + 1 : 0;
          });
          break;

        case "ArrowUp":
          preventDefault();
          setSelectedIndex((prev) => {
            if (prev === -1) return flatFilteredItems.length - 1;
            return prev > 0 ? prev - 1 : flatFilteredItems.length - 1;
          });
          break;

        case "Enter":
          preventDefault();
          const targetIndex = selectedIndex === -1 ? 0 : selectedIndex;
          if (flatFilteredItems[targetIndex]) {
            executeCommand(flatFilteredItems[targetIndex].command);
          }
          break;

        case "Escape":
          preventDefault();
          setIsOpen(false);
          setSelectedIndex(-1);
          break;
      }
    },
    [isOpen, selectedIndex, flatFilteredItems, executeCommand, editor]
  );

  useEffect(() => {
    if (!editor?.options.element) return;

    const editorElement = editor.options.element;
    const handleEditorKeyDown = (e: Event) => handleKeyDown(e as KeyboardEvent);

    editorElement.addEventListener("keydown", handleEditorKeyDown);
    return () =>
      editorElement.removeEventListener("keydown", handleEditorKeyDown);
  }, [handleKeyDown, editor]);

  // Add new effect for resetting selectedIndex
  useEffect(() => {
    setSelectedIndex(-1);
  }, [search]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.focus();
    }
  }, [selectedIndex]);

  return (
    <FloatingMenu
      editor={editor}
      shouldShow={({ state }) => {
        if (!editor) return false;

        const { $from } = state.selection;
        const currentLineText = $from.parent.textBetween(
          0,
          $from.parentOffset,
          "\n",
          " "
        );

        const isSlashCommand =
          currentLineText.startsWith("/") &&
          $from.parent.type.name !== "codeBlock" &&
          $from.parentOffset === currentLineText.length;

        if (!isSlashCommand) {
          if (isOpen) setIsOpen(false);
          return false;
        }

        const query = currentLineText.slice(1).trim();
        if (query !== search) setSearch(query);
        if (!isOpen) setIsOpen(true);
        return true;
      }}
      tippyOptions={{
        placement: "bottom-start",
        interactive: true,
        appendTo: () => document.body,
        onHide: () => {
          setIsOpen(false);
          setSelectedIndex(-1);
        },
      }}
    >
      <Command role="listbox" ref={commandRef} className="z-50 w-72 overflow-hidden rounded-lg border bg-popover shadow-lg">
        <ScrollArea className="max-h-[330px]">
          <CommandList>
            <CommandEmpty className="py-3 text-center text-sm text-muted-foreground">
              No results found
            </CommandEmpty>

            {filteredGroups.map((group, groupIndex) => (
              <CommandGroup
                key={${"`"}${"${group.group}-${groupIndex}"}${"`"}}
                heading={
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {group.group}
                  </div>
                }
              >
                {group.items.map((item, itemIndex) => {
                  const flatIndex =
                    filteredGroups
                      .slice(0, groupIndex)
                      .reduce((acc, g) => acc + g.items.length, 0) + itemIndex;

                  return (
                    <CommandItem
                      role="option"
                      key={${"`"}${"${group.group}-${item.title}-${itemIndex}"}${"`"}}
                      value={${"`"}${"${group.group}-${item.title}"}${"`"}}
                      onSelect={() => executeCommand(item.command)}
                      className={cn(
                        "gap-3 aria-selected:bg-accent/50",
                        flatIndex === selectedIndex ? "bg-accent/50" : ""
                      )}
                      aria-selected={flatIndex === selectedIndex}
                      ref={(el) => {
                        itemRefs.current[flatIndex] = el;
                      }}
                      tabIndex={flatIndex === selectedIndex ? 0 : -1}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-background">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </div>
                      <kbd className="ml-auto flex h-5 items-center rounded bg-muted px-1.5 text-xs text-muted-foreground">
                        ↵
                      </kbd>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </ScrollArea>
      </Command>
    </FloatingMenu>
  );
}
`,
  },
  {
    name: "floating-toolbar.tsx",
    path: "extensions/floating-toolbar.tsx",
    content: "",
  },
  {
    name: "image.tsx",
    path: "extensions/image.tsx",
    content: "",
  },
  {
    name: "image-placeholder.tsx",
    path: "extensions/image-placeholder.tsx",
    content: "",
  },
  {
    name: "search-and-replace.tsx",
    path: "extensions/search-and-replace.tsx",
    content: "",
  },
  // Toolbar files
  {
    name: "editor-toolbar.tsx",
    path: "toolbars/editor-toolbar.tsx",
    content: "",
  },
  {
    name: "color-and-highlight.tsx",
    path: "toolbars/color-and-highlight.tsx",
    content: "",
  },
  {
    name: "bold.tsx",
    path: "toolbars/bold.tsx",
    content: "",
  },
  {
    name: "link.tsx",
    path: "toolbars/link.tsx",
    content: "",
  },
  {
    name: "search-and-replace-toolbar.tsx",
    path: "toolbars/search-and-replace-toolbar.tsx",
    content: "",
  },
  {
    name: "code-block.tsx",
    path: "toolbars/code-block.tsx",
    content: "",
  },
  {
    name: "blockquote.tsx",
    path: "toolbars/blockquote.tsx",
    content: "",
  },
  {
    name: "code.tsx",
    path: "toolbars/code.tsx",
    content: "",
  },
  {
    name: "hard-break.tsx",
    path: "toolbars/hard-break.tsx",
    content: "",
  },
  {
    name: "horizontal-rule.tsx",
    path: "toolbars/horizontal-rule.tsx",
    content: "",
  },
  {
    name: "image-placeholder-toolbar.tsx",
    path: "toolbars/image-placeholder-toolbar.tsx",
    content: "",
  },
  {
    name: "italic.tsx",
    path: "toolbars/italic.tsx",
    content: "",
  },
  {
    name: "ordered-list.tsx",
    path: "toolbars/ordered-list.tsx",
    content: "",
  },
  {
    name: "redo.tsx",
    path: "toolbars/redo.tsx",
    content: "",
  },
  {
    name: "strikethrough.tsx",
    path: "toolbars/strikethrough.tsx",
    content: "",
  },
  {
    name: "undo.tsx",
    path: "toolbars/undo.tsx",
    content: "",
  },
  {
    name: "bullet-list.tsx",
    path: "toolbars/bullet-list.tsx",
    content: "",
  },
  {
    name: "mobile-toolbar-group.tsx",
    path: "toolbars/mobile-toolbar-group.tsx",
    content: "",
  },
  {
    name: "toolbar-provider.tsx",
    path: "toolbars/toolbar-provider.tsx",
    content: "",
  },
  {
    name: "alignment.tsx",
    path: "toolbars/alignment.tsx",
    content: "",
  },
  {
    name: "headings.tsx",
    path: "toolbars/headings.tsx",
    content: "",
  },
  {
    name: "underline.tsx",
    path: "toolbars/underline.tsx",
    content: "",
  },
  // Main directory files
  {
    name: "rich-text-editor.tsx",
    path: "rich-text-editor.tsx",
    content: `"use client";
import "./tiptap.css";
import { cn } from "@/lib/utils";
import { ImageExtension } from "@/components/tiptap/extensions/image";
import { ImagePlaceholder } from "@/components/tiptap/extensions/image-placeholder";
import SearchAndReplace from "@/components/tiptap/extensions/search-and-replace";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TipTapFloatingMenu } from "@/components/tiptap/extensions/floating-menu";
import { FloatingToolbar } from "@/components/tiptap/extensions/floating-toolbar";
import { EditorToolbar } from "./toolbars/editor-toolbar";
import Placeholder from "@tiptap/extension-placeholder"
import {content} from "./content"

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return ${"`"}Heading ${"${node.attrs.level}"}${"`"};
        case "detailsSummary":
          return "Section title";
        case "codeBlock":
          // never show the placeholder when editing code
          return "";
        default:
          return "Write, type '/' for commands";
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Typography,
];


export function RichTextEditorDemo({ className }: { className?: string }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    content,
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      // do what you want to do with output
      // Update stats
      // saving as text/json/hmtml
      // const text = editor.getHTML();
      console.log(editor.getText());
    },
  });

  if (!editor) return null;

  return (
    <div
      className={cn(
        "w-full bg-card rounded-xl border overflow-hidden",
        className
      )}
    >
      <EditorToolbar editor={editor} />
      <div className="relative pb-[60px] sm:pb-0 overflow-y-scroll max-h-[700px]">
        <FloatingToolbar editor={editor} />
        <TipTapFloatingMenu editor={editor} />
        <EditorContent
          editor={editor}
          className=" min-h-[600px] w-full min-w-full cursor-text p-0.5 sm:p-6"
        />
      </div>
    </div>
  );
}
`,
  },
  {
    name: "tiptap.css",
    path: "tiptap.css",
    content: `:root {
  /* Color System */
  --editor-text-default: hsl(240 10% 3.9%);
  --editor-text-gray: hsl(240 3.8% 46.1%);
  --editor-text-brown: hsl(25 95% 53%);
  --editor-text-orange: hsl(24 95% 53%);
  --editor-text-yellow: hsl(48 96% 53%);
  --editor-text-green: hsl(142 71% 45%);
  --editor-text-blue: hsl(221 83% 53%);
  --editor-text-purple: hsl(269 97% 85%);
  --editor-text-pink: hsl(336 80% 58%);
  --editor-text-red: hsl(0 84% 60%);

  /* Background Colors */
  --editor-bg-default: hsl(0 0% 100%);
  --editor-bg-subtle: hsl(0 0% 98%);
  --editor-bg-muted: hsl(240 5% 96%);
  
  /* Highlight Colors */
  --editor-highlight-default: hsl(0 0% 98%);
  --editor-highlight-gray: hsl(240 5% 96%);
  --editor-highlight-brown: hsl(43 96% 96%);
  --editor-highlight-orange: hsl(33 100% 96%);
  --editor-highlight-yellow: hsl(54 100% 96%);
  --editor-highlight-green: hsl(142 71% 96%);
  --editor-highlight-blue: hsl(217 91% 96%);
  --editor-highlight-purple: hsl(269 97% 96%);
  --editor-highlight-pink: hsl(336 80% 96%);
  --editor-highlight-red: hsl(0 84% 96%);

  /* Border Colors */
  --editor-border-default: hsl(240 5% 88%);
  --editor-border-strong: hsl(240 5% 65%);

  /* Spacing System */
  --editor-spacing-1: 0.25rem;
  --editor-spacing-2: 0.5rem;
  --editor-spacing-3: 0.75rem;
  --editor-spacing-4: 1rem;
  --editor-spacing-6: 1.5rem;
  --editor-spacing-8: 2rem;
  --editor-spacing-12: 3rem;
  --editor-spacing-16: 4rem;

  /* Typography */
  --editor-font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --editor-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --editor-font-serif: Georgia, Cambria, "Times New Roman", Times, serif;

  /* Animation */
  --editor-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --editor-transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --editor-transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Shadows */
  --editor-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --editor-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --editor-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

/* Dark Mode Custom Properties */
.dark {
  --editor-text-default: hsl(0 0% 98%);
  --editor-text-gray: hsl(240 5% 64.9%);
  --editor-text-brown: hsl(25 95% 53%);
  --editor-text-orange: hsl(24 95% 53%);
  --editor-text-yellow: hsl(48 96% 53%);
  --editor-text-green: hsl(142 71% 45%);
  --editor-text-blue: hsl(221 83% 53%);
  --editor-text-purple: hsl(269 97% 85%);
  --editor-text-pink: hsl(336 80% 58%);
  --editor-text-red: hsl(0 84% 60%);

  --editor-bg-default: hsl(240 10% 3.9%);
  --editor-bg-subtle: hsl(240 3.7% 15.9%);
  --editor-bg-muted: hsl(240 5% 26%);

  --editor-highlight-default: hsl(240 3.7% 15.9%);
  --editor-highlight-gray: hsl(240 5% 26%);
  --editor-highlight-brown: hsl(43 96% 10%);
  --editor-highlight-orange: hsl(33 100% 10%);
  --editor-highlight-yellow: hsl(54 100% 10%);
  --editor-highlight-green: hsl(142 71% 10%);
  --editor-highlight-blue: hsl(217 91% 10%);
  --editor-highlight-purple: hsl(269 97% 10%);
  --editor-highlight-pink: hsl(336 80% 10%);
  --editor-highlight-red: hsl(0 84% 10%);

  --editor-border-default: hsl(240 5% 26%);
  --editor-border-strong: hsl(240 5% 64.9%);
}

/* Core Editor Styles */
.ProseMirror {
  caret-color: var(--editor-text-default);
  outline: none;
  padding: var(--editor-spacing-16) var(--editor-spacing-8);
  margin: 0 auto;
  max-width: 90ch;
  font-family: var(--editor-font-sans);
  position: relative;
  /* background-color: var(--editor-bg-default); */
  color: var(--editor-text-default);
  transition: all var(--editor-transition-normal);
  min-height: 100vh;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ProseMirror:focus {
  outline: none;
  box-shadow: none;
}

.ProseMirror .selection,
.ProseMirror *::selection {
  background-color: var(--editor-highlight-blue);
  /* color: var(--editor-text-default); */
}

.ProseMirror > .react-renderer {
  margin: var(--editor-spacing-12) 0;
  transition: all var(--editor-transition-normal);
}

.ProseMirror > .react-renderer:first-child {
  margin-top: 0;
}

.ProseMirror > .react-renderer:last-child {
  margin-bottom: 0;
}

/* Typography Styles */
.ProseMirror p {
  line-height: 1.75;
  margin: var(--editor-spacing-4) 0;
  color: var(--editor-text-default);
  font-size: 1.125rem;
}

.ProseMirror > p {
  margin: var(--editor-spacing-6) 0;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4 {
  font-family: var(--editor-font-sans);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--editor-text-default);
  scroll-margin-top: var(--editor-spacing-16);
  line-height: 1.2;
}

.ProseMirror h1 {
  font-size: 2.5rem;
  margin: var(--editor-spacing-8) 0 var(--editor-spacing-4);
}

.ProseMirror h2 {
  font-size: 2rem;
  margin: var(--editor-spacing-8) 0 var(--editor-spacing-4);
}

.ProseMirror h3 {
  font-size: 1.5rem;
  margin: var(--editor-spacing-6) 0 var(--editor-spacing-3);
}

.ProseMirror h4 {
  font-size: 1.25rem;
  margin: var(--editor-spacing-4) 0 var(--editor-spacing-2);
}

.ProseMirror a {
  color: var(--editor-text-blue);
  cursor: pointer;
  text-decoration: underline;
  text-decoration-thickness: 0.1em;
  text-underline-offset: 0.2em;
  transition: all var(--editor-transition-fast);
}

.ProseMirror a:hover {
  color: var(--editor-text-blue);
  text-decoration-thickness: 0.2em;
}

.ProseMirror code {
  font-family: var(--editor-font-mono);
  font-size: 0.9em;
  background-color: var(--editor-bg-muted);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  color: var(--editor-text-default);
  border: 1px solid var(--editor-border-default);
}

.ProseMirror pre {
  margin: var(--editor-spacing-6) 0;
  padding: var(--editor-spacing-4);
  background-color: var(--editor-bg-subtle);
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid var(--editor-border-default);
}

.ProseMirror pre code {
  background-color: transparent;
  padding: 0;
  border: none;
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--editor-text-default);
}

.ProseMirror blockquote {
  margin: var(--editor-spacing-6) 0;
  padding: var(--editor-spacing-4) var(--editor-spacing-6);
  border-left: 4px solid var(--editor-border-strong);
  font-style: italic;
  color: var(--editor-text-gray);
  background-color: var(--editor-bg-subtle);
  border-radius: 0 8px 8px 0;
}

/* Lists */
.ProseMirror ul,
.ProseMirror ol {
  margin: var(--editor-spacing-4) 0;
  padding-left: var(--editor-spacing-6);
}

.ProseMirror li {
  margin: var(--editor-spacing-2) 0;
  padding-left: var(--editor-spacing-2);
}

.ProseMirror ul {
  list-style-type: disc;
}

.ProseMirror ul ul {
  list-style-type: circle;
}

.ProseMirror ul ul ul {
  list-style-type: square;
}

.ProseMirror ol {
  list-style-type: decimal;
}

.ProseMirror ol ol {
  list-style-type: lower-alpha;
}

.ProseMirror ol ol ol {
  list-style-type: lower-roman;
}

/* Tables */
.ProseMirror table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: var(--editor-spacing-6) 0;
  border: 1px solid var(--editor-border-default);
  border-radius: 8px;
  overflow: hidden;
}

.ProseMirror th {
  background-color: var(--editor-bg-subtle);
  font-weight: 600;
  text-align: left;
  padding: var(--editor-spacing-3) var(--editor-spacing-4);
  border-bottom: 2px solid var(--editor-border-default);
}

.ProseMirror td {
  padding: var(--editor-spacing-3) var(--editor-spacing-4);
  border-bottom: 1px solid var(--editor-border-default);
  transition: background-color var(--editor-transition-fast);
}

.ProseMirror tr:last-child td {
  border-bottom: none;
}

.ProseMirror tr:hover td {
  background-color: var(--editor-bg-subtle);
}

/* Images */
.ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid var(--editor-border-default);
  box-shadow: var(--editor-shadow-sm);
  transition: all var(--editor-transition-normal);
  display: block;
  margin: var(--editor-spacing-1) auto;
}

.ProseMirror img:hover {
  box-shadow: var(--editor-shadow-lg);
  transform: translateY(-2px);
}

/* Horizontal Rule */
.ProseMirror hr {
  margin: var(--editor-spacing-8) 0;
  border: none;
  border-top: 2px solid var(--editor-border-default);
}

/* Floating Menu & Toolbar */
.floating-menu {
  background-color: var(--editor-bg-default);
  border: 1px solid var(--editor-border-default);
  box-shadow: var(--editor-shadow-lg);
  border-radius: 8px;
  padding: var(--editor-spacing-1);
  display: flex;
  gap: var(--editor-spacing-1);
  align-items: center;
  animation: fadeIn var(--editor-transition-normal);
  backdrop-filter: blur(8px);
}

.toolbar-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  height: 2.25rem;
  padding: 0 var(--editor-spacing-3);
  transition: all var(--editor-transition-fast);
  background-color: transparent;
  color: var(--editor-text-default);
  border: 1px solid transparent;
}

.toolbar-button:hover {
  background-color: var(--editor-bg-subtle);
  color: var(--editor-text-default);
}

.toolbar-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--editor-border-strong);
}

.toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toolbar-button.active {
  background-color: var(--editor-bg-muted);
  color: var(--editor-text-blue);
}

/* Placeholder Styles
.ProseMirror p.is-editor-empty:first-child::before {
  content: "Start writing or press '/' for commands...";
  color: var(--editor-text-gray);
  pointer-events: none;
  float: left;
  height: 0;
} */

/* Mobile Optimizations */
@media (max-width: 640px) {
  .ProseMirror {
    padding: var(--editor-spacing-8) var(--editor-spacing-4);
  }

  .ProseMirror h1 { font-size: 2rem; }
  .ProseMirror h2 { font-size: 1.75rem; }
  .ProseMirror h3 { font-size: 1.5rem; }
  .ProseMirror h4 { font-size: 1.25rem; }
  .ProseMirror p { font-size: 1rem; }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Print Styles */
@media print {
  .ProseMirror {
    padding: 0;
    max-width: none;
  }

  .floating-menu,
  .toolbar-button {
    display: none;
  }
}

.is-editor-empty::before {
  color: var(--editor-text-gray);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
    `,
  },
  {
    name: "content.ts",
    path: "content.ts",
    content: `export const content = ${"`"}${content} ${"`"}`,
  },
];

export const EditorFiles = Files;
