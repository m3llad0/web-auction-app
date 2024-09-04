import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Box } from '@/components/ui';

describe('Box Component', () => {
  test('renders without crashing', () => {
    render(<Box>Test Content</Box>);
  });

  test('renders children correctly', () => {
    const { getByText } = render(<Box>Test Content</Box>);
    expect(getByText('Test Content')).toBeInTheDocument();
  });
  
  test('applies additional class names', () => {
    const { container } = render(<Box className="extra-class">Test Content</Box>);
    expect(container.firstChild).toHaveClass('extra-class');
  });
});
