import { useState } from "react";
import { ResultsTable } from "./resultsTable";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import type { Database, QueryExecResult } from "sql.js";

interface SqlQueryProps {
  db: Database | null;
  title: string;
  placeholder?: string | undefined;
  value?: string | undefined;
  description?: string | undefined;
}

export function SqlQuery({ db, title, placeholder, value, description }: SqlQueryProps) {
  const [results, setResults] = useState<QueryExecResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  function resetQuery() {
    setResults([]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!db) return;

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;

    try {
      const result = db.exec(query);
      setResults(result);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setResults([]);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} onReset={resetQuery}>
        <div className="mb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        <Textarea name="query" placeholder={placeholder} className="mb-4">
          {value}
        </Textarea>
        <div className="flex max-w-md gap-2">
          <Button type="submit" className="flex-1">
            Run Query
          </Button>
          <Button type="reset" variant="outline" className="flex-1">
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
