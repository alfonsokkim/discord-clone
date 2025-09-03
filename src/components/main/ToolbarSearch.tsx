import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

export default function ToolbarSearch() {
  return (
    <div className="w-full relative">
      <Textarea
        rows={1}
        className="bg-input-bg rounded-md w-full h-8 min-h-0 border text-white border-base-border pr-9 px-3 leading-none resize-none"
        placeholder="Search"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
    </div>
  );
}