import { HeaderBreadcrumb, HeaderDescription, HeaderWrapper } from "@/components/challenge-header";
import { SchemaVisualizer } from "@/components/schema-visualiser";
import { SolutionInput } from "@/components/solution-input";
import { SqlQuery, SqlQueryDescription, SqlQueryHeader, SqlQueryTitle } from "@/components/sql-query";
import { useDatabase } from "@/hooks/use-database";
import { initialEdges, initialNodes } from "@/schema/cyberpunk_mystery";
import { createFileRoute } from "@tanstack/react-router";
import type { Solution } from "@/types";

function CyberpunkMysteryII() {
  const db = useDatabase("/cyberpunk_mystery.db");

  return (
    <section className="space-y-12">
      <HeaderWrapper>
        <HeaderBreadcrumb>Cyberpunk Mystery II</HeaderBreadcrumb>
        <HeaderDescription>
          Aegis Station went dark and the quantum failsafe failed. You vaguely remember that the incident happened on
          <strong> March 1, 2147</strong>, and that an AI was moved into a <strong>ghost drive</strong> during the blackout.
          Start by finding the incident briefing from that date, then follow the movement, device, and payment records until
          you can identify the runner, the insider, and the mastermind.
        </HeaderDescription>
        <SchemaVisualizer initialNodes={initialNodes} initialEdges={initialEdges} />
      </HeaderWrapper>
      <SqlQuery db={db} defaultValue="SELECT name FROM sqlite_master WHERE type = 'table'">
        <SqlQueryHeader>
          <SqlQueryTitle>Run this query to find the names of the tables in this database</SqlQueryTitle>
          <SqlQueryDescription>
            This command is specific to SQLite. For other databases, you'll have to learn their specific syntax.
          </SqlQueryDescription>
        </SqlQueryHeader>
      </SqlQuery>
      <SqlQuery db={db} defaultValue="SELECT sql FROM sqlite_master WHERE name = 'incident_report'">
        <SqlQueryHeader>
          <SqlQueryTitle>Find the structure of the `incident_report` table</SqlQueryTitle>
          <SqlQueryDescription>
            This command is specific to SQLite. For other databases, you'll have to learn their specific syntax.
          </SqlQueryDescription>
        </SqlQueryHeader>
      </SqlQuery>
      <SqlQuery db={db}>
        <SqlQueryHeader>
          <SqlQueryTitle>Find who moved the AI consciousness</SqlQueryTitle>
          <SqlQueryDescription>
            Reconstruct the eight-part timeline to identify the ghost-drive runner, the compromised security chief, and the
            executive mastermind.
          </SqlQueryDescription>
        </SqlQueryHeader>
      </SqlQuery>
      <SolutionInput solutions={solutions} />
    </section>
  );
}

const solutions: Solution[] = [
  {
    solution: "shade fathom",
    text: "Nice work. Now query Shade's interrogation notes to learn what to look for next Use those details to identify the Security Chief on Core Deck with a Clearance Lattice implant.",
    final: false,
  },
  {
    solution: "rysa kade",
    text: "You found the insider. One last step: query Rysa's interrogation notes and follow the money. The payer received TWO transfers (50,000 NeoCoin and 20,000 LuminaCredit) and is a Lead Scientist in the Research Ring with four implants.",
    final: false,
  },
  {
    solution: "dr. orion flux",
    text: "Case closed. Dr. Flux funded the op, timed the maintenance cover, and moved the AI into the ghost drive.",
    final: true,
  },
];

export const Route = createFileRoute("/cyberpunk_mystery_ii")({
  component: CyberpunkMysteryII,
});
