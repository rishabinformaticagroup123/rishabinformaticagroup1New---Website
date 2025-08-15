"use client";

import { useEffect, useRef, useState } from "react";
import { useCompletion } from 'ai/react';
import Editor from "@monaco-editor/react";
import Split from "react-split";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlayIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { sqlExecute } from "@/lib/db-actions";
import ModeToggle from "@/components/mode-toggle";

export default function Page() {
  const editorRef = useRef<any>(null);
  const [sql, setSql] = useState("SELECT * FROM students;");
  const [result, setResult] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [mode, setMode] = useState("sql");
  const { toast } = useToast();

  const { complete, isLoading } = useCompletion({
    api: "/api/completion",
    onFinish(_, completion) {
      setSql((prev) => prev + completion);
    },
  });

  useEffect(() => {
    fetch("/api/tables")
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, []);

  const runQuery = async () => {
    const editor = editorRef.current;
    let selectedText = sql;

    if (editor) {
      const selection = editor.getSelection();
      const model = editor.getModel();
      if (selection && model) {
        selectedText = model.getValueInRange(selection);
      }
    }

    try {
      const data = await sqlExecute(selectedText);
      setResult(data.rows);
      setColumns(data.columns);
    } catch (error: any) {
      toast({
        title: "Query Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleFix = () => {
    complete(sql);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">SQL Playground</h1>
        <ModeToggle mode={mode} setMode={setMode} />
      </div>

      <Split className="flex h-[70vh]" direction="vertical">
        <div className="w-full border rounded-md">
          <Editor
            height="100%"
            defaultLanguage="sql"
            defaultValue={sql}
            value={sql}
            onChange={(value) => setSql(value || "")}
            onMount={(editor) => (editorRef.current = editor)}
            theme="vs-dark"
          />
        </div>
        <div className="w-full border rounded-md p-2 overflow-auto">
          {result.length > 0 ? (
            <table className="table-auto w-full text-sm">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col} className="border p-2 bg-gray-200 text-left">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((row, idx) => (
                  <tr key={idx}>
                    {columns.map((col) => (
                      <td key={col} className="border p-2">
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500">No results to show.</div>
          )}
        </div>
      </Split>

      <div className="flex items-center gap-2">
        {mode === "sql" && (
          <Button onClick={runQuery}>
            <PlayIcon className="mr-2 h-4 w-4" />
            Run SQL
          </Button>
        )}
        {mode === "fix" && (
          <Button onClick={handleFix} disabled={isLoading}>
            {isLoading ? "Fixing..." : "Fix with AI"}
          </Button>
        )}
        {mode === "chat" && (
          <Button
            onClick={() =>
              toast({
                title: "Coming Soon",
                description: "💬 Ask AI feature coming soon",
              })
            }
          >
            Ask AI
          </Button>
        )}
      </div>
    </div>
  );
}
