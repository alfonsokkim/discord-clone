import discordLogo from '@/assets/logo/Discord-Symbol-White.svg';
import CreateServerBackdrop from "@/components/servers/CreateServerPopover";

const ServerIconRail = () => {
  return (
    <div className="bg-base w-[20%] h-full flex flex-col px-4 divide-y divide-base-border">
      <div className="border-b border-base-border flex justify-center items-center pb-2.25">
        <div className="bg-light-hover hover:bg-logo-hover transition-colors w-10 h-10 flex justify-center items-center rounded-xl">
          <img src={discordLogo} className="w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col w-full h-full items-center pt-2">
      <CreateServerBackdrop />
      </div>
    </div>
  );
};

export default ServerIconRail;