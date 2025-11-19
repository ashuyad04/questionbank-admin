import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4">

        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

        {/* Dashboard */}
        <Link
          to="/admin/dashboard"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Dashboard
        </Link>

        {/* Upload Papers */}
        <Link
          to="/admin/upload"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Upload Papers
        </Link>

        {/* Super Admin Panel */}
        <Link
          to="/admin/requests"
          className="block px-3 py-2 rounded hover:bg-gray-700"
        >
          Super Admin Panel
        </Link>

        {/* Logout */}
        <Link
          to="/admin/login"
          onClick={() => supabase.auth.signOut()}
          className="block px-3 py-2 rounded hover:bg-gray-700 text-red-300"
        >
          Logout
        </Link>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}