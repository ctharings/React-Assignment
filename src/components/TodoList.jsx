function TodoList({ todos, toggleTodo, deleteTodo }) {
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
            <span className="todo-priority">{todo.priority}</span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="delete-button"
            aria-label={`Delete ${todo.title}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
