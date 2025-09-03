import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

function LoginPage() {
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
    return (
      <div className="w-full h-full bg-base">
        <Auth
          supabaseClient={supabase}
          // Show/hide provider buttons. Keep [] to hide; or e.g. ['github','google']
          providers={['discord']}
          onlyThirdPartyProviders
          showLinks={false}
          appearance={{
            theme: ThemeSupa,
            className: "w-full max-w-sm", // card width
            variables: {
              default: {
                colors: {
                  inputBackground: "#28292d",
                  inputText: "#ffffff",
                  inputBorder: "#404147",
                  brand: "#5865F2",
                  brandAccent: "#4752C4",
                },
                radii: {
                  inputBorderRadius: "8px",
                  buttonBorderRadius: "8px",
                },
              },
            },
          }}
        />
      </div>
    );
  }

  return <div>Logged in!</div>;
}

export default LoginPage;