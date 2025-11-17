// src/routes.jsx

import { Routes, Route } from "react-router-dom";

// Public Pages
import Auth from "./pages/Auth";
import BrowsePapers from "./pages/student/BrowsePapers";
import NotAuthorized from "./pages/NotAuthorized";

// Dashboard (Admins + Super Admin)
import Dashboard from "./pages/Dashboard";

// Super Admin layout
import SuperAdmin from "./pages/SuperAdmin";

// Admin Panel Inner Pages
import AdminsManagement from "./pages/admins/AdminsManagement";
import UploadPaper from "./pages/Upload/UploadPaper";
import ManagePapers from "./pages/papers/ManagePapers";
import ActivityLogs from "./pages/logs/ActivityLogs";

// Route Protection
import ProtectedRoute from "./components/ProtectedRoute";

export default function RoutesFile() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Auth />} />
      <Route path="/browse" element={<BrowsePapers />} />

      {/* ADMIN + SUPER ADMIN DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* SUPER ADMIN PANEL */}
      <Route
        path="/admin-panel"
        element={
          <ProtectedRoute superAdminOnly>
            <SuperAdmin />
          </ProtectedRoute>
        }
      >
        {/* Default message */}
        <Route index element={<div>Select an item from the sidebar</div>} />

        {/* Manage Admins */}
        <Route path="admins" element={<AdminsManagement />} />

        {/* Upload Papers */}
        <Route path="upload" element={<UploadPaper />} />

        {/* NEW: Manage Uploaded Papers */}
        <Route path="papers" element={<ManagePapers />} />

        {/* Activity Logs */}
        <Route path="logs" element={<ActivityLogs />} />
      </Route>

      {/* ACCESS DENIED */}
      <Route path="/no-access" element={<NotAuthorized />} />

    </Routes>
  );
}