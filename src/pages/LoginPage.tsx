import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const location = useLocation();
  const redirectTo = (location.state as any)?.from?.pathname ?? "/app";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setChecking(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (checking) return null;
  if (session) return <Navigate to={redirectTo} replace />;

  return (
    <div className="min-h-screen grid place-items-center bg-base text-white p-4">
      <Auth
        supabaseClient={supabase}
        providers={["discord"]}
        onlyThirdPartyProviders
        showLinks={false}
        appearance={{ theme: ThemeSupa }}
        redirectTo={`${window.location.origin}/app`}
      />
    </div>
  );
}