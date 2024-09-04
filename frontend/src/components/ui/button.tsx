
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
  }
  
  export default function Button({ children, className, ...props }: ButtonProps) {
    return (
      <button
        {...props}
        className={`rounded text-white font-roboto py-2 px-4 ${className}`}
      >
        {children}
      </button>
    )
  }