// src/routes/AppIndexRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function AppIndexRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("servers")
        .select("id, name")
        .limit(1); // thanks to RLS, this returns only servers the user can see
      if (!error && data && data.length) {
        navigate(`/app/${data[0].id}`, { replace: true });
      } else {
        // No servers yet — maybe show a create screen
        navigate("/app/blank", { replace: true });
      }
    })();
  }, [navigate]);

  return null;
}
