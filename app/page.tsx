import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/components/page-header";
import { RichTextEditorDemo } from "@/components/tiptap/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { BlockDisplay } from "@/components/block-display";

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
            <Button variant="outline" size="lg">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </PageActions>
        </PageHeader>

        <section className="w-full container py-12">
            <BlockDisplay name="rich-text-editor" component={<RichTextEditorDemo className="w-full" />} />
          
        </section>

        <section className="w-full container py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Built-in AI assistance for content generation and editing
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-xl font-semibold mb-2">File Uploads</h3>
              <p className="text-muted-foreground">
                Seamless file upload support with drag and drop functionality
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-xl font-semibold mb-2">Math Equations</h3>
              <p className="text-muted-foreground">
                LaTeX support for mathematical equations and formulas
              </p>
            </div>
          </div>
        </section>
    </main>
  );
}
