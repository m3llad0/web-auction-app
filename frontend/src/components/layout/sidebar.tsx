'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  items?: { icon: React.ReactElement, name: string, link?: string }[];
  footer?: React.ReactNode;
  className?: string;
}

export default function Sidebar({ children, header, items, footer, className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`min-h-screen bg-white flex flex-col transition-all duration-300 ease-in-out border-r ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      {/* Header and Toggle Button */}
      <div className="flex items-center justify-between p-4">
        <div className={`flex-1 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 delay-200'} ${!isCollapsed ? 'whitespace-nowrap overflow-hidden text-ellipsis' : ''}`}>
          {!isCollapsed && header && (
            <>{header}</>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="focus:outline-none transition-all duration-300 flex items-center justify-center"
          style={{ width: '1.5rem', height: '1.5rem' }}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isCollapsed ? 'M19 12H5' : 'M12 19l-7-7 7-7'}
            ></path>
          </svg>
        </button>
      </div>

      {/* Items */}
      {items && (
        <ul className="flex-1 overflow-y-auto overflow-x-hidden">
          {items.map((item, index) => (
            <li key={index} className="flex items-center py-2 px-4 cursor-pointer">
              <Link href={item.link || '#'} className={`flex items-center p-2 rounded-lg text-gray-800 hover:bg-qt_highlight hover:text-qt_blue transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-start'} w-full`}>
                <span className="flex-shrink-0">
                  {React.cloneElement(item.icon, { className: 'h-6 w-6 text-gray-500' })}
                </span>
                {!isCollapsed && (
                  <span className="ml-2 text-gray-800">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      {footer && (
        <div className={`p-4 mt-auto transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100 delay-200'}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
