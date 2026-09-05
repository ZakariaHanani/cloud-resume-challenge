import { createFileRoute } from "@tanstack/react-router";
import { AboutView } from "@/components/terminal/views";

export const Route = createFileRoute("/_os/")({
  component: AboutView,
});
