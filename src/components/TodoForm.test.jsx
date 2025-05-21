import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  const mockAddTodo = vi.fn();
  const mockEditTodo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with all inputs', () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Priority' })).toBeInTheDocument();
    expect(screen.getByLabelText('Due date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Todo' })).toBeInTheDocument();
  });

  it('adds a new todo when form is submitted', () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    const titleInput = screen.getByPlaceholderText('Add a new todo...');
    const prioritySelect = screen.getByRole('combobox', { name: 'Priority' });
    const dueDateInput = screen.getByLabelText('Due date');
    const submitButton = screen.getByRole('button', { name: 'Add Todo' });

    fireEvent.change(titleInput, { target: { value: 'Test Todo' } });
    fireEvent.change(prioritySelect, { target: { value: 'High' } });
    fireEvent.change(dueDateInput, { target: { value: '2024-12-31' } });
    fireEvent.click(submitButton);

    expect(mockAddTodo).toHaveBeenCalledWith({
      title: 'Test Todo',
      priority: 'High',
      dueDate: '2024-12-31'
    });
  });

  it('does not submit empty todos', () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    const submitButton = screen.getByRole('button', { name: 'Add Todo' });
    fireEvent.click(submitButton);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it('resets form after submission', () => {
    render(<TodoForm addTodo={mockAddTodo} />);

    const titleInput = screen.getByPlaceholderText('Add a new todo...');
    const prioritySelect = screen.getByRole('combobox', { name: 'Priority' });
    const dueDateInput = screen.getByLabelText('Due date');
    const submitButton = screen.getByRole('button', { name: 'Add Todo' });

    fireEvent.change(titleInput, { target: { value: 'Test Todo' } });
    fireEvent.change(prioritySelect, { target: { value: 'High' } });
    fireEvent.change(dueDateInput, { target: { value: '2024-12-31' } });
    fireEvent.click(submitButton);

    expect(titleInput.value).toBe('');
    expect(prioritySelect.value).toBe('Medium');
    expect(dueDateInput.value).toBe('');
  });

  it('renders in edit mode when editingTodo is provided', () => {
    const editingTodo = {
      id: 1,
      title: 'Edit Me',
      priority: 'High',
      dueDate: '2024-12-31'
    };

    render(
      <TodoForm
        addTodo={mockAddTodo}
        editTodo={mockEditTodo}
        editingTodo={editingTodo}
      />
    );

    expect(screen.getByPlaceholderText('Add a new todo...').value).toBe('Edit Me');
    expect(screen.getByRole('combobox', { name: 'Priority' }).value).toBe('High');
    expect(screen.getByLabelText('Due date').value).toBe('2024-12-31');
    expect(screen.getByRole('button', { name: 'Update Todo' })).toBeInTheDocument();
  });

  it('updates todo when in edit mode', () => {
    const editingTodo = {
      id: 1,
      title: 'Edit Me',
      priority: 'High',
      dueDate: '2024-12-31'
    };

    render(
      <TodoForm
        addTodo={mockAddTodo}
        editTodo={mockEditTodo}
        editingTodo={editingTodo}
      />
    );

    const titleInput = screen.getByPlaceholderText('Add a new todo...');
    const prioritySelect = screen.getByRole('combobox', { name: 'Priority' });
    const dueDateInput = screen.getByLabelText('Due date');
    const submitButton = screen.getByRole('button', { name: 'Update Todo' });

    fireEvent.change(titleInput, { target: { value: 'Updated Todo' } });
    fireEvent.change(prioritySelect, { target: { value: 'Medium' } });
    fireEvent.change(dueDateInput, { target: { value: '2024-12-30' } });
    fireEvent.click(submitButton);

    expect(mockEditTodo).toHaveBeenCalledWith(1, {
      title: 'Updated Todo',
      priority: 'Medium',
      dueDate: '2024-12-30'
    });
  });
});
