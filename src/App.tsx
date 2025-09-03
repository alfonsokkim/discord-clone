import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import AppShell from "./AppShell";

export default function App() {
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    (async () => {
      // 1) If we came back from Discord (/app?code=...), exchange it
      if (window.location.search.includes("code=")) {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (!error) {
          // Clean URL: /app
          window.history.replaceState({}, document.title, "/app");
        } else {
          console.error(error);
        }
      }

      // 2) Read current session
      const { data: { session } } = await supabase.auth.getSession();
      if (mounted) setSession(session ?? null);
      if (mounted) setChecking(false);
    })();

    // 3) Keep session in sync (logout/login elsewhere)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!mounted) return;
      setSession(s);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  if (checking) return null;
  if (!session) return <Navigate to="/login" replace state={{ from: location }} />;
  return <AppShell />;
}
