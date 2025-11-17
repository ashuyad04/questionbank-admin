import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [admin, setAdmin] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
    // 1 — Get logged in user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return nav("/"); // redirect to login
    }

    // 2 — Fetch admin record
    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", user.email)
      .single();

    if (error || !data) {
      return nav("/no-access");
    }

    setAdmin(data);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    nav("/");
  };

  if (!admin) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Welcome, {admin.full_name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Role:</strong> {admin.role}</p>
          <p><strong>Course:</strong> {admin.course || "N/A"}</p>
          <p><strong>Batch:</strong> {admin.batch || "N/A"}</p>

          {admin.role === "super" && (
            <Button className="w-full" onClick={() => nav("/admin-panel")}>
              Open Super Admin Panel
            </Button>
          )}

          <Button variant="outline" className="w-full" onClick={logout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
