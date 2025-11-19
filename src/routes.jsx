import { Routes, Route } from "react-router-dom";

import PublicHome from "./pages/PublicHome";
import PublicBrowse from "./pages/PublicBrowse";
import RequestAccess from "./pages/RequestAccess";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AdminRequests from "./pages/AdminRequests";

import ProtectedRoute from "./components/ProtectedRoute";
import NotAuthorized from "./pages/NotAuthorized";

export default function RoutesFile() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<PublicHome />} />
      <Route path="/browse" element={<PublicBrowse />} />
      <Route path="/request-access" element={<RequestAccess />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<Auth />} />

      {/* Admin Pages */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/requests"
        element={
          <ProtectedRoute superAdminOnly={true}>
            <AdminRequests />
          </ProtectedRoute>
        }
      />

      <Route path="/no-access" element={<NotAuthorized />} />
    </Routes>
  );
}