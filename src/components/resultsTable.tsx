import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { QueryExecResult } from "sql.js";

interface ResultsTableProps {
  results: QueryExecResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.length <= 0) return null;

  return (
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
  );
}
