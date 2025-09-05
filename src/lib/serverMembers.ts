// /src/lib/serverMembers.ts
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  presence: "online" | "offline" | null;
};

export type MemberRow = {
  role: string | null;
  profiles: Profile | null; // what your UI expects
};

// Raw shape TS sometimes infers from Supabase (note profiles can be array OR object)
type MemberRowRaw = {
  role: string | null;
  profiles: Profile[] | Profile | null;
};

export function serverMembers(serverId: string | null) {
  const [members, setMembers] = useState<MemberRow[] | null>(null); // null = loading

  useEffect(() => {
    if (!serverId) { setMembers(null); return; }
    let cancelled = false;

    (async () => {
      setMembers(null);

      const { data, error } = await supabase
        .from("server_members")
        .select(`role, profiles ( id, username, avatar_url, presence )`)
        .eq("server_id", serverId)
        // order parent by child column (no deprecated options):
        .order("profiles(username)", { ascending: true });

      if (cancelled) return;

      if (error) {
        console.error("[useServerMembers] fetch error:", error);
        setMembers([]);
        return;
      }

      // ✅ Normalize the embedded `profiles` to a single object (or null)
      const rows = (data ?? []) as unknown as MemberRowRaw[];
      const normalized: MemberRow[] = rows.map((r) => ({
        role: r.role ?? null,
        profiles: Array.isArray(r.profiles)
          ? (r.profiles[0] ?? null)
          : (r.profiles ?? null),
      }));

      setMembers(normalized);
    })();

    return () => { cancelled = true; };
  }, [serverId]);

  return { members };
}
