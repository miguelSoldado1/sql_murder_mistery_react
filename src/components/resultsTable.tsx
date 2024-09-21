import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { QueryExecResult } from "sql.js";

interface ResultsTableProps {
  results: QueryExecResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.length <= 0) return null;

  return (
    <div className="inline-block min-w-full align-middle shadow ring-1 ring-accent ring-opacity-5">
      <Table>
        <TableHeader>
          <TableRow>
            {results[0].columns.map((column, i) => (
              <TableHead key={i} className="font-semibold">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {results[0].values.map((row, i) => (
            <TableRow key={i} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
              {row.map((cell, j) => (
                <TableCell key={j} className="max-w-lg">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
