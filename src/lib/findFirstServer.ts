import { supabase } from "@/lib/supabaseClient";

export type ServerRow = {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
};

export async function getFirstServer(): Promise<ServerRow | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");

  const { data, error } = await supabase
    .from("server_members")
    .select(`servers ( id, name, owner_id, created_at ), joined_at`)
    .eq("user_id", user.id)
    .order("joined_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  // `data?.servers` contains the joined server row
  return (data?.servers as ServerRow | undefined) ?? null;
}
