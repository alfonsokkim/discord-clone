import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export default function AuthInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const [{ data: { user } }, { data: { session } }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getSession(),
      ]);
      if (!mounted) return;
      setUser(user ?? null);
      setSession(session ?? null);
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!mounted) return;
      setUser(s?.user ?? null);
      setSession(s ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (!user) return null;

  // Grab Discord identity/profile fields (fallback to user_metadata if needed)
  const discordIdentity = (user.identities || []).find((i) => i.provider === "discord") as any;
  const discord = (discordIdentity?.identity_data as any) ?? user.user_metadata ?? {};

  const displayName =
    discord.global_name ||
    discord.username ||
    discord.full_name ||
    discord.name ||
    user.email ||
    "Unknown user";

  const avatar = discord.avatar_url || discord.picture;

  return (
    <div className="p-3 rounded-lg bg-black/30 text-xs">
      <div className="flex items-center gap-2 mb-2">
        {avatar && <img src={avatar} alt="avatar" className="h-6 w-6 rounded-full" />}
        <span className="font-medium">{displayName}</span>
      </div>

      {/* Print whatever you want to see */}
      <pre className="whitespace-pre-wrap break-all">
        {JSON.stringify(
          {
            user_id: user.id,
            email: user.email,
            discord,                  // provider profile payload (username, avatar, etc.)
            session_expires_at: session?.expires_at,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
