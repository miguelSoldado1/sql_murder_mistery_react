import { useEffect, useState } from "react";
import initSqlJs from "sql.js";
import type { Database } from "sql.js";

export function useDatabase(databasePath: string) {
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    async function initDB() {
      const SQL = await initSqlJs({ locateFile: (file) => `https://sql.js.org/dist/${file}` });

      // Fetch the SQLite database file from the public directory
      const response = await fetch(databasePath);
      const buffer = await response.arrayBuffer();

      // Load the database from the file
      const database = new SQL.Database(new Uint8Array(buffer));
      setDb(database);
    }

    initDB();
  }, [databasePath]);

  return db;
}
