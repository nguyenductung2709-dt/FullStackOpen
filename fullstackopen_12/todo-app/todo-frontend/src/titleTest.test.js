import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from './Todos/Title';

describe('Title Component', () => {
  it('renders the correct title', () => {
    render(<Title title="Todos" />);
    const titleElement = screen.getByText('Todos');
    expect(titleElement.textContent).toBe(' Todos ');
  });
});
