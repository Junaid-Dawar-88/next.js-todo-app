'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  total: number;
  completed: number;
  pending: number;
}

const HomePage = () => {
  const stats: Stats = {
    total: 12,
    completed: 7,
    pending: 5,
  };

  return (
    <div className="min-h-full bg-gray-100 text-gray-900">
      <div className="flex flex-col items-center justify-center p-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10 w-full max-w-5xl">
          
          <div className="p-10 rounded-3xl shadow flex flex-col items-center justify-center min-h-[200px] bg-white">
            <span className="text-4xl font-bold">{stats.total}</span>
            <span className="text-lg text-gray-500 mt-2">Total Todos</span>
          </div>

          <div className="p-10 rounded-3xl shadow flex flex-col items-center justify-center min-h-[200px] bg-green-100">
            <span className="text-4xl font-bold">{stats.completed}</span>
            <span className="text-lg mt-2 text-green-800">
              Completed
            </span>
          </div>

          <div className="p-10 rounded-3xl shadow flex flex-col items-center justify-center min-h-[200px] bg-yellow-100">
            <span className="text-4xl font-bold">{stats.pending}</span>
            <span className="text-lg mt-2 text-yellow-800">
              Pending
            </span>
          </div>
        </div>

        <p className="text-center max-w-xl mb-4 text-lg text-gray-700">
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