import React from "react";

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  return (
    <pre className="bg-gray-900 text-green-200 text-sm p-4 rounded-lg overflow-x-auto my-4 whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  );
};
