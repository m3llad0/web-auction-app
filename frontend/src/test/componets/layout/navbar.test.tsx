import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navbar } from '@/components/layout';

describe('Navbar Component', () => {
  test('renders Navbar component', () => {
    render(<Navbar />);
    expect(screen.getByText('Timeless Treasures')).toBeInTheDocument();
  });

  test('toggles mobile menu button', () => {
    render(<Navbar />);
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('button', { name: /open main menu/i })).toBeInTheDocument();
  });

  test('renders search bar and allows input', () => {
    render(<Navbar />);
    const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(searchInput.value).toBe('test search');
  });

  test('renders notification button', () => {
    render(<Navbar />);
    const notificationButton = screen.getByRole('button', { name: /view notifications/i });
    expect(notificationButton).toBeInTheDocument();
    fireEvent.click(notificationButton);
    // Add more assertions if there are any changes on click
  });

  test('opens profile dropdown menu', () => {
    render(<Navbar />);
    const profileButton = screen.getByRole('button', { name: /open user menu/i });
    fireEvent.click(profileButton);
    expect(screen.getByText('Your Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});