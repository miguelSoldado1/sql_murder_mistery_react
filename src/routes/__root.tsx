import { Footer } from "@/components/footer";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <main className="mx-auto flex-1 p-4 md:w-4/5 md:p-6">
        <Outlet />
      </main>
      <Footer />
    </>
  ),
});
