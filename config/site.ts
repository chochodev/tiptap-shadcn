export const siteConfig = {
  name: "TipTap Editor - Build Your Rich Text Editor",
  url: "https://tiptap-shadcn.vercel.app",
  ogImage: "https://tiptap-shadcn.vercel.app/og.jpg",
  author: "Ehtisham afzal",
  description:
    "A powerful rich text editor built with TipTap and shadcn/ui components. Features file uploads, math equations, and more.",
  links: {
    website: "https://ehtisham.vercel.app",
    linkedIn: "https://www.linkedin.com/in/ehtisham-afzal/",
    github: "https://github.com/ehtisham-afzal/tiptap-shadcn",
    twitter: "https://twitter.com/ehtisham_dev",
  },
};

export type SiteConfig = typeof siteConfig;

export const navConfig = {
  mainNav: [{ title: "Home", path: "/" }],
};
