// src/AppShell.tsx
import TopBar from "./components/TopBar";
import ServerIconRail from "./components/ServerIconRail";
import ChannelsPanel from "./components/main/ChannelsPanel";
import ContentArea from "./components/main/content/ContentArea";
import { useEffect, useState } from "react";

export default function AppShell() {
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

        <ContentArea textChannel={selectedChannel} showRightSidebar />
      </div>
    </main>
  );
}
