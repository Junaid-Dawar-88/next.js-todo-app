'use client'
import React, { useState, useMemo, useEffect } from 'react'
import TodoModalUI from '../component/todo-modal/todo-modal'
import SearchTodo from '../component/search-todo/search-todo'
import TodoCard from '../component/todo-card/todo-card'
import axios from 'axios'

interface Todo {
  id: number
  title: string
  description: string
  status: string
  priority: string
}

const TodoTable = () => {
  const [todo, setTodo] = useState<Todo[] | null>(null)
  const [updateTodo, setUpdateTodo] = useState<Todo | null>(null)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [search, setSearch] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('/api/todo')
        setTodo(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTodos()
  }, [])

  const filteredTodos = useMemo(() => {
    if (!todo) return []
    return todo.filter(
      t =>
        t.title.toLowerCase().includes(search.toLowerCase()) &&
        (filterPriority ? t.priority === filterPriority : true) &&
        (filterStatus ? t.status === filterStatus : true)
    )
  }, [todo, search, filterPriority, filterStatus])

  const handleDelete = async (id: number) => {
    const sure = confirm('Are you sure you want to delete this todo?')
    if (!sure) return

    try {
      await axios.delete('/api/todo', { data: { id } })
      setTodo(prev => (prev ? prev.filter(t => t.id !== id) : null))
      if (selectedTodo?.id === id) setSelectedTodo(null)
    } catch (error) {
      console.error(error)
      alert('Failed to delete todo.')
    }
  }

  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleDrop = (dropIndex: number) => {
    if (dragIndex === null || !todo) return

    const updated = [...todo]
    const draggedItem = updated[dragIndex]

    updated.splice(dragIndex, 1)
    updated.splice(dropIndex, 0, draggedItem)

    setTodo(updated)
    setDragIndex(null)
  }

  return (
    <>
      <SearchTodo
        search={search}
        setSearch={setSearch}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="p-6 mt-5">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Total Task: {filteredTodos.length}
              </h2>
              <p className="text-sm text-slate-500">Track and manage your daily tasks</p>
            </div>

            <TodoModalUI
              todo={todo}
              setTodo={setTodo}
              updateTodo={updateTodo}
              setUpdateTodo={setUpdateTodo}
            />
          </div>

          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 w-[40%]">Task</th>
                  <th className="px-6 py-4 w-[15%]">Status</th>
                  <th className="px-6 py-4 w-[15%]">Priority</th>
                  <th className="px-6 py-4 w-[15%]">Due Date</th>
                  <th className="px-6 py-4 text-right w-[15%]">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredTodos.map((t, index) => (
                  <tr
                    key={t.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    className="hover:bg-slate-50 transition cursor-move"
                    onClick={() => setSelectedTodo(t)}
                  >
                    <td className="px-6 py-4 max-w-[350px]">
                      <p className="font-semibold text-slate-800">{t.title}</p>
                      <p className="text-sm text-slate-500 line-clamp-2">{t.description}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        {t.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-200 text-slate-700">
                        {t.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">Feb 18, 2026</td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          setUpdateTodo(t)
                        }}
                        className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 hover:bg-slate-100 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={e => {
                          e.stopPropagation()
                          handleDelete(t.id)
                        }}
                        className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
<div className="md:hidden px-4 py-3 space-y-4">
  {filteredTodos.map((t, index) => (
    <div
      key={t.id}
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(index)}
      className="bg-slate-50 p-4 rounded-2xl shadow cursor-move"
      onClick={() => setSelectedTodo(t)}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg text-slate-800">{t.title}</h3>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
          {t.status}
        </span>
      </div>
      <p className="text-slate-600 mb-2 line-clamp-3">{t.description}</p>
      <div className="flex justify-between items-center">
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-200 text-slate-700">
          {t.priority}
        </span>
        <div className="space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setUpdateTodo(t)
            }}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 hover:bg-slate-100 transition"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(t.id)
            }}
            className="px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>

        {selectedTodo && (
          <TodoCard
            title={selectedTodo.title}
            description={selectedTodo.description}
            status={selectedTodo.status}
            priority={selectedTodo.priority}
            onClose={() => setSelectedTodo(null)}
          />
        )}
      </div>
    </>
  )
}

export default TodoTable