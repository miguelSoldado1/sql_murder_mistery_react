import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface SqlQueryProps {
  runQuery(query: string): void;
  resetQuery(): void;
}

export function SqlQuery({ runQuery, resetQuery }: SqlQueryProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;

    return runQuery(query);
  }

  return (
    <form onSubmit={handleSubmit} onReset={resetQuery}>
      <h2 className="mb-2 text-lg font-semibold">SQL Query</h2>
      <Textarea name="query" placeholder="Enter your SQL query here..." className="mb-4" />
      <div className="flex max-w-md gap-2">
        <Button type="submit" className="flex-1">
          Run Query
        </Button>
        <Button type="reset" variant="outline" className="flex-1">
          Reset
        </Button>
      </div>
    </form>
  );
}
