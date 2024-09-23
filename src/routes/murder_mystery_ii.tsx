import { createFileRoute } from "@tanstack/react-router";

const App = () => {
  return <div>Hello /murder_mystery_ii!</div>;
};

export const Route = createFileRoute("/murder_mystery_ii")({
  component: App,
});

