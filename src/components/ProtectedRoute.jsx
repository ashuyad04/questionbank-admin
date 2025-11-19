import { Navigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, superAdminOnly }) {
  const [allowed, setAllowed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const { data: session } = await supabase.auth.getUser();

    const user = session?.user;
    if (!user) {
      return setLoaded(true);
    }

    // Check admin in DB
    const { data: admin } = await supabase
      .from("admins")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (!admin) {
      return setLoaded(true);
    }

    // AUTH LOGIC FIXED — now checks "role" column
    if (superAdminOnly && admin.role !== "super") {
      return setLoaded(true);
    }

    setAllowed(true);
    setLoaded(true);
  };

  if (!loaded) return null; // prevent flashing

  return allowed ? children : <Navigate to="/no-access" />;
}