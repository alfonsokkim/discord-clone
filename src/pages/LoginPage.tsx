import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid place-items-center p-8">
      <Auth
        supabaseClient={supabase}
        providers={["discord"]}
        onlyThirdPartyProviders
        appearance={{ theme: ThemeSupa }}
        redirectTo={`${window.location.origin}/app`}
      />
    </div>
  );
}
