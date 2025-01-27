import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/components/page-header";
import { RichTextEditorDemo } from "@/components/tiptap/rich-text-editor";
import { Button, buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";
import { BlockDisplay } from "@/components/block-display";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full items-center ">
      <PageHeader className="w-full">
        <PageHeaderHeading>Build your rich-text editor</PageHeaderHeading>
        <PageHeaderDescription>
          Framework · Plugins · Components · Themes
        </PageHeaderDescription>
        <PageActions>
          <Button size="lg">Get Started</Button>
          <Link
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </PageActions>
      </PageHeader>

      <section className="w-full container py-12">
        <BlockDisplay
          name="rich-text-editor"
          component={<RichTextEditorDemo className="w-full" />}
        />
      </section>
    </main>
  );
}
