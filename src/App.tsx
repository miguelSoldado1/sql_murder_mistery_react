import { useEffect, useState } from "react";
import initSqlJs, { type Database, type QueryExecResult } from "sql.js";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResultsTable } from "./components/resultsTable";

export default function App() {
  const [db, setDb] = useState<Database | null>(null);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<QueryExecResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initDB() {
      const SQL = await initSqlJs({ locateFile: (file) => `https://sql.js.org/dist/${file}` });

      // Fetch the SQLite database file from the public directory
      const response = await fetch("/murder_mystery.db");
      const buffer = await response.arrayBuffer();

      // Load the database from the file
      const database = new SQL.Database(new Uint8Array(buffer));
      setDb(database);
    }
    initDB();
  }, []);

  function runQuery() {
    if (!db) return;
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
    <div className="container mx-auto space-y-6 p-4">
      <h1 className="mb-4 text-2xl font-bold">SQL Murder Mystery</h1>
      <div>
        <h2 className="mb-2 text-lg font-semibold">SQL Query</h2>
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          className="mb-4"
        />
        <Button onClick={runQuery}>Run Query</Button>
      </div>

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
