// src/lib/ensureProfile.ts
import { supabase } from "@/lib/supabaseClient";

export async function ensureProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const discord: any =
        user.identities?.find(i => i.provider === "discord")?.identity_data ?? {};

    // Pull the fields you care about from THIS payload
    const discordId = discord.provider_id ?? discord.sub ?? discord.id ?? null;
    const avatarUrl = discord.avatar_url ?? discord.picture ?? null;
    const display: string =
            discord.custom_claims?.global_name ??
            discord.global_name ??
            discord.name ??
            user.email ??
            "User";

    const row = {
        id: user.id,               // auth.users.id (PK in profiles)
        discord_id: discordId,
        username: display,
        avatar_url: avatarUrl,
    };

    // Insert or update your public profile (RLS allows own row)
    const { error } = await supabase.from("profiles").upsert(row, { onConflict: "id" });
    if (error) throw error;

    return row;
}
