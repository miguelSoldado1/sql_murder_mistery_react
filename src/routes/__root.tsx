import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main className="mx-auto p-6 md:w-4/5">
      <Outlet />
    </main>
  ),
});
