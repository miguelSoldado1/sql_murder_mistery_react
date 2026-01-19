import { HeaderBreadcrumb, HeaderDescription, HeaderWrapper } from "@/components/challenge-header";
import { SchemaVisualizer } from "@/components/schema-visualiser";
import { SolutionInput } from "@/components/solution-input";
import { SqlQuery, SqlQueryDescription, SqlQueryHeader, SqlQueryTitle } from "@/components/sql-query";
import { useDatabase } from "@/hooks/use-database";
import { initialEdges, initialNodes } from "@/schema/undersea_mystery";
import { createFileRoute } from "@tanstack/react-router";
import type { Solution } from "@/types";

function UnderseaMysteryI() {
  const db = useDatabase("/undersea_mystery.db");

  return (
    <section className="space-y-12">
      <HeaderWrapper>
        <HeaderBreadcrumb>Undersea Mystery I</HeaderBreadcrumb>
        <HeaderDescription>
          A replacement pump never arrived, and the station is humming a worried tune after an alleged <strong>theft</strong>
          . Start by finding the incident report from <strong>July 18, 2091</strong>, then use that report&apos;s details to
          identify the onsite actor, the handler who filed the manifest edit, and the senior engineer who approved the
          overrides.
        </HeaderDescription>
        <SchemaVisualizer initialNodes={initialNodes} initialEdges={initialEdges} />
      </HeaderWrapper>
      <SqlQuery db={db} defaultValue="SELECT name FROM sqlite_master WHERE type = 'table'">
        <SqlQueryHeader>
          <SqlQueryTitle>Run this query to find the names of the tables in this database</SqlQueryTitle>
          <SqlQueryDescription>
            This command is specific to SQLite. For other databases, you&apos;ll have to learn their specific syntax.
          </SqlQueryDescription>
        </SqlQueryHeader>
      </SqlQuery>
      <SqlQuery db={db} defaultValue="SELECT sql FROM sqlite_master WHERE name = 'incident_report'">
        <SqlQueryHeader>
          <SqlQueryTitle>Find the structure of the `incident_report` table</SqlQueryTitle>
          <SqlQueryDescription>
            This command is specific to SQLite. For other databases, you&apos;ll have to learn their specific syntax.
          </SqlQueryDescription>
        </SqlQueryHeader>
      </SqlQuery>
      <SqlQuery db={db}>
        <SqlQueryHeader>
          <SqlQueryTitle>Find who swapped the cargo label</SqlQueryTitle>
          <SqlQueryDescription>
            Follow the direct clues to uncover the cargo handler, the logistics tech who edited the manifest, and the senior
            engineer who approved the overrides.
          </SqlQueryDescription>
        </SqlQueryHeader>
      </SqlQuery>
      <SolutionInput solutions={solutions} />
    </section>
  );
}

const solutions: Solution[] = [
  {
    solution: "mira alcott",
    text: "Good start. Now use Mira's interrogation transcript to find the Logistics Tech in Module C-1 who filed the manifest edit for the shipment.",
    final: false,
  },
  {
    solution: "jonas pike",
    text: "You found the handler. Next, use Jonas's transcript to identify the Senior Engineer who approved two expedite overrides for Intake Bay A that week.",
    final: false,
  },
  {
    solution: "avery holt",
    text: "Case closed. The cargo mislabel was ordered from above, and you traced the approvals back to Avery Holt.",
    final: true,
  },
];

export const Route = createFileRoute("/undersea_mystery_i")({
  component: UnderseaMysteryI,
});
