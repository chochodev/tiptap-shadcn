import { Suspense } from "react";

import Link from "next/link";

import { ModeToggle } from "@/components/mode-switcher";
import { siteConfig } from "@/config/site";

import { Github } from "lucide-react";
import { MainNav } from "./main-nav";
import MobileNav from "./mobile-nav";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[51] w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="container flex h-14 items-center justify-between px-4">
        <Suspense fallback={null}>
          <MainNav />
        </Suspense>
        <MobileNav />
        <nav className="flex items-center gap-0.5">
          <Button size="icon" variant="ghost" className="size-8 px-0">
            <Link
              className="inline"
              href={siteConfig.links.github}
              rel="noreferrer"
              target="_blank"
            >
              <Github className="size-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
