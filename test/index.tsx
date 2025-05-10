import { RichTextEditor } from '../dist';

export default function TestPage() {
  const handleEditorChange = (content: string) => {
    console.log('Editor Content:', content);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Library Test Page</h1>
      <div className="rounded-lg border bg-background">
        <RichTextEditor 
          onUpdate={handleEditorChange}
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
} 