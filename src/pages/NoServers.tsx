import TopBar from "@/components/TopBar";
import ServerIconRail from "@/components/ServerIconRail";

export default function NoServerPrompt() {
  return (
    <main className="h-full w-full flex flex-col">
      <TopBar serverName={''} />

      <div className="flex h-full w-full">
        <div className="flex w-[22%]">
          <ServerIconRail />

          <div className="h-full w-full rounded-tl-xl border-l border-t border-base-border divide-y divide-base-border bg-base flex flex-col">
            <div className="h-[48px]">
            </div>

            <div className="flex flex-col divide-y divide-base-border p-3">
              <div className="flex flex-col pb-1.5 gap-0.5">
              </div>
            </div>
          </div>

          <div className="bg-base h-[7.8%] w-[22%] fixed bottom-0 right-0 left-0 z-20 p-2">
            <div className="bg-text-box rounded-lg h-full w-full">TODO2</div>
          </div>
        </div>

    <div className="flex-1 flex flex-col border-t border-base-border divide-y divide-base-border h-full">
      <div className="bg-content h-[48px] flex items-center justify-between"></div>
      <div className="bg-content w-full flex divide-x divide-base-border flex-1"> 
        <div className="flex pl-100 items-center h-full w-full">
          <div className="bg-base border border-base-border rounded-xl w-[500px] h-[250px] flex justify-center items-center">
            Looks like you dont have a server. <br/>
            Lets create one first
          </div>
        </div>
      </div>
    </div>
      </div>
    </main>
  );

}

<div className="flex items-center bg-text-box rounded-lg border border-base-border px-2 h-[44px]">
  Looks like you dont have a server. Lets create one first
</div>