import { HeaderBreadcrumb, HeaderWrapper } from "@/components/challenge-header";
// import { useDatabase } from "@/hooks/use-database";
import { createFileRoute } from "@tanstack/react-router";

const App = () => {
  // const db = useDatabase("/murder_mystery.db");

  return (
    <section className="space-y-12">
      <HeaderWrapper>
        <HeaderBreadcrumb>SQL Murder Mystery II</HeaderBreadcrumb>
      </HeaderWrapper>
    </section>
  );
};

export const Route = createFileRoute("/murder_mystery_ii")({
  component: App,
});
