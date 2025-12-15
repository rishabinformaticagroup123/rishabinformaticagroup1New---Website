'use client';

import { useState } from 'react';

export const ModeToggle = ({ onModeChange }: { onModeChange: (mode: 'normal' | 'fix' | 'chat') => void }) => {
  const [mode, setMode] = useState<'normal' | 'fix' | 'chat'>('normal');

  const changeMode = (newMode: 'normal' | 'fix' | 'chat') => {
    setMode(newMode);
    onModeChange(newMode);
  };

  return (
    <div className="flex gap-2">
      {['normal', 'fix', 'chat'].map((m) => (
        <button
          key={m}
          className={`px-4 py-2 rounded ${mode === m ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => changeMode(m as 'normal' | 'fix' | 'chat')}
        >
          {m.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
