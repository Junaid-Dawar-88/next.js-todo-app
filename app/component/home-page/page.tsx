'use client';

import React, { useState } from 'react';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import TodoModalUI from '../todo-modal/todo-modal';
import TodoTable from '../../todotable/page';

interface Stats {
  total: number;
  completed: number;
  pending: number;
}

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const stats: Stats = {
    total: 12,
    completed: 7,
    pending: 5,
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <nav
        className={`w-full flex items-center justify-between px-6 py-4 shadow-md transition-colors duration-500 ${
          darkMode ? 'bg-slate-800' : 'bg-white'
        }`}
      >
        <span className="text-2xl font-bold">Task-Manager</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
      <div className="flex flex-col items-center justify-center p-6 mt-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10 w-full max-w-5xl">
          <div
            className={`p-10 rounded-3xl shadow flex flex-col items-center justify-center transition-colors duration-500 min-h-[200px] ${
              darkMode ? 'bg-slate-700' : 'bg-white'
            }`}
          >
            <span className="text-4xl font-bold">{stats.total}</span>
            <span className="text-lg text-gray-500 dark:text-gray-300 mt-2">Total Todos</span>
          </div>

          <div
            className={`p-10 rounded-3xl shadow flex flex-col items-center justify-center transition-colors duration-500 min-h-[200px] ${
              darkMode ? 'bg-green-800' : 'bg-green-100'
            }`}
          >
            <span className="text-4xl font-bold">{stats.completed}</span>
            <span
              className={`text-lg mt-2 ${darkMode ? 'text-green-300' : 'text-green-800'}`}
            >
              Completed
            </span>
          </div>

          <div
            className={`p-10 rounded-3xl shadow flex flex-col items-center justify-center transition-colors duration-500 min-h-[200px] ${
              darkMode ? 'bg-yellow-800' : 'bg-yellow-100'
            }`}
          >
            <span className="text-4xl font-bold">{stats.pending}</span>
            <span
              className={`text-lg mt-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}
            >
              Pending
            </span>
          </div>
        </div>

        <p className="text-center max-w-xl mb-4 text-lg dark:text-gray-300 text-gray-700">
          Task-Manager helps you stay organized, track your tasks, and boost productivity. Quickly access your todos and get started managing your day efficiently.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/todos">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition text-lg">
              Go to Todos <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
