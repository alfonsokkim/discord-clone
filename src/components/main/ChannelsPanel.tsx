import ServerSettings from "./ServerSettings";
import { CalendarDays, Rocket } from "lucide-react";
import ChannelListsDnD from "./ChannelListsDnd";

type ChannelsPanelProps = {
  serverName: string;
  textChannels: string[];
  voiceChannels: string[];
};

export default function ChannelsPanel({ serverName, textChannels, voiceChannels }: ChannelsPanelProps) {
  return (
    <div className="h-full w-full rounded-tl-xl border-l border-t border-base-border divide-y divide-base-border bg-base flex flex-col">
      <div className="h-[48px]">
        <ServerSettings serverName={serverName} />
      </div>

      <div className="flex flex-col divide-y divide-base-border p-3">
        {/* Quick actions */}
        <div className="flex flex-col pb-1.5 gap-0.5">
          <div className="items-center p-1.5 flex gap-2 hover:bg-dropdown-hover hover:text-white text-icon-grey rounded-xl cursor-pointer">
            <CalendarDays size={20} />
            <div className="font-semibold select-none">Events</div>
          </div>
          <div className="items-center p-1.5 flex gap-2 hover:bg-dropdown-hover hover:text-white text-icon-grey rounded-xl cursor-pointer">
            <Rocket size={20} />
            <div className="font-semibold select-none">Server Boosts</div>
          </div>
        </div>

        {/* Channels (sortable) */}
        <ChannelListsDnD
          textChannels={textChannels}   // seed with your current value
          voiceChannels={voiceChannels}    // seed as you like
        />
      </div>
    </div>
  );
}
