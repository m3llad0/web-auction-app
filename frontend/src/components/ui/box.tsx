
interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

export default function Box({ children, className}: BoxProps) {
  return (
    <div className={`flex items-center bg-white rounded-lg border border-qt_mid py-4 px-6  ${className}`}>
      <div className="flex items-stretch">
        <div className="ml-4 flex flex-col justify-center">
        </div>
      </div>
    </div>
  );
}