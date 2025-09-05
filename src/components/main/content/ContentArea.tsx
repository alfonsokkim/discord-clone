import { useState, useEffect } from "react";
import ToolbarSearch from "@/components/main/ToolbarSearch";
import UsersPanel from "@/components/main/UsersPanel";
import MessageComposer from "./MessageComposer";
import { Hash, Spool, Bell, Pin, Users } from 'lucide-react';

type ContentAreaProps = {
  textChannel: string;
  showRightSidebar?: boolean;
  serverId: string | null;
};

export default function ContentArea({
  textChannel,
  showRightSidebar = true,
  serverId
}: ContentAreaProps) {
  const [isUsersOpen, setIsUsersOpen] = useState(showRightSidebar);

  useEffect(() => {
    setIsUsersOpen(showRightSidebar);
  }, [showRightSidebar]);

  return (
    <div className="flex-1 flex flex-col border-t border-base-border divide-y divide-base-border h-full">
      {/* Top toolbar */}
      <div className="bg-content h-[48px] flex items-center justify-between">
        <div className="flex gap-2 w-[80%] p-4 pt-0 pb-0 justify-between">
          <div className="flex gap-2">
            <Hash className="text-icon-grey" />
            <div className="text-white select-none font-semibold">{textChannel}</div>
          </div>
          <div className="flex gap-3 text-icon-grey items-center">
            <Spool className="cursor-pointer" size={20}/>
            <Bell className="cursor-pointer" size={20}/>
            <Pin className="cursor-pointer" size={20}/>
            <button
              type="button"
              onClick={() => setIsUsersOpen((v) => !v)}
              className={[
                "bg-transparent p-0 focus:outline-none transition-colors cursor-pointer",
                isUsersOpen ? "text-white" : "text-icon-grey", // white when open, grey when closed
              ].join(" ")}
            >
              <Users size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 p-3 pt-0 pb-0">
          <ToolbarSearch/>
        </div>
        
      </div>

      {/* Messages + optional right sidebar */}
      <div className="bg-content w-full flex divide-x divide-base-border flex-1">
        <div
          className={[
            "bg-content flex-1 p-2 pb-5 flex flex-col",
            isUsersOpen ? "w-[20%%]" : "w-full",
          ].join(" ")}
        >TODO3 supabase auth with express backend
          <div className="flex-1" />
          <MessageComposer placeholder={`Message #${textChannel}`} />
        </div>

        {isUsersOpen && <UsersPanel serverId={serverId}/>}
      </div>
    </div>
  );
}
