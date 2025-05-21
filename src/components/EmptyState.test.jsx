import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  it('renders the empty state message', () => {
    render(<EmptyState />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('No todos yet')).toBeInTheDocument();
    expect(screen.getByText('Add a new todo to get started!')).toBeInTheDocument();
  });
});
