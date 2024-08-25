
interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Box component
 *
 * This component renders a styled div container with optional additional CSS classes.
 * It is designed to wrap its children elements with a specific layout and styling.
 *
 * @param {BoxProps} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the Box component.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the container.
 *
 * @returns {JSX.Element} The rendered Box component.
 */
export default function Box({ children, className }: BoxProps) {
  return (
    <div className={`flex items-center bg-white rounded-lg border py-4 px-6 ${className}`}>
      <div className="flex items-stretch">
        <div className="flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}