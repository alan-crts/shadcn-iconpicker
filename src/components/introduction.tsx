import { Github } from "lucide-react";
import { PreviewCode } from "./preview-code";
import { Button } from "./ui/button";
import { IconPicker } from "../../registry/ui/icon-picker";
import Link from "next/link";

export function Introduction() {
    const iconPickerPreview = <IconPicker />;
    const iconPickerCode = `import { IconPicker } from "@/components/ui/iconPicker";
  
  export default function Home() {
    return <IconPicker />;
  }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Icon Picker</h1>
        <Link href="https://github.com/alan-crts/shadcn-iconpicker">
          <Button variant="outline">
            <Github className="w-4 h-4" />
            View on GitHub
          </Button>
        </Link>
      </div>
      <p className="text-sm text-muted-foreground">
        A simple icon picker component that allows you to pick an icon from a
        list of lucide icons.
      </p>
      <PreviewCode
        preview={iconPickerPreview}
        code={iconPickerCode}
        language="tsx"
        v0Url={"https://icon-picker.alan-courtois.fr/r/icon-picker-example"}
      />
    </div>
  );
}
