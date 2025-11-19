import { useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { toast } from "sonner";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  const sendMagicLink = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");

    // Step 1 — Check if email belongs to an admin
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (!admin || adminError) {
      return toast.error("Access denied. Only approved admins can log in.");
    }

    // Step 2 — Send Supabase Magic Login Link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin/dashboard`,
      },
    });

    if (error) {
      return toast.error(error.message);
    }

    setLinkSent(true);
    toast.success("Magic login link sent! Check your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Admin Login</CardTitle>
          <CardDescription>Only approved admins can log in</CardDescription>
        </CardHeader>

        <CardContent>
          {!linkSent ? (
            <form className="space-y-4" onSubmit={sendMagicLink}>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="admin@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button className="w-full">Send Login Link</Button>
            </form>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-sm">A login link has been sent to:</p>
              <p className="font-semibold">{email}</p>
              <p className="text-sm text-muted-foreground">
                Please check your email and click the link to log in.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}