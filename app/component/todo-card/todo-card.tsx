import React from 'react'

interface TodoCardProps {
  title: string
  description: string
  status: string
  priority: string
  onClose: () => void
}

const TodoCard: React.FC<TodoCardProps> = ({ title, description, status, priority, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white max-w-md w-full rounded-lg shadow-lg p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
            {status.toUpperCase()}
          </span>
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-200">
            {priority.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TodoCard