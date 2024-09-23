import { createFileRoute, Link } from "@tanstack/react-router";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const App = () => {
  return (
    <section className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">SQL Challenges</h1>
        <p>
          Inspired by the classic{" "}
          <a href="https://mystery.knightlab.com/" className="text-blue-500 underline">
            SQL Murder Mystery
          </a>
          , this website takes the concept further by offering a variety of additional challenges. Immerse yourself in the
          world of SQL and sharpen your problem-solving skills with some brand new engaging SQL challenges.
        </p>
      </div>
      <div className="inline-block min-w-full align-middle shadow ring-1 ring-accent">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">challenge</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="max-w-lg">
                <Link to="/murder_mystery_i">SQL Murder Mistery I</Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/")({
  component: App,
});

