import { useState, useEffect } from 'react'
import './App.scss'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import EmptyState from './components/EmptyState'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [isLoading, setIsLoading] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)

  // Add todo handler
  const addTodo = (todo) => {
    setTodos([...todos, {
      ...todo,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString()
    }])
  }

  // Edit todo handler
  const editTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ))
    setEditingTodo(null)
  }

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + N to focus on new todo input
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        document.querySelector('.todo-input')?.focus()
      }
      // Ctrl/Cmd + F to focus on filter
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault()
        document.querySelector('select[aria-label="Filter by status"]')?.focus()
      }
      // Escape to cancel editing
      if (e.key === 'Escape' && editingTodo) {
        setEditingTodo(null)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [editingTodo])

  // Get filtered and sorted todos
  const getFilteredTodos = () => {
    return todos
      .filter(todo => {
        // Status filter
        if (statusFilter === 'active') return !todo.completed
        if (statusFilter === 'completed') return todo.completed
        return true
      })
      .filter(todo => {
        // Priority filter
        if (priorityFilter !== 'all') return todo.priority === priorityFilter
        return true
      })
      .sort((a, b) => {
        // Sorting
        if (sortBy === 'priority') {
          const priorityValues = { 'Low': 1, 'Medium': 2, 'High': 3 }
          return priorityValues[b.priority] - priorityValues[a.priority]
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
  }

  const filteredTodos = getFilteredTodos()

  return (
    <ErrorBoundary>
      <div className="app">
        <h1>Todo App</h1>
        <div className="keyboard-shortcuts">
          <p>Keyboard Shortcuts: Ctrl/Cmd + N (New Todo), Ctrl/Cmd + F (Filter), Esc (Cancel Edit)</p>
        </div>

        <TodoForm
          addTodo={addTodo}
          editingTodo={editingTodo}
          editTodo={editTodo}
        />

        <div className="controls" role="group" aria-label="Filter and sort controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort todos"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : filteredTodos.length === 0 ? (
          <EmptyState />
        ) : (
          <TodoList
            todos={filteredTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            setEditingTodo={setEditingTodo}
            editingTodo={editingTodo}
          />
        )}

        <TodoStats todos={todos} />
      </div>
    </ErrorBoundary>
  )
}

export default App
