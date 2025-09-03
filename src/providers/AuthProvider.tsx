// src/providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

type AuthCtx = {
  user: User | null,
  loading: boolean
};

