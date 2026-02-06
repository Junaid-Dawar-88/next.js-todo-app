import React from 'react'

const HeaderComp = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Task <span className="text-blue-600">Manager</span>
        </h1>

        <div className="flex items-center gap-4">
          
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full">
            Tasks
          </span>

          <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold cursor-pointer hover:bg-blue-700 transition">
            U
          </div>

        </div>
      </div>
    </header>
  )
}

export default HeaderComp