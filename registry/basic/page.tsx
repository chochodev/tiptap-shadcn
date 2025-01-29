import { RichTextEditorDemo } from "@/components/tiptap/rich-text-editor";

export default function Page() {

  return (
    <div className="mx-auto w-full container flex flex-col justify-center items-center py-5">
        <RichTextEditorDemo className="col-span-full w-full"/>
    </div>
  )
}
