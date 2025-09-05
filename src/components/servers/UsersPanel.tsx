import { serverMembers } from "@/lib/serverMembers";

export default function UsersPanel({ serverId }: { serverId: string | null }) {
  const { members } = serverMembers(serverId);
  console.log(members)

  return (
    <div className="bg-content w-[20%] hidden lg:block p-3">
      {members === null ? (
        <div className="text-sm opacity-70">Loading members…</div>
      ) : members.length === 0 ? (
        <div className="text-sm opacity-70">No members yet</div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {members.map((m) => {
            const p = m.profiles;
            if (!p) return null;
            return (
              <UserCell
                key={p.id}
                name={p.username ?? "(unknown)"}
                avatarUrl={p.avatar_url ?? undefined}
                presence={(p.presence ?? "offline") as "online" | "offline"}
                role={m.role ?? "member"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function UserCell({
  name, avatarUrl, presence, role,
}: { name: string; avatarUrl?: string; presence: "online" | "offline"; role: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2">
      <span className={`h-2 w-2 rounded-full ${presence === "online" ? "bg-green-500" : "bg-gray-500"}`} />
      {avatarUrl ? <img src={avatarUrl} className="h-8 w-8 rounded-full" alt="" /> : <div className="h-8 w-8 rounded-full bg-white/10" />}
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{name}</div>
        <div className="text-[10px] opacity-60">{role}</div>
      </div>
    </div>
  );
}
