# TipTap Editor

A powerful rich text editor built with TipTap and shadcn/ui components. Features file uploads, math equations, and more.

## Features

- 🤖 **AI-Powered**: Built-in AI assistance for content generation and editing
- 📁 **File Uploads**: Seamless file upload support with drag and drop functionality
- ➗ **Math Equations**: LaTeX support for mathematical equations and formulas
- 🎨 **Customizable**: Built with shadcn/ui components for easy customization
- 🌙 **Dark Mode**: Full dark mode support with system preference detection
- 📱 **Responsive**: Works great on desktop and mobile devices

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tiptap-editor.git
cd tiptap-editor
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TipTap](https://tiptap.dev/) - Headless rich text editor
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Project Structure

```
tiptap-editor/
├── app/                # Next.js app directory
├── components/         # React components
│   ├── tiptap/        # TipTap editor components
│   └── ui/            # UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── public/            # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## File structure

├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── tiptap/
│   │   ├── Demo.tsx
│   │   ├── extensions/
│   │   │   ├── image.tsx
│   │   │   ├── image-placeholder.tsx
│   │   │   └── ...
│   │   └── toolbars/
│   │       ├── editor-toolbar.tsx
│   │       └── ...
│   └── ui/
│       └── ... (shadcn components)
├── lib/
│   └── utils.ts
└── public/
    └── images/