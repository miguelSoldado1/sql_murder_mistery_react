import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getLocalStorageKey } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { TrophyIcon } from "lucide-react";
import type { Challenge } from "@/types";

const challenges: Challenge[] = [
  { href: "/murder_mystery_i", title: "SQL Murder Mystery I" },
  { href: "/murder_mystery_ii", title: "SQL Murder Mystery II" },
];

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
            {challenges.map((challenge) => (
              <TableRow key={challenge.href}>
                <TableCell className="p-0">
                  <Link to={challenge.href} className="flex w-full items-center justify-between p-4">
                    <span>{challenge.title}</span>
                    {localStorage.getItem(getLocalStorageKey(challenge.href)) === "true" && (
                      <TrophyIcon className="size-4" />
                    )}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/")({
  component: App,
});
