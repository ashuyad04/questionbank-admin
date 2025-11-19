import React, { useEffect, useState } from "react";
import { supabase } from "../../integrations/supabase/client";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";

export default function AdminsManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("admins").select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      console.error(error);
      toast.error("Failed to load admins");
      return;
    }
    setAdmins(data || []);
  };

  const promote = async (id) => {
    if (!confirm("Promote to super admin?")) return;
    const { error } = await supabase.from("admins").update({ role: "super", super_admin: true }).eq("id", id);
    if (error) return toast.error("Failed to promote: " + error.message);
    toast.success("Promoted");
    fetchAdmins();
  };

  const demote = async (id) => {
    if (!confirm("Demote to normal admin?")) return;
    const { error } = await supabase.from("admins").update({ role: "admin", super_admin: false }).eq("id", id);
    if (error) return toast.error("Failed to demote: " + error.message);
    toast.success("Demoted");
    fetchAdmins();
  };

  const removeAdmin = async (id, email) => {
    if (!confirm(`Delete admin ${email}? This is irreversible.`)) return;
    const { error } = await supabase.from("admins").delete().eq("id", id);
    if (error) return toast.error("Delete failed: " + error.message);
    toast.success("Deleted");
    fetchAdmins();
  };

  const invite = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return toast.error("Enter email");
    // Simple flow: directly insert admin row with role 'pending' or send invite row
    const { error } = await supabase.from("admin_invites").insert([{ email: inviteEmail, created_at: new Date().toISOString() }]);
    if (error) {
      console.error(error);
      toast.error("Failed to create invite: " + (error.message || error));
      return;
    }
    toast.success("Invite recorded. Super admin should confirm creation.");
    setInviteEmail("");
    // Optionally send magic link or create admin row immediately depending on flow
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Invite new admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={invite} className="flex gap-2">
            <Input placeholder="email@example.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
            <Button type="submit">Create Invite</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admins</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading…</p>
          ) : admins.length === 0 ? (
            <p>No admins</p>
          ) : (
            <div className="space-y-3">
              {admins.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-semibold">{a.full_name || "—"}</div>
                    <div className="text-sm text-muted-foreground">{a.email}</div>
                    <div className="text-xs text-muted-foreground">Role: {a.role || "admin"}</div>
                  </div>

                  <div className="flex gap-2">
                    {a.role !== "super" ? (
                      <Button onClick={() => promote(a.id)}>Promote</Button>
                    ) : (
                      <Button variant="outline" onClick={() => demote(a.id)}>Demote</Button>
                    )}
                    <Button variant="destructive" onClick={() => removeAdmin(a.id, a.email)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
