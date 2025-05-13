import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { QueryExecResult } from "sql.js";

interface ResultsTableProps {
  results: QueryExecResult[] | null;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  if (results === null) return null;

  return (
    <div className="inline-block w-full align-middle shadow ring-1 ring-accent">
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
              <TableRow key={i} className="even:bg-secondary">
                {row.map((cell, j) => (
                  <TableCell key={j} className="whitespace-nowrap">
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
};
