# TipTap Shadcn Editor

A modern, customizable rich text editor built with TipTap and Shadcn UI components.

## Features

- 🎨 Beautiful UI with Shadcn components
- ✨ Full rich text editing capabilities
- 🖼️ Image upload and management
- 🔍 Search and replace functionality
- 🎯 Floating toolbar and menu
- 📱 Responsive design
- 🎯 TypeScript support
- 🎨 Customizable themes

## Installation

```bash
npm install tiptap-shadcn-editor
# or
yarn add tiptap-shadcn-editor
# or
pnpm add tiptap-shadcn-editor
```

## Usage

**1. Import the Editor and CSS in your app:**

```js
import { RichTextEditor } from 'tiptap-shadcn-editor';
import 'tiptap-shadcn-editor/dist/index.css';
```

**2. Use the editor in your component:**

```jsx
<RichTextEditor className="w-full" />
```

## Tailwind CSS Setup

If you use Tailwind CSS, make sure your `tailwind.config.js` includes the editor package so that Tailwind classes are not purged:

```js
content: [
  './node_modules/tiptap-shadcn-editor/**/*.{js,ts,jsx,tsx}',
];
```

## Quick Start

```tsx
import { RichTextEditor } from 'tiptap-shadcn-editor';
import 'tiptap-shadcn-editor/dist/index.css';

function App() {
  return (
    <RichTextEditor
      onUpdate={(content) => console.log(content)}
      placeholder="Start writing..."
    />
  );
}
```

## Exporting CSS in Your Library (for maintainers)

Make sure your `package.json` includes the following in the `exports` field so consumers can import the CSS:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.js",
    "default": "./dist/index.js"
  },
  "./dist/index.css": "./dist/index.css"
}
```

## Troubleshooting

- **Styles not applying?**
  - Ensure you have imported the CSS file: `import 'tiptap-shadcn-editor/dist/index.css';`
  - Make sure your Tailwind config includes the editor package in the `content` array.
  - If you use custom CSS variables (e.g., `--editor-text-orange`), define them in your global CSS or in a parent class.
  - Restart your dev server after making changes to your config or after updating the package.

## Props

| Prop             | Type                        | Default                        | Description                     |
| ---------------- | --------------------------- | ------------------------------ | ------------------------------- |
| `className`      | `string`                    | -                              | Additional CSS classes          |
| `onUpdate`       | `(content: string) => void` | `() => {}`                     | Callback when content changes   |
| `extensions`     | `Extension[]`               | -                              | Custom TipTap extensions        |
| `initialContent` | `string`                    | -                              | Initial editor content          |
| `placeholder`    | `string`                    | "Write, type '/' for commands" | Placeholder text                |
| `readOnly`       | `boolean`                   | `false`                        | Whether the editor is read-only |
| `maxHeight`      | `string`                    | "calc(100dvh-6rem)"            | Maximum height of the editor    |
| `minHeight`      | `string`                    | "600px"                        | Minimum height of the editor    |

## Custom Extensions

You can add custom TipTap extensions:

```tsx
import { RichTextEditor } from 'tiptap-shadcn-editor';
import 'tiptap-shadcn-editor/dist/index.css';
import { Extension } from '@tiptap/core';

const customExtension = Extension.create({
  name: 'custom',
  // ... extension configuration
});

function App() {
  return <RichTextEditor extensions={[customExtension]} />;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Emmanuel Michael](https://github.com/chochodev)
