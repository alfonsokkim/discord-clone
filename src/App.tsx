import { useEffect, useState, useRef } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import AppShell from "./AppShell";
import { useParams } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const exchanged = useRef(false);
  const { serverId } = useParams<{ serverId: string }>();
  if (!serverId) return null;

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.has("code") && !exchanged.current) {
          exchanged.current = true;
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
          if (error) throw error;
          // Clean URL
          window.history.replaceState({}, document.title, "/app");
        }
        const { data: { session } } = await supabase.auth.getSession();
        
        setSession(session ?? null);
      } catch (e) {
        console.error("auth flow error:", e);
        setSession(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;

  if (!session) {
    // Not signed in, simple link back to login
    return (
      <div style={{ padding: 24 }}>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (<AppShell serverId={serverId}/>);
}
