import React, { useRef, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import Editor from "@monaco-editor/react";
import { PlayIcon, RotateCcwIcon } from "lucide-react";
import { ResultsTable } from "./results-table";
import { Button } from "./ui/button";
import type { editor } from "monaco-editor";
import type { Database, QueryExecResult } from "sql.js";

interface SqlQueryProps {
  db: Database | null;
  defaultValue?: string;
  placeholder?: string;
  children: React.ReactNode;
}

export const SqlQuery = ({ children, db, defaultValue }: SqlQueryProps) => {
  const [isPending, startTransition] = useTransition();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [results, setResults] = useState<QueryExecResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const resetQuery = () => {
    startTransition(() => {
      editorRef.current?.setValue(defaultValue ?? "");
      setResults(null);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = editorRef.current?.getValue();
    if (!db || !query) return;

    startTransition(() => {
      try {
        const result = db.exec(query);
        setResults(result);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setResults([]);
      }
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} onReset={resetQuery}>
        {children}
        <Editor
          className="mb-4 rounded-md border border-input"
          height="200px"
          language="sql"
          defaultValue={defaultValue}
          options={{
            scrollbar: { alwaysConsumeMouseWheel: false },
            minimap: { enabled: false },
            lineNumbers: "off",
            folding: false,
            lineNumbersMinChars: 0,
          }}
          onMount={handleEditorDidMount}
        />
        <div className="flex max-w-md gap-2">
          <Button type="submit" className="flex-1 gap-2" disabled={isPending}>
            <PlayIcon className="size-4" />
            Run Query
          </Button>
          <Button type="reset" variant="outline" className="flex-1 gap-2" disabled={isPending}>
            <RotateCcwIcon className="size-4" />
            Reset
          </Button>
        </div>
      </form>
      {error && (
        <div className="border-l-4 border-red-500 bg-red-100 p-4 text-red-700" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      <ResultsTable results={results} />
    </div>
  );
};

export const SqlQueryHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("mb-2", className)} {...props} />;
};

export const SqlQueryTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />;
};

export const SqlQueryDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
};
