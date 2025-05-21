import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

describe('TodoList', () => {
  const mockTodos = [
    {
      id: 1,
      title: 'Test Todo 1',
      completed: false,
      priority: 'High',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Test Todo 2',
      completed: true,
      priority: 'Low',
      createdAt: new Date().toISOString()
    }
  ];

  it('renders all todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={() => {}}
        deleteTodo={() => {}}
      />
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('applies correct priority classes', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={() => {}}
        deleteTodo={() => {}}
      />
    );

    const highPriorityTodo = screen.getByText('Test Todo 1');
    const lowPriorityTodo = screen.getByText('Test Todo 2');

    expect(highPriorityTodo).toHaveClass('priority-high');
    expect(lowPriorityTodo).toHaveClass('priority-low');
  });

  it('shows completed status correctly', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={() => {}}
        deleteTodo={() => {}}
      />
    );

    const completedTodo = screen.getByText('Test Todo 2').closest('.todo-item');
    expect(completedTodo).toHaveClass('completed');
  });

  it('calls toggleTodo when checkbox is clicked', async () => {
    const mockToggleTodo = vi.fn();
    const user = userEvent.setup();

    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={() => {}}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    expect(mockToggleTodo).toHaveBeenCalledWith(mockTodos[0].id);
  });

  it('calls deleteTodo when delete button is clicked', async () => {
    const mockDeleteTodo = vi.fn();
    const user = userEvent.setup();

    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={() => {}}
        deleteTodo={mockDeleteTodo}
      />
    );

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodos[0].id);
  });
});
