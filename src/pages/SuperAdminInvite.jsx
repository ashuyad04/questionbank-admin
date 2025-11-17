import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

export default function SuperAdminInvite() {
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  async function handleInvite() {
    if (!email) return alert("Enter an email");

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase.rpc("create_admin_invite", {
      target_email: email,
      creator_id: user.id
    });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setInviteCode(data);
  }

  return (
    <div className="p-6">
      <h1>Invite a New Admin</h1>

      <input
        className="border p-2 mt-4"
        placeholder="admin@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleInvite}
        className="bg-blue-600 text-white px-4 py-2 mt-4"
      >
        Generate Invite Code
      </button>

      {inviteCode && (
        <div className="mt-4 p-4 border bg-gray-50">
          <p><b>Invite Code:</b></p>
          <p className="text-xl font-bold">{inviteCode}</p>
          <p className="mt-2 text-sm">Share this code with the new admin.</p>
        </div>
      )}
    </div>
  );
}
