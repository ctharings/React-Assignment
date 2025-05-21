import { useState } from 'react'
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

  // Add todo handler
  const addTodo = (todo) => {
    setTodos([...todos, {
      ...todo,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString()
    }])
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

        <TodoForm addTodo={addTodo} />

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
          />
        )}

        <TodoStats todos={todos} />
      </div>
    </ErrorBoundary>
  )
}

export default App
