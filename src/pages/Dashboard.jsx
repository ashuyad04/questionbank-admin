import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, Super Admin</h1>

      <p>Email: { /* your logged-in email */ }</p>
      <p>Role: super</p>
      <p>Course: N/A</p>
      <p>Batch: N/A</p>

      <div className="flex gap-4 mt-4">
        <Button
          onClick={() => navigate("/admin/requests")}
          variant="default"
        >
          Open Super Admin Panel
        </Button>

        <Button
          onClick={() => navigate("/admin/login")}
          variant="outline"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}