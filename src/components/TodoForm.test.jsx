import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  it('renders the form with all inputs', () => {
    render(<TodoForm addTodo={() => {}} />);

    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  it('initializes with Medium priority', () => {
    render(<TodoForm addTodo={() => {}} />);

    const prioritySelect = screen.getByRole('combobox');
    expect(prioritySelect).toHaveValue('Medium');
  });

  it('calls addTodo with correct data when form is submitted', async () => {
    const mockAddTodo = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm addTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    const select = screen.getByRole('combobox');
    const button = screen.getByRole('button', { name: /add todo/i });

    await user.type(input, 'Test Todo');
    await user.selectOptions(select, 'High');
    await user.click(button);

    expect(mockAddTodo).toHaveBeenCalledWith({
      title: 'Test Todo',
      priority: 'High',
    });
  });

  it('does not submit empty todos', async () => {
    const mockAddTodo = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm addTodo={mockAddTodo} />);

    const button = screen.getByRole('button', { name: /add todo/i });
    await user.click(button);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it('clears input after successful submission', async () => {
    const mockAddTodo = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm addTodo={mockAddTodo} />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByRole('button', { name: /add todo/i });

    await user.type(input, 'Test Todo');
    await user.click(button);

    expect(input).toHaveValue('');
  });
});
