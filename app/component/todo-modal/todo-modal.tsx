'use client'
import axios from 'axios';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'

interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

interface props {
 todo: Todo[] | null
  setTodo: Dispatch<SetStateAction<Todo[] | null>>
  updateTodo: Todo | null
  setUpdateTodo: Dispatch<SetStateAction<Todo | null>>
}

const TodoModalUI = ({todo , setTodo , updateTodo , setUpdateTodo }: props ) => {
  const [showModal , setShowModal] = useState(false)
  const [title , setTitle] = useState('')
  const [description , setDescription] = useState('')
  const [status , setStatus] = useState('pending')
  const [priority , setPriority] = useState('medium')

   useEffect(() => {
  if (updateTodo) {
    const timer = setTimeout(() => {
      setTitle(updateTodo.title)
      setDescription(updateTodo.description)
      setStatus(updateTodo.status)
      setPriority(updateTodo.priority)
      setShowModal(true)
    }, 0)

    return () => clearTimeout(timer)
  }
}, [updateTodo])


   const clearForm = () => {
    setTitle('')
    setDescription('')
    setStatus('pending')
    setPriority('medium')
    setShowModal(false)
   }

const handleAddTodo = async () => {
  if (!title) return alert('Please fill the input field!')

  const newTodo = {
    title: title,
    description: description,
    status: status || 'pending',
    priority: priority || 'medium',
  }

  try {
    const res = await axios.post('/api/todo', newTodo)

    setTodo(prev => prev ? [...prev, res.data] : [res.data])
    clearForm()
  } catch (error) {
    console.error(error)
    alert('Failed to add todo!')
  }
}

   const handleUpdateTodo = async () => {
  if (!updateTodo) return
  const updatedTodoData = {
    id: updateTodo.id,
    title,
    description,
    status,
    priority
  }
  try {
    const res = await axios.patch('/api/todo', updatedTodoData)
    setTodo(prev =>
      prev?.map(t => (t.id === updateTodo.id ? res.data : t)) || null
    )
    setUpdateTodo(null)
    clearForm()
  } catch (error) {
    console.error(error)
    alert('Failed to update todo.')
  }
}

  return (
    <>
    <div>
     <button 
      onClick={() => setShowModal(true)}
     className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white font-semibold
                             hover:bg-indigo-600 active:scale-95 transition">
            + Add Task
          </button>
    </div>
    {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      <div className="relative w-[520px] rounded-3xl bg-white shadow-2xl overflow-hidden animate-[fadeIn_.25s_ease]">
        <div className="relative p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full"></div>

          <h1 className="text-3xl font-bold tracking-tight">
            Add New Task
          </h1>

          <p className="text-sm text-white/90 mt-1">
            Create a new todo and organize your workflow
          </p>
        </div>
        <div className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Task Title *
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, descriptive title..."
              className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-2.5
                         focus:outline-none focus:ring-4 focus:ring-indigo-200
                         focus:border-indigo-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Description
            </label>

            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about your task..."
              rows={3}
              className="w-full resize-none rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-2.5
                         focus:outline-none focus:ring-4 focus:ring-indigo-200
                         focus:border-indigo-400 transition"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Status
              </label>

              <select
               value={status}
               onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-2.5
                           focus:outline-none focus:ring-4 focus:ring-indigo-200
                           focus:border-indigo-400 transition"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Complete</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Priority
              </label>

              <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-2.5
                           focus:outline-none focus:ring-4 focus:ring-indigo-200
                           focus:border-indigo-400 transition"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
              {updateTodo ? (
                <button 
            onClick={() => handleUpdateTodo()}
            className="py-3 px-5 rounded-xl bg-indigo-500 text-white font-semibold
                               hover:bg-indigo-600 active:scale-95 transition">
              Update Task
            </button>
              ) : (
            <button 
            onClick={() => handleAddTodo()}
            className="py-3 px-5 rounded-xl bg-indigo-500 text-white font-semibold
                               hover:bg-indigo-600 active:scale-95 transition">
              Add Task
            </button>
           )}
            <button 
            onClick={() => setShowModal(false)}
            className="py-3 rounded-xl border-2 border-slate-200 font-semibold
                               hover:bg-slate-100 active:scale-95 transition">
              Cancel
            </button>

          </div>

        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default TodoModalUI;