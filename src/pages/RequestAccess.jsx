import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

export default function RequestAccess() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    branch: "",
    semester: "",
    rollno: "",
    reason: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRequest = async () => {
    const { error } = await supabase.from("admin_requests").insert([form]);

    if (error) alert(error.message);
    else alert("Your admin access request has been submitted!");
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Request Admin Access</h1>

      <div className="space-y-4 max-w-lg">
        <input name="name" onChange={handleChange} placeholder="Name" className="border p-3 w-full" />
        <input name="email" onChange={handleChange} placeholder="Email" className="border p-3 w-full" />
        <input name="branch" onChange={handleChange} placeholder="Branch" className="border p-3 w-full" />
        <input name="semester" onChange={handleChange} placeholder="Semester" className="border p-3 w-full" />
        <input name="rollno" onChange={handleChange} placeholder="Roll No" className="border p-3 w-full" />
        <textarea name="reason" onChange={handleChange} placeholder="Reason" className="border p-3 w-full" />

        <button
          onClick={submitRequest}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg"
        >
          Submit Request
        </button>
      </div>
    </div>
  );
}