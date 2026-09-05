import { createFileRoute, Outlet } from "@tanstack/react-router";
import { TerminalShell } from "@/components/terminal/shell";

export const Route = createFileRoute("/_os")({
  component: OsLayout,
});

function OsLayout() {
  return (
    <TerminalShell>
      <Outlet />
    </TerminalShell>
  );
}
