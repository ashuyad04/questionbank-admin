import { Navigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, superAdminOnly }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = async () => {
      // Get current user session
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      // Check if the user exists in admins table
      const { data: adminData, error } = await supabase
        .from("admins")
        .select("*")
        .eq("uid", user.id);

      if (error || adminData.length === 0) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      const admin = adminData[0];

      // If route requires super admin
      if (superAdminOnly && admin.role !== "super_admin") {
        setAllowed(false);
        setLoading(false);
        return;
      }

      // All good
      setAllowed(true);
      setLoading(false);
    };

    check();
  }, [superAdminOnly]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  return allowed ? children : <Navigate to="/no-access" />;
}