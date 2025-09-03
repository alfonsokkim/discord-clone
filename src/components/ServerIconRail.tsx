import discordLogo from '@/assets/logo/Discord-Symbol-White.svg';

const ServerIconRail = () => {
  return (
    <div className="bg-base w-[20%] h-full flex flex-col px-4 divide-y  divide-base-border">
      <div className="=border-b border-base-border flex justify-center items-center pb-2.25 cursor-pointer">
        <div className="bg-light-hover hover:bg-logo-hover transition-colors duration-200 ease-in-out w-10 h-10 flex justify-center items-center rounded-xl" onMouseOver={() => console.log("hover over div")}>
          <img src={discordLogo} className="w-5 h-5" onMouseOver={() => console.log("hover over img")}/>
        </div>
      </div>
      <div className="">TODO1</div>
    </div>
  )
}

export default ServerIconRail;