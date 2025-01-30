import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";
import { BlockDisplay } from "@/components/block-display";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { RichTextEditorDemo } from "@/registry/basic/components/rich-text-editor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full items-center ">
      <PageHeader className="w-full">
        <PageHeaderHeading>Build your rich-text editor</PageHeaderHeading>
        <PageHeaderDescription>
          Framework · Plugins · Components
        </PageHeaderDescription>
        <PageActions>
          <Link href={"#basic-editor"} className={buttonVariants({ variant: "default", size: "lg", })}>Get Started</Link>
          <Link
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </PageActions>
      </PageHeader>

      <section id="basic-editor" className="w-full container py-12 scroll-mt-10">
        <BlockDisplay
          name="basic"
          component={<RichTextEditorDemo className="w-full" />}
        />
      </section>
    </main>
  );
}
