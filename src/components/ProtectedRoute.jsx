import { Navigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, superAdminOnly }) {
  const [allowed, setAllowed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    check();
  }, []);

  const check = async () => {
    // 1. Get logged in user
    const { data: authData, error: authError } = await supabase.auth.getUser();
    const user = authData?.user;

    if (!user) {
      setLoaded(true);
      return;
    }

    // 2. Check if this email exists in admins table
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", user.email)
      .maybeSingle();

    // If error or no admin found → deny access
    if (error || !admin) {
      setLoaded(true);
      return;
    }

    // 3. Check super admin access
    if (superAdminOnly && !admin.super_admin) {
      setLoaded(true);
      return;
    }

    setAllowed(true);
    setLoaded(true);
  };

  if (!loaded) return null;

  return allowed ? children : <Navigate to="/no-access" />;
}
