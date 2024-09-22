import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import initSqlJs, { type Database } from "sql.js";
import { SolutionInput } from "@/components/solutionInput";
import { SqlQuery, SqlQueryDescription, SqlQueryHeader, SqlQueryTitle } from "@/components/sqlQuery";

export const Route = createFileRoute("/murder_mystery_i")({
  component: App,
});

function App() {
  const [db, setDb] = useState<Database | null>(null);

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

  return (
    <div className="mx-auto space-y-12 p-6 md:w-4/5">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">SQL Murder Mystery I</h1>
        <p>
          A crime has taken place and the detective needs your help. The detective gave you the crime scene report, but you
          somehow lost it. You vaguely remember that the <strong>crime was a murder</strong> that occurred sometime on
          <strong> Jan.15, 2018</strong> and that <strong>it took place in SQL City</strong>. Start by retrieving the
          corresponding crime scene report from the police department's database. Below is the schema diagram for this
          database.
        </p>
        <img src="/schema.png" className="mx-auto w-3/4" draggable={false} />
      </div>
      <SqlQuery db={db} defaultValue="SELECT name FROM sqlite_master WHERE type = 'table'">
        <SqlQueryHeader>
          <SqlQueryTitle>Run this query to find the names of the tables in this database</SqlQueryTitle>
          <SqlQueryDescription>
            This command is specific to SQLite. For other databases, you'll have to learn their specific syntax.
          </SqlQueryDescription>
        </SqlQueryHeader>
      </SqlQuery>
      <SqlQuery db={db} defaultValue="SELECT sql FROM sqlite_master WHERE name = 'crime_scene_report'">
        <SqlQueryHeader>
          <SqlQueryTitle>Find the structure of the `crime_scene_report` table</SqlQueryTitle>
          <SqlQueryDescription>
            This command is specific to SQLite. For other databases, you'll have to learn their specific syntax.
          </SqlQueryDescription>
        </SqlQueryHeader>
      </SqlQuery>
      <SqlQuery db={db}>
        <SqlQueryHeader>
          <SqlQueryTitle>Find who commited the murder</SqlQueryTitle>
          <SqlQueryDescription>When you think you know the answer, go to the next section.</SqlQueryDescription>
        </SqlQueryHeader>
      </SqlQuery>
      <SolutionInput solutions={solutions} />
    </div>
  );
}

const solutions = [
  {
    solution: "jeremy bowers",
    text: "Congrats, you found the murderer! But wait, there's more... If you think you're up for a challenge, try querying the interview transcript of the murderer to find the real villain behind this crime. If you feel especially confident in your SQL skills, try to complete this final step with no more than 2 queries. Use this same INSERT statement with your new suspect to check your answer.",
  },
  {
    solution: "miranda priestly",
    text: "Congrats, you found the brains behind the murder! Everyone in SQL City hails you as the greatest SQL detective of all time. Time to break out the champagne!",
  },
];

