import { SolvedIcon } from "@/components/solved-icon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getLocalStorageKey } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { Challenge } from "@/types";

const challenges: Challenge[] = [
  { href: "/murder_mystery_i", title: "SQL Murder Mystery I" },
  { href: "/murder_mystery_ii", title: "SQL Murder Mystery II" },
  { href: "/cyberpunk_mystery_i", title: "Cyberpunk Mystery I" },
  { href: "/cyberpunk_mystery_ii", title: "Cyberpunk Mystery II" },
  { href: "/cyberpunk_mystery_iii", title: "Cyberpunk Mystery III" },
];

function App() {
  return (
    <section className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold md:text-3xl">SQL Challenges</h1>
        <p>
          Inspired by the classic{" "}
          <a href="https://mystery.knightlab.com/" className="text-primary underline hover:text-muted-foreground">
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
            <TooltipProvider>
              {challenges.map((challenge) => (
                <TableRow className="even:bg-secondary" key={challenge.href}>
                  <TableCell className="p-0">
                    <Link to={challenge.href} className="flex w-full items-center justify-between p-4">
                      <span> {challenge.title}</span>
                      {localStorage.getItem(getLocalStorageKey(challenge.href)) === "true" && <SolvedIcon />}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TooltipProvider>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/")({
  component: App,
});
