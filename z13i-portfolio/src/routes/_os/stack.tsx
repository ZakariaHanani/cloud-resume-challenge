import { createFileRoute } from "@tanstack/react-router";
import { StackView } from "@/components/terminal/views";

export const Route = createFileRoute("/_os/stack")({
  component: StackView,
});
