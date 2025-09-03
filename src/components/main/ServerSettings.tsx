import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronDown, X, Rocket, UserPlus, Settings, Plus, FolderPlus,
  CalendarPlus, Gamepad2, Bell, Shield, Pencil, Square, CheckSquare
} from "lucide-react";


type ServerSettingsProps = {
  serverName: string;
};

export default function ServerSettings({ serverName }: ServerSettingsProps) {
  const [open, setOpen] = useState(false);
  const [hideMuted, setHideMuted] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
  <DropdownMenuTrigger asChild>
    <button
      className="
        h-full w-full flex items-center justify-between px-3
        rounded-tl-xl rounded-b-none
        bg-base hover:bg-dropdown-hover
        transition-colors duration-150
        focus:outline-none
      "
    >
          
      <div className="min-w-0 flex-1 truncate font-bold text-white text-left cursor-pointer">
        {serverName}
      </div>
      {open ? <X className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
    </button>
  </DropdownMenuTrigger>
      <DropdownMenuContent
        // rough equivalent of your fixed sizing/position
        // tweak width and offsets to taste
        align="center"
        sideOffset={6}
        className="
          w-55
          rounded-lg
          border border-dropdown-border
          bg-dropdown
          p-0
          text-sm
          shadow-lg
        "
      >
        {/* Server Boost */}
        <div className="m-1 rounded-sm">
          <DropdownMenuItem
            className="
              rounded-sm p-2
              data-[highlighted]:bg-dropdown-hover
              transition-colors duration-50
              group
            "
          >
            <div className="w-full text-white">Server Boost</div>
            <Rocket className="
                  ml-auto w-4 h-4
                  text-dropdown-icons
                  transition-colors
                  group-data-[highlighted]:text-white
                "strokeWidth={3} />
          </DropdownMenuItem>
        </div>

        <div className="h-[1px] mx-2 my-2 bg-[#5A5A5A]" />

        {/* Middle list */}
        <div className="m-1 rounded-sm">
          {[
            { label: "Invite People", icon: UserPlus },
            { label: "Server Settings", icon: Settings },
            { label: "Create Channel", icon: Plus },
            { label: "Create Category", icon: FolderPlus },
            { label: "Create Event", icon: CalendarPlus },
            { label: "App Directory", icon: Gamepad2 },
          ].map(({ label, icon: Icon }) => (
            <DropdownMenuItem
              key={label}
              className="
                rounded-sm p-2
                data-[highlighted]:bg-dropdown-hover
                transition-colors duration-50
                group
              "
            >
              <div className="w-full text-white">{label}</div>
              <Icon className="
                  ml-auto w-4 h-4
                  text-dropdown-icons
                  transition-colors
                  group-data-[highlighted]:text-white
                  
                "strokeWidth={3} />
            </DropdownMenuItem>
          ))}
        </div>

        <div className="h-[1px] mx-2 my-2 bg-[#5A5A5A]" />

        {/* dropdown settings*/}
        <div className="m-1 rounded-sm">
          {[
            { label: "Notification Settings", icon: Bell },
            { label: "Privacy Settings", icon: Shield },
          ].map(({ label, icon: Icon }) => (
            <DropdownMenuItem
              key={label}
              className="
                group
                rounded-sm p-2 flex items-center
                transition-colors duration-50
                data-[highlighted]:bg-dropdown-hover
              "
            >
              <span className="flex-1 text-white">{label}</span>
              <Icon
                className="
                  ml-auto w-4 h-4
                  text-dropdown-icons
                  transition-colors
                  group-data-[highlighted]:text-white
                "strokeWidth={3}
              />
            </DropdownMenuItem>
          ))}
        </div>

        <div className="h-[1px] mx-2 my-2 bg-[#5A5A5A]" />

        {/* last group */}
        <div className="m-1 rounded-sm">
          <DropdownMenuItem className="rounded-sm p-2 data-[highlighted]:bg-dropdown-hover transition-colors duration-50 group flex items-center">
            <span className="flex-1 text-white">Edit Per-server Profile</span>
            <Pencil className="
                  ml-auto w-4 h-4
                  text-dropdown-icons
                  transition-colors
                  group-data-[highlighted]:text-white
                "strokeWidth={3} />
          </DropdownMenuItem>

          {/* Checkbox-like item on the RIGHT */}
          <DropdownMenuItem
            onSelect={(e) => { e.preventDefault(); setHideMuted((v) => !v) }}
            className="rounded-sm p-2 data-[highlighted]:bg-dropdown-hover transition-colors duration-50 group flex items-center"
          >
            <span className="flex-1 text-white">Hide Muted Channels</span>
            {hideMuted
              ? <CheckSquare className="ml-auto w-4 h-4 opacity-80" />
              : <Square className="
                  ml-auto w-4 h-4
                  text-dropdown-icons
                  transition-colors
                  group-data-[highlighted]:text-white
                " strokeWidth={3}/>
            }
            </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
      {/* ...keep your DropdownMenuContent / items the same... */}
    </DropdownMenu>
  );
}
