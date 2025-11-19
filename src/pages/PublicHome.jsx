// src/pages/PublicHome.jsx
import { Link } from "react-router-dom";
import { Search, BookOpen, UserPlus, LogIn } from "lucide-react";
import Logo from "../components/Logo";

export default function PublicHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100">
      {/* centered container */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="flex-none" />
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold">PowerLine</h1>
              <div className="text-sm text-slate-400">Electrical Engineering Question Bank</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/browse" className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">Browse</Link>
            <Link to="/request-access" className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-semibold">Request Admin</Link>
            <Link to="/admin/login" className="px-4 py-2 rounded border border-slate-700 hover:bg-slate-800">Admin Login</Link>
          </div>
        </header>

        {/* HERO */}
        <section className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
              Past papers, organized for Electrical students
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl">
              Search by subject, semester, year or branch. PowerLine helps students prepare faster with an easy-to-use archive of previous years' question papers.
            </p>

            {/* search */}
            <div className="mt-8 flex gap-3 max-w-xl">
              <div className="flex items-center gap-3 bg-slate-800 px-4 py-3 rounded-md w-full">
                <Search className="text-slate-400" />
                <input
                  aria-label="Search papers"
                  className="bg-transparent outline-none w-full text-slate-100"
                  placeholder="Search subject, subject code, or year (e.g. Control Systems 2023)"
                />
              </div>

              <button className="px-5 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-slate-900">
                Search
              </button>
            </div>

            {/* quick filters */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="px-3 py-2 rounded bg-slate-800 text-slate-300">CSE</button>
              <button className="px-3 py-2 rounded bg-slate-800 text-slate-300">ECE</button>
              <button className="px-3 py-2 rounded bg-slate-800 text-slate-300">EE</button>
              <button className="px-3 py-2 rounded bg-slate-800 text-slate-300">ME</button>
              <button className="px-3 py-2 rounded bg-slate-800 text-slate-300">1st Sem</button>
              <button className="px-3 py-2 rounded bg-slate-800 text-slate-300">2024</button>
            </div>
          </div>

          {/* cards */}
          <div className="grid gap-4">
            <Link to="/browse" className="block bg-gradient-to-tr from-slate-800/60 to-slate-900/60 border border-slate-800 rounded-lg p-6 hover:scale-[1.01] transition">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded bg-slate-800">
                  <BookOpen className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Browse Papers</h3>
                  <p className="text-sm text-slate-400">All branches • All semesters • Download PDFs</p>
                </div>
              </div>
            </Link>

            <Link to="/request-access" className="block bg-gradient-to-tr from-slate-800/60 to-slate-900/60 border border-slate-800 rounded-lg p-6 hover:scale-[1.01] transition">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded bg-slate-800">
                  <UserPlus className="w-7 h-7 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Request Admin Access</h3>
                  <p className="text-sm text-slate-400">Apply to upload or manage papers</p>
                </div>
              </div>
            </Link>

            <Link to="/admin/login" className="block bg-gradient-to-tr from-slate-800/60 to-slate-900/60 border border-slate-800 rounded-lg p-6 hover:scale-[1.01] transition">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded bg-slate-800">
                  <LogIn className="w-7 h-7 text-slate-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Admin Login</h3>
                  <p className="text-sm text-slate-400">For approved admins and super admins</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 text-center text-slate-400">
          © {new Date().getFullYear()} PowerLine • Built for Electrical students
        </footer>
      </div>
    </div>
  );
}