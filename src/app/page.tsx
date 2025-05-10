'use client';

import { RichTextEditor } from '../registry/basic/components/rich-text-editor';

export default function DemoPage() {
  const handleEditorChange = (content: string) => {
    console.log('Editor Content:', content);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Rich Text Editor Demo</h1>
      <div className="rounded-lg border bg-background">
        <RichTextEditor
          onUpdate={handleEditorChange}
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
}
