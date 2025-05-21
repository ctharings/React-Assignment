import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

describe('TodoList', () => {
  const mockToggleTodo = vi.fn();
  const mockDeleteTodo = vi.fn();
  const mockEditTodo = vi.fn();
  const mockSetEditingTodo = vi.fn();

  const mockTodos = [
    {
      id: 1,
      title: 'Test Todo 1',
      completed: false,
      priority: 'High',
      createdAt: '2024-01-01T00:00:00.000Z',
      dueDate: '2024-12-31'
    },
    {
      id: 2,
      title: 'Test Todo 2',
      completed: true,
      priority: 'Medium',
      createdAt: '2024-01-02T00:00:00.000Z'
    }
  ];

  it('renders all todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('displays priority levels', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('displays due dates when present', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });

  it('calls toggleTodo when todo is clicked', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    fireEvent.click(screen.getByText('Test Todo 1'));
    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  it('calls deleteTodo when delete button is clicked', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });

  it('calls setEditingTodo when edit button is clicked', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    const editButtons = screen.getAllByRole('button', { name: /Edit/ });
    fireEvent.click(editButtons[0]);
    expect(mockSetEditingTodo).toHaveBeenCalledWith(mockTodos[0]);
  });

  it('disables edit and delete buttons when todo is being edited', () => {
    const editingTodo = mockTodos[0];

    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={editingTodo}
      />
    );

    const editButtons = screen.getAllByRole('button', { name: /Edit/ });
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });

    // First todo's buttons should be disabled
    expect(editButtons[0]).toBeDisabled();
    expect(deleteButtons[0]).toBeDisabled();
    expect(editButtons[0]).toHaveTextContent('Editing...');

    // Second todo's buttons should be enabled
    expect(editButtons[1]).not.toBeDisabled();
    expect(deleteButtons[1]).not.toBeDisabled();
    expect(editButtons[1]).toHaveTextContent('Edit');
  });

  it('cannot delete a todo that is being edited', () => {
    const editingTodo = mockTodos[0];

    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={editingTodo}
      />
    );

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });
    fireEvent.click(deleteButtons[0]); // Try to delete the todo being edited

    expect(mockDeleteTodo).not.toHaveBeenCalled();
  });

  it('cannot edit a todo that is already being edited', () => {
    const editingTodo = mockTodos[0];

    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={editingTodo}
      />
    );

    const editButtons = screen.getAllByRole('button', { name: /Edit/ });
    fireEvent.click(editButtons[0]); // Try to edit the todo being edited

    expect(mockSetEditingTodo).not.toHaveBeenCalled();
  });

  it('shows overdue status for past due dates', () => {
    const overdueTodo = {
      id: 3,
      title: 'Overdue Todo',
      completed: false,
      priority: 'High',
      createdAt: '2024-01-01T00:00:00.000Z',
      dueDate: '2023-12-31' // Past date
    };

    render(
      <TodoList
        todos={[overdueTodo]}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    const dueDateElement = screen.getByText(/Due:/);
    expect(dueDateElement).toHaveClass('overdue');
  });

  it('handles keyboard navigation for todo toggle', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    const todoElement = screen.getByText('Test Todo 1');
    fireEvent.keyDown(todoElement, { key: 'Enter' });
    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  it('applies correct priority classes', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    const highPriorityTodo = screen.getByText('Test Todo 1');
    const mediumPriorityTodo = screen.getByText('Test Todo 2');

    expect(highPriorityTodo).toHaveClass('priority-high');
    expect(mediumPriorityTodo).toHaveClass('priority-medium');
  });

  it('shows completed status correctly', () => {
    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    const completedTodo = screen.getByText('Test Todo 2').closest('.todo-item');
    expect(completedTodo).toHaveClass('completed');
  });

  it('calls toggleTodo when checkbox is clicked', async () => {
    const user = userEvent.setup();

    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    expect(mockToggleTodo).toHaveBeenCalledWith(mockTodos[0].id);
  });

  it('calls deleteTodo when delete button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <TodoList
        todos={mockTodos}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        setEditingTodo={mockSetEditingTodo}
        editingTodo={null}
      />
    );

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/ });
    await user.click(deleteButtons[0]);

    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodos[0].id);
  });
});
