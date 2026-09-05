import { createFileRoute } from "@tanstack/react-router";
import { InfrastructureView } from "@/components/terminal/views";

export const Route = createFileRoute("/_os/infrastructure")({
  component: InfrastructureView,
});
