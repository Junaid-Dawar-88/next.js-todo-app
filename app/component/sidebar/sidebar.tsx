import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col p-6 space-y-6">
      <div className="text-2xl font-bold text-indigo-500 mb-6">
        TaskManager
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="block px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/todotable"
              className="block px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Todo
            </Link>
          </li>
        </ul>
      </nav>

      <div className="text-sm text-slate-400">
        &copy; 2026 TaskManager
      </div>
    </aside>
  );
};

export default Sidebar;