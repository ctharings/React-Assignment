import { useState, useEffect } from 'react';

function TodoForm({ addTodo, editingTodo, editTodo }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  // Update form when editing
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setPriority(editingTodo.priority);
      setDueDate(editingTodo.dueDate || '');
    } else {
      setTitle('');
      setPriority('Medium');
      setDueDate('');
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const todoData = {
      title: title.trim(),
      priority,
      dueDate: dueDate || null
    };

    if (editingTodo) {
      editTodo(editingTodo.id, todoData);
    } else {
      addTodo(todoData);
    }

    // Reset form
    setTitle('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
        aria-label="Priority"
        role="combobox"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="due-date-input"
        aria-label="Due date"
      />
      <button type="submit" className="add-button">
        {editingTodo ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
