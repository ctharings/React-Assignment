function TodoList({ todos, toggleTodo, deleteTodo, editTodo, setEditingTodo, editingTodo }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const handleKeyDown = (e, todoId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTodo(todoId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !todos.find(t => t.id === dueDate)?.completed;
  };

  return (
    <div className="todo-list" role="list">
      {todos.map((todo) => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`} role="listitem">
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="todo-checkbox"
              aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <div className="todo-details">
              <span
                className={`todo-title ${getPriorityColor(todo.priority)}`}
                data-testid="todo-title"
                tabIndex="0"
                role="button"
                onClick={() => toggleTodo(todo.id)}
                onKeyDown={(e) => handleKeyDown(e, todo.id)}
                aria-label={`Toggle ${todo.title}`}
              >
                {todo.title}
              </span>
              <div className="todo-meta">
                <span className="todo-priority">{todo.priority}</span>
                {todo.dueDate && (
                  <span className={`todo-due-date ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
                    Due: {formatDate(todo.dueDate)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="todo-actions">
            <button
              onClick={() => setEditingTodo(todo)}
              className="edit-button"
              aria-label={`Edit ${todo.title}`}
              disabled={editingTodo?.id === todo.id}
            >
              {editingTodo?.id === todo.id ? 'Editing...' : 'Edit'}
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
              aria-label={`Delete ${todo.title}`}
              disabled={editingTodo?.id === todo.id}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
