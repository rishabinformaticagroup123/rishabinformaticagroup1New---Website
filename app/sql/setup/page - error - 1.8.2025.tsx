"use client";

import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Split from "react-split";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlayIcon } from "lucide-react";
import { useCompletion } from "ai/react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { sqlExecute } from "@/lib/db-actions";

export default function Page() {
  const editorRef = useRef(null);
  const [sql, setSql] = useState("SELECT * FROM students;");
  const [result, setResult] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
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
        selectedText = model.getValueInRange(selection).trim() || sql;
      }
    }

    const res = await sqlExecute(selectedText);

    if (res.error) {
      toast({ title: "SQL Error", description: res.error, variant: "destructive" });
      return;
    }

    setResult(res.rows);
    setColumns(res.columns);

    if (/drop\s+table/i.test(selectedText)) {
      const tableMatch = selectedText.match(/drop\s+table\s+(\w+)/i);
      if (tableMatch) {
        const droppedTable = tableMatch[1];
        setTables((prev) => prev.filter((t) => t !== droppedTable));
      }
    }
  };

  return (
    <Split className="h-screen w-full" direction="horizontal" sizes={[20, 80]} minSize={100} gutterSize={6}>
      {/* Left Sidebar - Tables */}
      <ScrollArea className="p-4 bg-gray-50 border-r">
        <h2 className="text-md font-semibold mb-2">Tables</h2>
        <div className="flex flex-wrap gap-2">
          {tables.map((table) => (
            <Badge key={table} onClick={() => setSelectedTable(table)} className="cursor-pointer">
              {table}
            </Badge>
          ))}
        </div>
      </ScrollArea>

      {/* Main Section - Query Editor and Results */}
      <Split className="w-full" direction="vertical" sizes={[60, 40]} minSize={100} gutterSize={6}>
        {/* SQL Editor */}
        <div className="relative h-full">
          <Editor
            height="100%"
            defaultLanguage="sql"
            theme="vs-dark"
            value={sql}
            onMount={(editor) => (editorRef.current = editor)}
            onChange={(value) => setSql(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              wordWrap: "on",
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
            }}
          />
        </div>

        {/* SQL Result Viewer */}
        <div className="relative p-4">
          <Button onClick={runQuery} className="absolute top-2 right-4 z-10">
            <PlayIcon className="mr-2 h-4 w-4" /> Run Query
          </Button>

          <div className="overflow-auto max-h-full border rounded">
            {result.length > 0 ? (
              <table className="min-w-full text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2 border">#</th>
                    {columns.map((col) => (
                      <th key={col} className="p-2 border">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, index) => (
                    <tr key={index} className="odd:bg-white even:bg-gray-50">
                      <td className="p-2 border text-center">{index + 1}</td>
                      {columns.map((col) => (
                        <td key={col} className="p-2 border">
                          {row[col]?.toString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No results to show.</p>
            )}
          </div>
        </div>
      </Split>
    </Split>
  );
}
