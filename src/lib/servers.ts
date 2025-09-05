import { supabase } from "@/lib/supabaseClient";

type ServerRow = {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
};

export async function createServer(name: string): Promise<ServerRow> {
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;
  if (!user) throw new Error("Not signed in");

  const { data, error } = await supabase
    .from("servers")
    .insert({ name, owner_id: user.id })
    .select()
    .single();

  if (error) throw error;
  const server = data as ServerRow;

  // Add owner as a member
  const { error: memberErr } = await supabase
    .from("server_members")
    .insert({ server_id: server.id, user_id: user.id, role: "owner" });
  if (memberErr) console.error(memberErr);

  return server;
}

