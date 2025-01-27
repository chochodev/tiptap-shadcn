export const content = `
<h1>Explore the tiptap rich text editor with shadcn-ui components 📝</h1>
<p>This is a powerful editor that supports many features:</p>
<ul>
  <li>Rich text formatting with <strong>bold</strong>, <em>italic</em>, and <u>underline</u></li>
  <li>Different heading levels</li>
  <li>Lists (ordered and unordered)</li>
  <li>Text alignment options</li>
  <li>Image uploads and management</li>
</ul>
<h2>Try It Out!</h2>
<p>Type '/' to see available commands or use the toolbar above to format your content.</p>
<div class="react-renderer node-image" contenteditable="false" draggable="true">
  <img src="https://res.cloudinary.com/sham007/image/upload/v1737910103/ProfileImages/724shots_so.jpg" alt="Example image">
</div>
<p>You can also add links like <a href="https://example.com">this one</a> and use text alignment options.</p>
<pre><code class="language-javascript">// Example code block
const greeting = "Hello, World!";
console.log(greeting);</code></pre>
`;

export const EditoFiles = [
  {
    name: "rich-text-editor.tsx",
    path: "components/tiptap/rich-text-editor.tsx",
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
import PlaceholderExtention from "./toolbars/placeholder";

export function RichTextEditorDemo({ className }: { className?: string }) {
const editor = useEditor({
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    TextStyle,
    Color,
    Highlight,
    Typography,
    Link,
    Subscript,
    Superscript,
    Underline,
    ImageExtension,
    ImagePlaceholder,
    SearchAndReplace,
    PlaceholderExtention,
  ],
  content: \`
    <h1>Welcome to the TipTap Editor</h1>
    <p>This is a rich text editor with many features.</p>
  \`,
  editorProps: {
    attributes: {
      class: "max-w-full focus:outline-none",
    },
  },
});

if (!editor) return null;

return (
  <div className={cn("w-full bg-card max-w-5xl rounded-xl border overflow-hidden", className)}>
    <EditorToolbar editor={editor} />
    <div className="relative pb-[60px] sm:pb-0 overflow-y-scroll max-h-[600px]">
      <FloatingToolbar editor={editor} />
      <TipTapFloatingMenu editor={editor} />
      <EditorContent editor={editor} className="min-h-[500px] w-full min-w-full cursor-text p-0.5 sm:p-6" />
    </div>
  </div>
);
}`,
  },
];
