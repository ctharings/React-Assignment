import { useState } from 'react'
import './App.scss'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')

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
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
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

  return (
    <div className="App">
      <h1>Todo App</h1>

      {/* Filter and Sort Controls */}
      <div className="controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <TodoStats todos={todos} />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={getFilteredTodos()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  )
}

export default App
