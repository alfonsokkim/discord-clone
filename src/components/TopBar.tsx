type TopBarProps = {
  serverName: string;
};

const TopBar = ({ serverName }: TopBarProps) => {
  return (
    <div className="bg-base h-[1.875rem] flex justify-center items-center select-none">
      {serverName}
    </div>
  );
};

export default TopBar