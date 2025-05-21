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
            />
            <span className={`todo-title ${getPriorityColor(todo.priority)}`} data-testid="todo-title">
              {todo.title}
            </span>
            <span className="todo-priority">{todo.priority}</span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
