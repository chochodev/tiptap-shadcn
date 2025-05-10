// Main component exports
export { RichTextEditor } from './registry/basic/components/rich-text-editor';
export type { RichTextEditorProps } from './registry/basic/components/rich-text-editor';

// TipTap extensions
export { ImageExtension } from './components/tiptap/extensions/image';
export { ImagePlaceholder } from './components/tiptap/extensions/image-placeholder';
export { SearchAndReplace } from './components/tiptap/extensions/search-and-replace';
export { TipTapFloatingMenu } from './components/tiptap/extensions/floating-menu';
export { FloatingToolbar } from './components/tiptap/extensions/floating-toolbar';

// Re-export commonly used TipTap extensions from their correct packages
export { Color } from '@tiptap/extension-color';
export { Highlight } from '@tiptap/extension-highlight';
export { Link } from '@tiptap/extension-link';
export { Subscript } from '@tiptap/extension-subscript';
export { Superscript } from '@tiptap/extension-superscript';
export { TextAlign } from '@tiptap/extension-text-align';
export { TextStyle } from '@tiptap/extension-text-style';
export { Typography } from '@tiptap/extension-typography';
export { Underline } from '@tiptap/extension-underline';
export { Placeholder } from '@tiptap/extension-placeholder';

// Re-export core TipTap utilities
export { useEditor, EditorContent } from '@tiptap/react';
export type { Extension } from '@tiptap/core';