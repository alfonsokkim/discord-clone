import { Textarea } from "@/components/ui/textarea";
import { CirclePlus } from "lucide-react";

type MessageComposerProps = { placeholder: string };

export default function MessageComposer({ placeholder }: MessageComposerProps) {
  return (
    <div className="flex items-center bg-text-box rounded-lg border border-base-border px-2 h-[44px]">
      <CirclePlus className="text-gray-400 w-6 h-6 flex-shrink-0" />
      <Textarea
        className="flex-1 bg-text-box text-white min-h-0 h-10 resize-none border-none shadow-none focus:outline-none focus:ring-0"
        placeholder={placeholder}
      />
    </div>
  );
}