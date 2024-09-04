import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '@/components/layout';
describe('Footer Component', () => {
  test('renders Footer component', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  test('renders copyright text', () => {
    render(<Footer />);
    const copyrightElement = screen.getByTestId('copyright');
    expect(copyrightElement).toBeInTheDocument();
    expect(copyrightElement).toHaveTextContent(
      '© 2023 Timeless Treasures™. All Rights Reserved.'
    );
  });

  test('renders Facebook link', () => {
    render(<Footer />);
    const facebookLink = screen.getByTestId('facebook-link');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', '#');
  });

  test('renders Instagram link', () => {
    render(<Footer />);
    const instagramLink = screen.getByTestId('instagram-link');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', '#');
  });

  test('renders GitHub link', () => {
    render(<Footer />);
    const githubLink = screen.getByTestId('github-link');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/m3llad0/web-auction-app');
  });
});