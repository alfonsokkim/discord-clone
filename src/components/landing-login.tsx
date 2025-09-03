import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

function loginPage() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // subscribe to changes
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession);
      });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  return <div>Logged in!</div>;
}

export default loginPage;