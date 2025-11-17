import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

import { useNavigate } from "react-router-dom";

export default function OTPVerify() {
  const nav = useNavigate();
  const identifier = localStorage.getItem("identifier");
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: identifier.includes("@") ? identifier : undefined,
      phone: identifier.match(/^\d{10}$/) ? "+91" + identifier : undefined,
      token: otp,
      type: "sms",
    });

    if (error) return alert(error.message);

    nav("/dashboard");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Enter OTP</h1>

      <input
        placeholder="123456"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}
