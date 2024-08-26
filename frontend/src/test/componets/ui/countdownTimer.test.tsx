import { render, screen } from "@testing-library/react";
import { CountdownTimer } from "@/components/ui";
import '@testing-library/jest-dom';

// Mock the useCountdown hook
jest.mock("@/components/utils/countdown", () => ({
  useCountdown: () => ({
    days: 2,
    hours: 10,
    minutes: 30,
    seconds: 45,
  }),
}));

describe("CountdownTimer Component", () => {
  it("renders the countdown correctly", () => {
    render(<CountdownTimer startDate={new Date()} endDate={new Date()} />);

    // Check if days, hours, minutes, and seconds are displayed correctly
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("days")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("hours")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("minutes")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("seconds")).toBeInTheDocument();
  });
});
