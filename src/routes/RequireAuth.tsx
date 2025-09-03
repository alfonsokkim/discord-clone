// import { useEffect, useState } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import type { Session } from "@supabase/supabase-js";
// import { supabase } from "@/lib/supabaseClient";

// export default function RequireAuth() {
//   const [checking, setChecking] = useState(true);
//   const [session, setSession] = useState<Session | null>(null);
//   const location = useLocation();

//   useEffect(() => {
//     let mounted = true;

//     // 1) get current session on first load
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (!mounted) return;
//       setSession(session);
//       setChecking(false);
//     });

//     // 2) stay in sync with login/logout & OAuth redirects
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
//       if (!mounted) return;
//       setSession(s);
//       setChecking(false);
//     });

//     return () => {
//       mounted = false;
//       subscription?.unsubscribe();
//     };
//   }, []);

//   // While we don't know yet, render nothing or a tiny loader
//   if (checking) return null;

//   // If not logged in, bounce to /login and remember where we wanted to go
//   if (!session) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   // Auth OK → render protected child route(s)
//   return <Outlet />;
// }
