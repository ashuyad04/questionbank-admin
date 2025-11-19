import { Link } from "react-router-dom";

export default function PublicHome() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      
      {/* Top Navigation */}
      <header className="w-full border-b border-white/10 backdrop-blur-lg bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">⚡</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">PowerLine</h1>
          </div>

          {/* Nav Links */}
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
            <Link to="/browse" className="hover:text-white">Browse</Link>
            <Link to="/request-access" className="hover:text-white">Request Admin</Link>
            <Link
              to="/admin/login"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-md text-white font-medium"
            >
              Admin Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h2 className="text-5xl sm:text-6xl font-extrabold leading-tight bg-gradient-to-r from-teal-400 to-blue-400 text-transparent bg-clip-text">
             
              Resources, Simplified.
            </h2>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              PowerLine gives you fast access to structured, high-quality engineering resources
              — past papers, reference material, and curated academic documents.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/browse"
                className="px-8 py-3 bg-teal-600 text-white rounded-lg text-lg font-medium shadow hover:bg-teal-700"
              >
                Browse Resources
              </Link>

              <Link
                to="/request-access"
                className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg text-lg font-medium text-white hover:bg-white/20"
              >
                Request Admin Access
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle geometric background */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,165,140,0.15),transparent_70%)]"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-16">What PowerLine Offers</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-3">Curated Documents</h4>
              <p className="text-slate-400 text-sm">
                Cleanly organized and regularly updated collections for academic use.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-3">Fast Search</h4>
              <p className="text-slate-400 text-sm">
                Locate the exact resource you need using powerful filters and search patterns.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-3">Free Access</h4>
              <p className="text-slate-400 text-sm">
                Students can browse & download resources instantly without logging in.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-3">Admin Panel</h4>
              <p className="text-slate-400 text-sm">
                Verified admins can upload content, manage database entries & maintain quality.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-3">Secure Authentication</h4>
              <p className="text-slate-400 text-sm">
                Passwordless login for admins using Supabase Magic Links.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
              <h4 className="text-xl font-semibold mb-3">Reliable Hosting</h4>
              <p className="text-slate-400 text-sm">
                Hosted on Netlify with secure APIs and optimized delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 bg-black text-center text-sm text-slate-500">
        © {new Date().getFullYear()} PowerLine. All Rights Reserved.
      </footer>
    </div>
  );
}