// src/AppShell.tsx
import TopBar from "./components/TopBar";
import ServerIconRail from "./components/ServerIconRail";
import ChannelsPanel from "./components/servers/ChannelsPanel";
import ContentArea from "./components/servers/content/ContentArea";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AuthInfo from "./debug/AuthInfo";

export default function AppShell({ serverId }: { serverId: string | null }) {
  const serverName = "WEEWOO.'s server";
  const textChannels = ["general", "text1"];
  const voiceChannels = ["General", "voice1"];

  const [selectedChannel, setSelectedChannel] = useState<string>(
    textChannels[0] ?? ""
  );

  useEffect(() => {
    setSelectedChannel((prev) =>
      prev && textChannels.includes(prev) ? prev : (textChannels[0] ?? "")
    );
  }, [serverName, textChannels]);

  return (
    
    <main className="h-full w-full flex flex-col">
      <TopBar serverName={serverName} />

      <div className="flex h-full w-full">
        <div className="flex w-[22%]">
          <ServerIconRail />
          <ChannelsPanel
            serverName={serverName}
            textChannels={textChannels}
            voiceChannels={voiceChannels}
          />
          <div className="bg-base h-[7.8%] w-[22%] fixed bottom-0 right-0 left-0 z-20 p-2">
            <div className="bg-text-box rounded-lg h-full w-full">TODO2</div>
          </div>
        </div>

        <ContentArea textChannel={selectedChannel} showRightSidebar serverId={serverId} />
        <div className="p-2">
          {/* vvv Debug check fields for user info*/}
          {/* <AuthInfo /> */}
        </div>
      </div>
    </main>
  );
}

async function getServerCount() {
  const { count, error } = await supabase
    .from("servers")
    .select("id", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
} 