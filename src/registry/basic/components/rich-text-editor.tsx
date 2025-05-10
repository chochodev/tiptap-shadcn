'use client';
import './tiptap.css';
import '../../../index.css';
import { cn } from '@/lib/utils';
import { ImageExtension } from '@/components/tiptap/extensions/image';
import { ImagePlaceholder } from '@/components/tiptap/extensions/image-placeholder';
import SearchAndReplace from '@/components/tiptap/extensions/search-and-replace';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { EditorContent, type Extension, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TipTapFloatingMenu } from '@/components/tiptap/extensions/floating-menu';
import { FloatingToolbar } from '@/components/tiptap/extensions/floating-toolbar';
import { EditorToolbar } from './toolbars/editor-toolbar';
import Placeholder from '@tiptap/extension-placeholder';
import { content } from '@/lib/content';

export interface RichTextEditorProps {
  className?: string;
  onUpdate?: (editorContent: string) => void;
  extensions?: Extension[];
  initialContent?: string;
  placeholder?: string;
  readOnly?: boolean;
  maxHeight?: string;
  minHeight?: string;
}

export function RichTextEditor({
  className,
  onUpdate = () => {},
  extensions: customExtensions,
  initialContent = content,
  placeholder = "Write, type '/' for commands",
  readOnly = false,
  maxHeight = 'calc(100dvh-6rem)',
  minHeight = '600px',
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc',
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    emptyNodeClass: 'is-editor-empty',
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case 'heading':
          return `Heading ${node.attrs.level}`;
        case 'detailsSummary':
          return 'Section title';
        case 'codeBlock':
          return '';
        default:
              return placeholder;
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
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
      ...(customExtensions || []),
    ],
    content: initialContent,
    editable: !readOnly,
    editorProps: {
      attributes: {
        class: 'prose max-w-full focus:outline-none tiptap',
      },
    },
    onUpdate: ({ editor }) => {
      const editorContent = editor.getHTML();
      onUpdate(editorContent);
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
        'relative w-full overflow-hidden overflow-y-scroll border bg-card pb-[60px] sm:pb-0',
        className
      )}
      style={{ maxHeight, minHeight }}
    >
      {!readOnly && (
        <>
      <EditorToolbar editor={editor} />
      <FloatingToolbar editor={editor} />
      <TipTapFloatingMenu editor={editor} />
        </>
      )}
      <EditorContent
        editor={editor}
        className="prose w-full min-w-full cursor-text sm:p-6"
      />
    </div>
  );
}
