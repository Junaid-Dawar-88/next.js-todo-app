import React from 'react'

interface SearchTodoProps {
  search: string
  setSearch: (value: string) => void
  filterPriority: string
  setFilterPriority: (value: string) => void
  filterStatus: string
  setFilterStatus: (value: string) => void
}

const SearchTodo: React.FC<SearchTodoProps> = ({
  search,
  setSearch,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus
}) => {
  return (
    <div className="w-full py-8 px-8 bg-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Todo here..."
        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full md:w-auto">
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-complete">In-Complete</option>
          <option value="complete">Complete</option>
        </select>
      </div>
    </div>
  )
}

export default SearchTodo