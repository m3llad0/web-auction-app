interface ProfileProps {
    name: string;
    detail: string;
    image?: string; // Optional profile image URL
  }
  
  export default function Profile({ name, image }: ProfileProps) {
    const initials = name.charAt(0).toUpperCase(); // Get the first letter of the name
  
    return (
      <div className="flex items-center space-x-3">
        {/* Profile Image or Initial */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-qt_highlight flex items-center justify-center text-gray-950 text-xl font-bold">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="border border-gray-400 rounded-full w-12 h-10 flex items-center justify-center">
                <p className="text-gray-750 text-center text-lg">{initials}</p>
            </span>

          )}
        </div>
  
        {/* Name and Detail Stack */}
        <div className="flex flex-col">
          <span className="text-gray-950 font-medium">{name}</span>
        </div>
      </div>
    );
  }