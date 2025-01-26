import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import { Nav } from "@/components/nav/nav";
import Dashboard from "@/features/aircraft-controller/aircraft-dashboard";
import LayupSequence from "@/features/layup-sequence/layup-sequence";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Nav />
      <Outlet />
    </>
  ),
});

const dashboardRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: Dashboard,
});

const layupSequenceRoute = createRoute({
  path: "/layup-sequence",
  getParentRoute: () => rootRoute,
  component: LayupSequence,
});

const routeTree = rootRoute.addChildren([dashboardRoute, layupSequenceRoute]);

export const router = createRouter({
  routeTree,
});

