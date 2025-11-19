import { BrowserRouter } from "react-router-dom";
import RoutesFile from "./routes";
import { supabase } from "./integrations/supabase/client";
import { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for Supabase to restore session
    supabase.auth.getSession().then(() => {
      setLoading(false);
    });

    // If user logs in/out, stop loading
    supabase.auth.onAuthStateChange(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <RoutesFile />
    </BrowserRouter>
  );
}