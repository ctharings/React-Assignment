import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoStats from './TodoStats';

describe('TodoStats', () => {
  const mockTodos = [
    {
      id: 1,
      title: 'High Priority Todo',
      completed: false,
      priority: 'High',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Medium Priority Todo',
      completed: true,
      priority: 'Medium',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Low Priority Todo',
      completed: false,
      priority: 'Low',
      createdAt: new Date().toISOString()
    }
  ];

  it('displays correct total count', () => {
    render(<TodoStats todos={mockTodos} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('displays correct active count', () => {
    render(<TodoStats todos={mockTodos} />);
    const activeCount = screen.getAllByText('2')[0];
    expect(activeCount).toBeInTheDocument();
  });

  it('displays correct completed count', () => {
    render(<TodoStats todos={mockTodos} />);
    const completedCount = screen.getAllByText('1')[0];
    expect(completedCount).toBeInTheDocument();
  });

  it('displays highest priority incomplete todo', () => {
    render(<TodoStats todos={mockTodos} />);
    expect(screen.getByText('High Priority Todo')).toBeInTheDocument();
  });

  it('does not display highest priority section when all todos are completed', () => {
    const allCompletedTodos = mockTodos.map(todo => ({ ...todo, completed: true }));
    render(<TodoStats todos={allCompletedTodos} />);

    expect(screen.queryByText('Highest Priority Todo:')).not.toBeInTheDocument();
  });

  it('displays correct priority class for highest priority todo', () => {
    render(<TodoStats todos={mockTodos} />);
    const highestPriorityTodo = screen.getByText('High Priority Todo');
    expect(highestPriorityTodo).toHaveClass('high');
  });
});
