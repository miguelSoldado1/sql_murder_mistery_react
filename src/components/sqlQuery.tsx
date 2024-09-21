import { useRef, useState, useTransition } from "react";
import Editor from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import { ResultsTable } from "./resultsTable";
import { Button } from "./ui/button";
import type { Database, QueryExecResult } from "sql.js";
import type { editor } from "monaco-editor";

interface SqlQueryProps {
  db: Database | null;
  defaultValue?: string;
  placeholder?: string;
  children: React.ReactNode;
}

export function SqlQuery({ children, db, defaultValue }: SqlQueryProps) {
  const [isPending, startTransition] = useTransition();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [results, setResults] = useState<QueryExecResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function resetQuery() {
    startTransition(() => {
      editorRef.current?.setValue(defaultValue ?? "");
      setResults(null);
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} onReset={resetQuery}>
        {children}
        <Editor
          className="mb-4 rounded-md border border-input"
          height="200px"
          language="sql"
          defaultValue={defaultValue}
          options={{ lineNumbers: "off" }}
          onMount={handleEditorDidMount}
        />
        <div className="flex max-w-md gap-2">
          <Button type="submit" className="flex-1" disabled={isPending}>
            Run Query
          </Button>
          <Button type="reset" variant="outline" className="flex-1" disabled={isPending}>
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
}

export function SqlQueryHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-2", className)} {...props} />;
}

export function SqlQueryTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />;
}

export function SqlQueryDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
