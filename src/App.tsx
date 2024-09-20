import { useEffect, useState } from "react";
import initSqlJs, { type Database, type QueryExecResult } from "sql.js";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

export default function SQLMurderMystery() {
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

  const runQuery = () => {
    if (!db) return;
    try {
      const result = db.exec(query);
      setResults(result);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setResults([]);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">SQL Murder Mystery</h1>
      <div>
        <h2 className="text-lg font-semibold mb-2">SQL Query</h2>
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          className="mb-4"
        />
        <Button onClick={runQuery}>Run Query</Button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {results[0].columns.map((column, i) => (
                        <TableHead key={i} className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results[0].values.map((row, i) => (
                      <TableRow key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {row.map((cell, j) => (
                          <TableCell key={j} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
