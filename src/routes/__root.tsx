import { Footer } from "@/components/footer";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <main className="mx-auto flex-1 p-6 md:w-4/5">
        <Outlet />
      </main>
      <Footer />
    </>
  ),
});
