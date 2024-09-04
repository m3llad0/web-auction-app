'use client';

import { useState } from "react";
import { BellAlertIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Profile from "./profile";
import React from 'react';



export default function Header() {

  return (
    <div className='flex flex-row  items-center bg-white p-4 justify-end border-b'>      
      {/* Right side with toggle, bell, and profile */}
      <div className='flex items-center space-x-6'>
        <div>
          <BellAlertIcon className='w-7 h-7 text-gray-400'/>
        </div>
        <div>
          <Profile name='John Doe' detail='Operador' />
        </div>
      </div>
    </div>
  );
}