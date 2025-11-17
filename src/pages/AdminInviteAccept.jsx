import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

export default function AdminInviteAccept() {
  const [inviteCode, setInviteCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  async function handleAccept() {
    if (!inviteCode || !fullName || !password) {
      return alert("All fields required");
    }

    const { data, error } = await supabase.rpc("accept_admin_invite", {
      invite_code: inviteCode,
      full_name: fullName,
      raw_password: password
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Admin account created! You can now log in.");
    window.location.href = "/auth";
  }

  return (
    <div className="p-6">
      <h1>Become an Admin</h1>

      <input
        className="border p-2 mt-4"
        placeholder="Invite Code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />

      <input
        className="border p-2 mt-4"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        className="border p-2 mt-4"
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleAccept}
        className="bg-green-600 text-white px-4 py-2 mt-4"
      >
        Create Admin Account
      </button>
    </div>
  );
}
