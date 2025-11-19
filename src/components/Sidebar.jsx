import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabase/client";
import { Button } from "../components/ui/button";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md mb-1 ${
      isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r p-4 h-screen">
      
      {/* Logo / Title */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>

      {/* Navigation */}
      <nav className="mb-6 space-y-1">

        {/* Public Browsing */}
        <NavLink to="/browse" className={linkClass}>
          Browse Papers (Public)
        </NavLink>

        {/* Admin Routes */}
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin-panel/admins" className={linkClass}>
          Manage Admins
        </NavLink>

        <NavLink to="/admin-panel/upload" className={linkClass}>
          Upload Papers
        </NavLink>
<Link to="/admin/requests">Admin Requests</Link>
        <NavLink to="/admin-panel/logs" className={linkClass}>
          Activity Logs
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="mt-6">
        <Button variant="destructive" onClick={logout} className="w-full">
          Log Out
        </Button>
      </div>

    </aside>
  );
}