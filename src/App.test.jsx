import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Todo App')).toBeInTheDocument();
  });

  it('renders all filter and sort controls', () => {
    render(<App />);

    const controls = screen.getByRole('group', { name: /filter and sort controls/i });
    const selects = controls.querySelectorAll('select');
    expect(selects).toHaveLength(3);

    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Completed' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'All Priorities' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Sort by Date' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Sort by Priority' })).toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    const prioritySelect = screen.getAllByRole('combobox')[1];
    const addButton = screen.getByRole('button', { name: /add todo/i });

    await user.type(input, 'New Test Todo');
    await user.selectOptions(prioritySelect, 'High');
    await user.click(addButton);

    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  it('filters todos by status', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add a todo
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByRole('button', { name: /add todo/i });
    await user.type(input, 'Test Todo');
    await user.click(addButton);

    // Mark it as completed
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    // Filter by completed
    const statusFilter = screen.getAllByRole('combobox')[0];
    await user.selectOptions(statusFilter, 'Completed');

    expect(screen.getByText('Test Todo')).toBeInTheDocument();

    // Filter by active
    await user.selectOptions(statusFilter, 'Active');
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });

  it('filters todos by priority', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add a high priority todo
    const input = screen.getByPlaceholderText('Add a new todo...');
    const prioritySelect = screen.getAllByRole('combobox')[1];
    const addButton = screen.getByRole('button', { name: /add todo/i });

    await user.type(input, 'High Priority Todo');
    await user.selectOptions(prioritySelect, 'High');
    await user.click(addButton);

    // Wait for the todo to be added
    await waitFor(() => {
      expect(screen.getByText('High Priority Todo')).toBeInTheDocument();
    });

    // Filter by low priority
    const priorityFilter = screen.getAllByRole('combobox')[1];
    await user.selectOptions(priorityFilter, 'Low');

    // Wait for the filter to be applied
    await waitFor(() => {
      const todoList = screen.getByRole('list');
      expect(todoList).not.toHaveTextContent('High Priority Todo');
    });
  });

  it('sorts todos by priority', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add a low priority todo
    const input = screen.getByPlaceholderText('Add a new todo...');
    await user.type(input, 'Low Priority Todo');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    // Add a high priority todo
    await user.clear(input);
    await user.type(input, 'High Priority Todo');
    const prioritySelect = screen.getByRole('combobox', { name: /priority/i });
    await user.selectOptions(prioritySelect, 'High');
    await user.click(screen.getByRole('button', { name: /add todo/i }));

    // Verify both todos are added
    const todoTitles = screen.getAllByTestId('todo-title');
    expect(todoTitles).toHaveLength(2);
    expect(todoTitles[0]).toHaveTextContent('High Priority Todo');
    expect(todoTitles[1]).toHaveTextContent('Low Priority Todo');

    // Sort by priority (should maintain the same order since they're already sorted)
    const sortSelect = screen.getAllByRole('combobox')[2];
    await user.selectOptions(sortSelect, 'priority');

    // Verify the order after sorting
    const todoList = screen.getByRole('list');
    const todoItems = todoList.querySelectorAll('[role="listitem"]');
    const firstTodo = todoItems[0].querySelector('[data-testid="todo-title"]');
    const secondTodo = todoItems[1].querySelector('[data-testid="todo-title"]');
    expect(firstTodo).toHaveTextContent('High Priority Todo');
    expect(secondTodo).toHaveTextContent('Low Priority Todo');
  });
});
