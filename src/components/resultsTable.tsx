import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { QueryExecResult } from "sql.js";

interface ResultsTableProps {
  results: QueryExecResult[] | null;
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (results === null) return null;

  return (
    <div className="inline-block min-w-full align-middle shadow ring-1 ring-accent ring-opacity-5">
      <Table>
        <TableHeader>
          <TableRow>
            {results[0]?.columns.length > 0 ? (
              results[0].columns.map((column, i) => (
                <TableHead key={i} className="font-semibold">
                  {column}
                </TableHead>
              ))
            ) : (
              <TableHead></TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {results[0]?.values.length > 0 ? (
            results[0].values.map((row, i) => (
              <TableRow key={i} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                {row.map((cell, j) => (
                  <TableCell key={j} className="max-w-lg">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={1} className="text-center">
                No Results Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
