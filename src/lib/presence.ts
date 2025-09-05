import { supabase } from "./supabaseClient";

export async function setPresence(presence: "online" | "offline") {
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) {
        return;
    }
    await supabase.from("profiles").update({presence}).eq("id", user.id)
}