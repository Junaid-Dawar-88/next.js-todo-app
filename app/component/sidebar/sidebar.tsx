'use client'
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ✅ Header */}
      <header className="md:hidden fixed top-0 left-0 w-full h-18 bg-slate-900 text-white flex items-center px-4 z-50 shadow">
        <button
          className="p-2 bg-indigo-600 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <h2 className="ml-4 font-bold text-lg">Task Manager</h2>
      </header>

      <aside
        className={`
          fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-slate-900 text-white flex flex-col p-2 space-y-6
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          
          md:top-0 md:h-screen md:translate-x-0 md:static md:z-auto
        `}
      >
        <div className="text-2xl border-b py-2 mt-3 flex items-center justify-around gap-3 font-bold mb-6">
          <div className="w-12 h-12 rounded-full bg-white flex items-center text-black justify-center">
            TM
          </div>
          <h3>Task Manager</h3>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/todotable"
                className="block px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Create Todo
              </Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm text-slate-400">&copy; 2026 TaskManager</div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;