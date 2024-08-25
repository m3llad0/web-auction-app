import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@/components/ui';

describe('Button Component', () => {
  test('renders correctly with given children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('applies the provided class name correctly', () => {
    render(<Button className="custom-class">Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toHaveClass('custom-class');
  });

  test('passes additional props correctly', () => {
    render(<Button data-testid="button" disabled>Click Me</Button>);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toBeDisabled();
  });

});