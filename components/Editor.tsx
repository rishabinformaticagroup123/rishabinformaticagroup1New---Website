'use client';

import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function SQLEditor({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="h-64 border rounded overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="sql"
        value={value}
        onChange={(val) => onChange(val || '')}
        theme="vs-dark"
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />
    </div>
  );
}
