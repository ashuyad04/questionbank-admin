import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import Layout from "../components/Layout";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const { data } = await supabase
      .from("admin_requests")
      .select("*")
      .order("created_at", { ascending: false });

    setRequests(data || []);
  };

  const approveRequest = async (req) => {
    await supabase.from("admins").insert([
      {
        email: req.email,
        name: req.name,
        role: "admin",
        uid: null,
      },
    ]);

    await supabase
      .from("admin_requests")
      .update({ status: "approved" })
      .eq("id", req.id);

    alert("Request approved!");
    loadRequests();
  };

  const rejectRequest = async (id) => {
    await supabase
      .from("admin_requests")
      .update({ status: "rejected" })
      .eq("id", id);

    alert("Request rejected!");
    loadRequests();
  };

  const deleteRequest = async (id) => {
    await supabase.from("admin_requests").delete().eq("id", id);
    loadRequests();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Requests</h1>

      {requests.length === 0 && <p>No requests yet.</p>}

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="border p-4 rounded-lg">
            <p><strong>Name:</strong> {req.name}</p>
            <p><strong>Email:</strong> {req.email}</p>
            <p><strong>Branch:</strong> {req.branch}</p>
            <p><strong>Semester:</strong> {req.semester}</p>
            <p><strong>Roll No:</strong> {req.rollno}</p>
            <p><strong>Reason:</strong> {req.reason}</p>
            <p><strong>Status:</strong> {req.status}</p>

            <div className="flex gap-3 mt-4">
              {req.status === "pending" && (
                <>
                  <button
                    onClick={() => approveRequest(req)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectRequest(req.id)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                onClick={() => deleteRequest(req.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}