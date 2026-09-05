import { createFileRoute } from "@tanstack/react-router";
import { ProjectsView } from "@/components/terminal/views";

export const Route = createFileRoute("/_os/projects")({
  component: ProjectsView,
});
