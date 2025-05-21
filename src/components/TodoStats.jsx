function TodoStats({ todos }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  const highestPriorityIncomplete = todos
    .filter(todo => !todo.completed)
    .sort((a, b) => {
      const priorityValues = { 'Low': 1, 'Medium': 2, 'High': 3 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    })[0];

  return (
    <div className="todo-stats">
      <div className="stats-grid">
        <div className="stat-item">
          <h3>Total</h3>
          <p>{totalTodos}</p>
        </div>
        <div className="stat-item">
          <h3>Active</h3>
          <p>{activeTodos}</p>
        </div>
        <div className="stat-item">
          <h3>Completed</h3>
          <p>{completedTodos}</p>
        </div>
      </div>
      {highestPriorityIncomplete && (
        <div className="highest-priority">
          <h3>Highest Priority Todo:</h3>
          <p className={highestPriorityIncomplete.priority.toLowerCase()}>
            {highestPriorityIncomplete.title}
          </p>
        </div>
      )}
    </div>
  );
}

export default TodoStats;
