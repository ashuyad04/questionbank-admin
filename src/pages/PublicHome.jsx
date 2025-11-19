import { Link } from "react-router-dom";

export default function PublicHome() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-4">MMUT Question Bank</h1>

      <p className="text-lg mb-6">
        Browse previous year question papers without logging in.
      </p>

      <div className="space-y-4">
        <Link
          to="/browse"
          className="px-5 py-3 bg-blue-600 text-white rounded-lg block w-fit"
        >
          Browse Question Papers
        </Link>

        <Link
          to="/request-access"
          className="px-5 py-3 bg-green-600 text-white rounded-lg block w-fit"
        >
          Request Admin Access
        </Link>

        <Link
          to="/admin/login"
          className="px-5 py-3 bg-gray-800 text-white rounded-lg block w-fit"
        >
          Admin / Super Admin Login
        </Link>
      </div>
    </div>
  );
}