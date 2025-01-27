"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navConfig } from "@/config/site";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden items-center space-x-6 md:flex">
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {navConfig.mainNav.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.path ? "text-foreground" : "text-foreground/80",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
